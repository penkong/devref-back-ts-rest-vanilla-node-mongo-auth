/*
 ** Description :
 */

require('dotenv').config()

// ---

export const config = {
  REDIS: process.env.REDIS,
  PORT: process.env.PORT,
  DBURL: process.env.DBURL,
  DBNAME: process.env.DBNAME,
  __prod__: process.env.NODE_ENV === 'production',
  MONGOPASS: process.env.MONGOPASS,
  MONGOUSER: process.env.MONGOUSER,
  CORS: process.env.CORS,
  JWT_KEY: process.env.JWT_KEY,
  JWT_TTL: process.env.JWT_TTL,
  RESET_TOKEN_EXP: process.env.RESET_TOKEN_EXP,
  SENDGRID_USER: process.env.SENDGRID_USER,
  SENDGRID_PASS: process.env.SENDGRID_PASS,
  EMAIL_FROM: process.env.EMAIL_FROM
}
