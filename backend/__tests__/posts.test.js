const request = require('supertest')
const app = require('../app')
const { connectDB, disconnectDB } = require('./../utils/connectDB')
// const api = request('http://127.0.0.1:2021/api/v1')

describe('Posts API', () => {
  beforeAll(() => {
    connectDB()
  })
  afterAll(async() => {
    await disconnectDB()
  })
  describe('Test GET all posts', () => {
    test('It should respond with 200 success', async () => {
      await request(app).get('/posts').expect(200)    
    })
  })
  describe('Test GET post /:id', () => {
    test('It should respond with 200 success', async () => {
      const ID = '61812405ad27d62e1806f888'
      const response = await request(app).get(`/posts/${ID}`)
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.status).toEqual(200); 
    })
  })
  
  describe('Test POST /post', () => {
    test('It should respond with 201 created', async() => {
      await request(app).post('/posts').send({
        title: "testing with jest",
        body: "body of test from jest",
        snippet: "snippet for the jest post",
        category: "60fd0e8dfd5b324e34b51971",
        isFeatured: false,
        tags: ["jest, supertest"],
        image: "post-9-image.jpg"
      })
      expect(201)
    })
  
    test('It should catch missing required properties', async () => {
      const response = await request(app).post('/posts').send({
        title: "testing with jest",
        // body: "body of test from jest",
        category: "60fd0e8dfd5b324e34b51971",
        isFeatured: false,
        tags: ["jest, supertest"],
        image: "post-9-image.jpg"
      })
      expect(400)
      expect(response.body.message).toEqual("Post validation failed: snippet: A post must have a snippet, body: A post must have a body")
    })
  })
})

