export default () => ({
  app: {
    port: parseInt(process.env.APP_PORT, 10) || 3000,
    name: process.env.APP_NAME,
    url: process.env.APP_URL,
  },
  database: {
    type: String(process.env.DB_TYPE),
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
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
