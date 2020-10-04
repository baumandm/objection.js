const knex = require('knex');

const postgres = knex({
  client: 'postgres',

  connection: {
    user: 'postgres',
    host: 'localhost',
    database: 'postgres'
  }
});

const mysql = knex({
  client: 'mysql',

  connection: {
    user: 'root',
    host: 'localhost'
  }
});

const mssql = knex({
  client: 'mssql',

  connection: {
    user: 'sa',
    password: 'yourStrong(!)Password',
    host: 'localhost'
  }
});

[
  postgres.raw('DROP DATABASE IF EXISTS objection_test'),
  postgres.raw('DROP USER IF EXISTS objection'),
  postgres.raw('CREATE USER objection SUPERUSER'),
  postgres.raw('CREATE DATABASE objection_test'),

  mysql.raw('DROP DATABASE IF EXISTS objection_test'),
  mysql.raw('DROP USER IF EXISTS objection'),
  mysql.raw('CREATE USER objection'),
  mysql.raw('GRANT ALL PRIVILEGES ON *.* TO objection'),
  mysql.raw('CREATE DATABASE objection_test'),

  mssql.raw('DROP DATABASE IF EXISTS objection_test'),
  mssql.raw('DROP USER IF EXISTS objection'),
  mssql.raw('DROP LOGIN objection'),
  mssql.raw('CREATE DATABASE objection_test'),
  mssql.raw("CREATE LOGIN objection WITH PASSWORD = '', CHECK_POLICY=OFF"),
  mssql.raw('CREATE USER objection FOR LOGIN objection'),
  mssql.raw("EXEC sp_addsrvrolemember 'objection', 'sysadmin'")
]
  .reduce((promise, query) => {
    return promise.then(() => query);
  }, Promise.resolve())
  .then(() => {
    return Promise.all([postgres.destroy(), mysql.destroy(), mssql.destroy()]);
  });
