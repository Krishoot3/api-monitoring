const DIR = process.env.NODE_ENV === 'test' ? 'src' : 'dist/src';

module.exports = {
  type: 'mysql',
  host: process.env.DB_MARIADB_HOST,
  port: process.env.DB_MARIADB_PORT,
  username: process.env.DB_MARIADB_NAME,
  password: process.env.DB_MARIADB_PASS,
  database: process.env.DB_MARIADB_DB,
  entities: [`${DIR}/entities/*{.ts,.js}`],
  logging: false,
  synchronize: false,
};
