const request = require('supertest')
const app = require('../app')

describe('Test GET all posts', () => {
  test('It should respond with 200 success', async () => {
    await request(app).get('/').expect(200)    
  })
})
describe('Test GET post /:id', () => {
  test('It should respond with 200 success', async () => {
    const ID = '61812405ad27d62e1806f888'
    const response = await request(app).get(`/${ID}`)
    // expect(response.headers["Content-Type"]).toMatch(/json/);
    expect(response).toEqual(200); 
  })
})

describe('Test POST /post', () => {
  test('It should respond with 201 created', async() => {
    await request(app).post('/').send({
      title: "testing with jest",
      body: "body of test from jest",
      category: "60fd0e8dfd5b324e34b51971",
      isFeatured: false,
      tags: ["jest, supertest"],
      image: "post-9-image.jpg"
    })
    expect(201)
  })

  test('It should catch missing fields error', () => {
    
  })
})