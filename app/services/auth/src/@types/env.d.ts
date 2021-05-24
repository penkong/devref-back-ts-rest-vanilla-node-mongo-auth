/*
 ** Description :
 */

// ---

declare namespace NodeJS {
  export interface ProcessEnv {
    REDIS: string
    PORT: string
    DBURL: string
    DBNAME: string
    NODE_ENV: string
    MONGOPASS: string
    MONGOUSER: string
    CORS: string // http://localhost:3000
    JWT_KEY: string // -fdsfdsf
    JWT_TTL: string // 365d
    RESET_TOKEN_EXP: string
    SENDGRID_USER: string
    SENDGRID_PASS: string
    EMAIL_FROM: string
  }
}
