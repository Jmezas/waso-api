export default () => ({
  app: {
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    name: process.env.APP_NAME,
    url: process.env.APP_URL,
  },
  database: {
    mysql: {
      type: String(process.env.LOC_DB_TYPE),
      host: process.env.LOC_DB_HOST,
      port: parseInt(process.env.LOC_DB_PORT, 10) || 3306,
      database: process.env.LOC_DB_DATABASE,
      username: process.env.LOC_DB_USERNAME,
      password: process.env.LOC_DB_PASSWORD,
    },
    mssql: {
      type: String(process.env.EXT_DB_TYPE),
      host: process.env.EXT_DB_HOST,
      port: parseInt(process.env.EXT_DB_PORT, 10) || 1433,
      database: process.env.EXT_DB_DATABASE,
      username: process.env.EXT_DB_USERNAME,
      password: process.env.EXT_DB_PASSWORD,
    },
  },
  mail: {
    driver: process.env.MAIL_DRIVER,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    username: process.env.MAIL_USERNAME,
    password: process.env.MAIL_PASSWORD,
    encryption: process.env.MAIL_ENCRYPTION,
  },
  aws: {
    aki: process.env.AWS_ACCESS_KEY_ID,
    sak: process.env.AWS_SECRET_ACCESS_KEY,
    dr: process.env.AWS_DEFAULT_REGION,
    bucket: process.env.AWS_BUCKET,
  },
});
