process.env.NODE_ENV = 'test';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { db } from '@database';

chai.use(chaiHttp);

describe('[GET] /api/products', async () => {
  it('it should get all products', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .get('/api/products')
        .end((err, res) => {
          expect(res.status).to.be.oneOf([200, 204]);
          expect(res.body).to.be.a('array');
          done();
        });
    });
  });
});

describe('[GET] /api/products/category/{categoryName}', async () => {
  it('it should get all products under Cameras category', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .get('/api/products/category/Cameras')
        .end((err, res) => {
          expect(res.status).to.be.oneOf([200, 204]);
          expect(res.body).to.be.a('array');
          done();
        });
    });
  });
});

describe('[GET] /api/products/{productName}', async () => {
  it('it should get product info for XenBox 5', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .get('/api/products/XenBox 5')
        .end((err, res) => {
          expect(res.status).to.be.oneOf([200, 204]);
          expect(res.body.productName).to.contains('XenBox 5');
          done();
        });
    });
  });
});

describe('[POST] /api/products', async () => {
  it('it should fail validation', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .post('/api/products')
        .send({
          'categoryName': 1,
          'productName': 400,
          'price': '0',
        })
        .end((err, res) => {
          expect(res.status).to.be.oneOf([422, 500]);
          done();
        });
    });
  });
  it('it should fail to find product', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .post('/api/products')
        .send({
          'categoryName': 'unknowncat',
          'productName': 'string',
          'previewImageUrl': 'string',
          'description': 'string',
          'postedDate': '2022-02-27T07:16:12.463Z',
          'price': 0,
          'isAvailable': true,
          'discountPercentage': 0,
          'discountEndDate': '2022-02-27T07:16:12.463Z'
        })
        .end((err, res) => {
          expect(res.status).to.be.oneOf([500]);
          done();
        });
    });
  });
  it('it should add new product', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .post('/api/products')
        .send({
          'categoryName': 'Cameras',
          'productName': 'string',
          'previewImageUrl': 'string',
          'description': 'string',
          'postedDate': '2022-02-27T07:16:12.463Z',
          'price': 0,
          'isAvailable': true,
          'discountPercentage': 0,
          'discountEndDate': '2022-02-27T07:16:12.463Z'
        })
        .end((err, res) => {
          expect(res.status).to.be.oneOf([200, 204]);
          expect(res.body.productName).to.contains('string');
          done();
        });
    });
  });
});


describe('[PUT] /api/products', async () => {
  it('it should fail to update', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .put('/api/products/' + 65343262342)
        .send({
          'categoryName': 'Cameras',
          'productName': 'string',
          'previewImageUrl': 'string2',
          'description': 'string',
          'postedDate': '2022-02-27T07:16:12.463Z',
          'price': 0,
          'isAvailable': true,
          'discountPercentage': 0,
          'discountEndDate': '2022-02-27T07:16:12.463Z'
        })
        .end((err, res) => {
          expect(res.status).to.be.oneOf([500]);
          done();
        });
    });
  });
  it('it should fail', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .get('/api/products/string')
        .end((err, res) => {
          chai.request(app)
            .put('/api/products/' + res.body.id)
            .send({
              'categoryName': 'unknowncat',
              'productName': 'string',
              'previewImageUrl': 'string2',
              'description': 'string',
              'postedDate': '2022-02-27T07:16:12.463Z',
              'price': 0,
              'isAvailable': true,
              'discountPercentage': 0,
              'discountEndDate': '2022-02-27T07:16:12.463Z'
            })
            .end((err, res) => {
              expect(res.status).to.be.oneOf([500]);
              done();
            });
        });
    });
  });
  it('it should update product', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .get('/api/products/string')
        .end((err, res) => {
          chai.request(app)
            .put('/api/products/' + res.body.id)
            .send({
              'categoryName': 'Cameras',
              'productName': 'string',
              'previewImageUrl': 'string2',
              'description': 'string',
              'postedDate': '2022-02-27T07:16:12.463Z',
              'price': 0,
              'isAvailable': true,
              'discountPercentage': 0,
              'discountEndDate': '2022-02-27T07:16:12.463Z'
            })
            .end((err, res) => {
              expect(res.status).to.be.oneOf([200, 204]);
              done();
            });
        });
    });
  });
});

describe('[DELETE] /api/products', async () => {
  it('it should delete product', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .get('/api/products/string')
        .end((err, res) => {
          chai.request(app)
            .delete('/api/products/' + res.body.id)
            .end((err, res) => {
              expect(res.status).to.be.oneOf([200, 204]);
              done();
            });
        });
    });
  });
});