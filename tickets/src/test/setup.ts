import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../app'
import jwt from 'jsonwebtoken'

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[]
    }
  }
}

let mongo: any
beforeAll(async () => {
  process.env.JWT_KEY = 'testkey'

  mongo = new MongoMemoryServer()
  const mongoUri = await mongo.getUri()

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
})

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()

  for (let collection of collections) {
    await collection.deleteMany({})
  }
})

afterAll(async () => {
  await mongo.stop()
  await mongoose.connection.close()
})

global.signin = () => {
  // Builds JWT Payload { id, email }
  const payload = {
    id: '12345',
    email: 'test@test.com',
  }

  // Creates JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!)

  // Builds session object { jwt: MY_JWT }
  const session = { jwt: token }

  // Converts session to JSON
  const sessionJSON = JSON.stringify(session)

  // Encodes JSON as base64
  const base64 = Buffer.from(sessionJSON).toString('base64')

  // Returns cookie w/ encoded data as string
  return [`express:sess=${base64}`]
}
