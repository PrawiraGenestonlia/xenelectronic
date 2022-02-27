process.env.NODE_ENV = 'test';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { db } from '@database';

chai.use(chaiHttp);

describe('[GET] /api/categories', async () => {
  it('it should get all categories', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .get('/api/categories')
        .end((err, res) => {
          expect(res.status).to.be.oneOf([200, 204]);
          expect(res.body).to.be.a('array');
          done();
        });
    });
  });
});

describe('[GET] /api/categories/{categoryName}', async () => {
  it('it should get category for Cameras', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .get('/api/categories/Cameras')
        .end((err, res) => {
          expect(res.status).to.be.oneOf([200, 204]);
          expect(res.body).to.a('array');
          done();
        });
    });
  });
});

describe('[POST] /api/categories', async () => {
  it('it should add new category', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .post('/api/categories')
        .send({
          'categoryName': 'string',
          'categoryDescription': 'string',
          'categoryImageUrl': 'string'
        })
        .end((err, res) => {
          expect(res.status).to.be.oneOf([200, 204]);
          expect(res.body.categoryName).to.contains('string');
          done();
        });
    });
  });
});


describe('[PUT] /api/categories', async () => {
  it('it should update category', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .get('/api/categories/string')
        .end((err, res) => {
          chai.request(app)
            .put('/api/categories/' + res.body[0].id)
            .send({
              'categoryName': 'string',
              'categoryDescription': 'string2',
              'categoryImageUrl': 'string2'
            })
            .end((err, res) => {
              expect(res.status).to.be.oneOf([200, 204]);
              done();
            });
        });
    });
  });
});

describe('[DELETE] /api/categories', async () => {
  it('it should update category', (done) => {

    db.connectToDB().then(() => {
      chai.request(app)
        .get('/api/categories/string')
        .end((err, res) => {
          chai.request(app)
            .delete('/api/categories/' + res.body[0].id)
            .end((err, res) => {
              expect(res.status).to.be.oneOf([200, 204]);
              done();
            });
        });
    });
  });
});