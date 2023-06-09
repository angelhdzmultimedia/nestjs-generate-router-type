import * as ts from 'typescript'

interface MethodParameter {
  name: string
  type: string
}

interface ControllerMethod {
  name: string
  method: string
  path: string
  parameters: MethodParameter[]
  returnType: string
}

interface ControllerDetails {
  file: string
  path: string
  routes: ControllerMethod[]
}

function getMethodDetailsFromControllers(
  controllerFilePaths: string[],
): ControllerDetails[] {
  const program = ts.createProgram(controllerFilePaths, {})
  const typeChecker = program.getTypeChecker()

  const controllerDetails: ControllerDetails[] = []

  for (const filePath of controllerFilePaths) {
    const sourceFile = program.getSourceFile(filePath)

    if (sourceFile) {
      ts.forEachChild(sourceFile, (node) => {
        if (ts.isClassDeclaration(node)) {
          const className = node.name
          if (className) {
            const classSymbol = typeChecker.getSymbolAtLocation(className)
            if (classSymbol) {
              const classType = typeChecker.getDeclaredTypeOfSymbol(classSymbol)
              const properties = typeChecker.getPropertiesOfType(classType)

              const routes: ControllerMethod[] = []

              for (const property of properties) {
                const propertyDeclaration = property.valueDeclaration
                if (
                  propertyDeclaration &&
                  ts.isMethodDeclaration(propertyDeclaration) &&
                  propertyDeclaration.modifiers &&
                  propertyDeclaration.modifiers.some(
                    (modifier) => modifier.kind === ts.SyntaxKind.PublicKeyword,
                  )
                ) {
                  const methodName = propertyDeclaration.name
                  if (methodName) {
                    const methodNameText = methodName.getText(sourceFile)

                    let methodPath = ''
                    let httpMethod = ''

                    const jsDocTags = ts.getJSDocTags(propertyDeclaration)
                    if (jsDocTags) {
                      for (const tag of jsDocTags) {
                        if (tag.tagName.escapedText === 'ControllerPath') {
                          methodPath = ts.isJSDocCommentContainingNode(tag.comment)
                            ? tag?.comment?.comment || ''
                            : tag.comment?.[0].comment || ''
                        } else if (tag.tagName.escapedText === 'HttpMethod') {
                          httpMethod = ts.isJSDocCommentContainingNode(tag?.comment)
                            ? tag?.comment?.comment || ''
                            : tag.comment?.[0]?.comment || ''
                        }
                      }
                    }

                    const signature =
                      typeChecker.getSignatureFromDeclaration(
                        propertyDeclaration,
                      )
                    if (signature) {
                      const parameters = signature.parameters.map(
                        (parameter) => {
                          const parameterType =
                            typeChecker.getTypeOfSymbolAtLocation(
                              parameter,
                              parameter.valueDeclaration!,
                            )
                          return {
                            name: parameter.name,
                            type: typeChecker.typeToString(parameterType),
                          }
                        },
                      )

                      const returnType =
                        typeChecker.getReturnTypeOfSignature(signature)
                      const returnTypeString =
                        typeChecker.typeToString(returnType)

                      routes.push({
                        name: methodNameText,
                        method: httpMethod,
                        path: methodPath,
                        parameters,
                        returnType: returnTypeString,
                      })
                    }
                  }
                }
              }

              if (routes.length > 0) {
                const filePathParts = filePath.split('/')
                const fileName = filePathParts[filePathParts.length - 1]

                const controllerPath = fileName.replace('.controller.ts', '')

                controllerDetails.push({
                  file: fileName,
                  path: controllerPath,
                  routes,
                })
              }
            }
          }
        }
      })
    }
  }

  return controllerDetails
}
// Usage example
const controllerFilePaths = ['src/auth/auth.controller.ts']
const data = getMethodDetailsFromControllers(controllerFilePaths)

console.log(data)
