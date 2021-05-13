// import request from 'supertest'

import { MongoClient } from 'mongodb'

export {}
declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[] | void>
      authClient: MongoClient
    }
  }
}

beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf'
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
})

beforeEach(async () => {})

afterAll(async () => {})

global.signin = async () => {}
