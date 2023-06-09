/**
 * @packageDocumentation
 * @module api.functional.auth
 * @nestia Generated by Nestia - https://github.com/samchon/nestia 
 */
//================================================================
import { Fetcher } from "@nestia/fetcher";
import type { IConnection, Primitive } from "@nestia/fetcher";

import type { LoginData, RegisterData, __object } from "./../../../auth/auth.controller";

/**
 * @controller AuthController.login()
 * @path POST /auth/login
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function login(
    connection: IConnection,
    body: login.Input,
): Promise<login.Output> {
    return Fetcher.fetch(
        connection,
        login.ENCRYPTED,
        login.METHOD,
        login.path(),
        body,
    );
}
export namespace login {
    export type Input = Primitive<LoginData>;
    export type Output = Primitive<LoginData>;

    export const METHOD = "POST" as const;
    export const PATH: string = "/auth/login";
    export const ENCRYPTED: Fetcher.IEncrypted = {
        request: false,
        response: false,
    };

    export const path = (): string => {
        return `/auth/login`;
    }
}

/**
 * @controller AuthController.register()
 * @path POST /auth/register
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function register(
    connection: IConnection,
    body: register.Input,
): Promise<register.Output> {
    return Fetcher.fetch(
        connection,
        register.ENCRYPTED,
        register.METHOD,
        register.path(),
        body,
    );
}
export namespace register {
    export type Input = Primitive<RegisterData>;
    export type Output = Primitive<RegisterData>;

    export const METHOD = "POST" as const;
    export const PATH: string = "/auth/register";
    export const ENCRYPTED: Fetcher.IEncrypted = {
        request: false,
        response: false,
    };

    export const path = (): string => {
        return `/auth/register`;
    }
}

/**
 * @controller AuthController.user()
 * @path GET /auth/user
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function user(
    connection: IConnection,
): Promise<user.Output> {
    return Fetcher.fetch(
        connection,
        user.ENCRYPTED,
        user.METHOD,
        user.path(),
    );
}
export namespace user {
    export type Output = Primitive<__object>;

    export const METHOD = "GET" as const;
    export const PATH: string = "/auth/user";
    export const ENCRYPTED: Fetcher.IEncrypted = {
        request: false,
        response: false,
    };

    export const path = (): string => {
        return `/auth/user`;
    }
}

/**
 * @controller AuthController.test()
 * @path GET /auth/test
 * @nestia Generated by Nestia - https://github.com/samchon/nestia
 */
export async function test(
    connection: IConnection,
): Promise<test.Output> {
    return Fetcher.fetch(
        connection,
        test.ENCRYPTED,
        test.METHOD,
        test.path(),
    );
}
export namespace test {
    export type Output = Primitive<object>;

    export const METHOD = "GET" as const;
    export const PATH: string = "/auth/test";
    export const ENCRYPTED: Fetcher.IEncrypted = {
        request: false,
        response: false,
    };

    export const path = (): string => {
        return `/auth/test`;
    }
}