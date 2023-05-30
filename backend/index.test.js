import chai from 'chai';
import chaiHttp from 'chai-http';
import app from './index.js';

const { expect } = chai;

chai.use(chaiHttp);

describe('API', () => {
  let authToken; // Variable to store the authentication token for protected endpoints

  describe('GET /', () => {
    it('should return a Hello World text', (done) => {
      chai
        .request(app)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.text).to.equal('Hello, World!');
          done();
        });
    });
  });

  describe('POST /login', () => {
    it('should return a valid authentication token', (done) => {
      const credentials = {
        username: 'user',
        password: 'user123',
      };

      chai
        .request(app)
        .post('/login')
        .send(credentials)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('token');
          authToken = res.body.token; // Save the authentication token for further requests
          done();
        });
    });
  });

  describe('GET /products', () => {
    it('should return an array of products', (done) => {
      chai
        .request(app)
        .get('/products')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          done();
        });
    });
  });

  describe('GET /product/:id', () => {
    it('should return a product by ID', (done) => {
      const productId = 'c8f5f4d5-efdf-4ac6-908c-bb813535e3ff'; // Replace with a valid product ID

      chai
        .request(app)
        .get(`/product/${productId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('id', productId);
          done();
        });
    });
  });

  describe('POST /product/:id', () => {
    it('should create a new comment', (done) => {
      const newProduct = {
        id: Math.floor(Math.random() * 100),
        comment: 'New Comment',
        rating: 5,
      };
      const productId = 'c8f5f4d5-efdf-4ac6-908c-bb813535e3ff'; // Replace with a unique product ID

      chai
        .request(app)
        .post(`/product/${productId}`)
        .set('Authorization', `Bearer ${authToken}`) // Include the authentication token in the headers
        .send(newProduct)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
