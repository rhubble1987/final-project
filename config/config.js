require('dotenv').config();

module.exports =
{
  'development': {
    'username': 'root',
    'password': process.env.PASSWORD,
    'database': process.env.DATABASE,
    'host': '127.0.0.1',
    'dialect': 'mysql'
  },
  'test': {
    'username': 'root',
    'password': null,
    'database': 'database_test',
    'host': '127.0.0.1',
    'dialect': 'mysql'
  },
<<<<<<< HEAD
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
=======
  'production': {
    'username': 'root',
    'password': null,
    'database': 'database_production',
    'host': '127.0.0.1',
    'dialect': 'mysql'
>>>>>>> eebef91de63559469118cf967893848a3d34ed05
  }
};
