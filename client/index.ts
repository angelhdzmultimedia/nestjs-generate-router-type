import api from '../src/api'

const connection: api.IConnection = {
  host: 'https://localhost:5000/api'
}

api.functional.auth.login(connection, {

})
