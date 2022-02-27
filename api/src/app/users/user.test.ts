process.env.NODE_ENV = 'test';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { db } from '@database';

chai.use(chaiHttp);

describe('[GET] /api/users', async () => {
  it('it should fail', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .get('/api/random-route')
        .end((err, res) => {
          expect(res.status).to.be.oneOf([500]);
          done();
        });
    });
  });
  it('it should get all users', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .get('/api/users')
        .end((err, res) => {
          expect(res.status).to.be.oneOf([200, 204]);
          expect(res.body).to.be.a('array');
          done();
        });
    });
  });
});

describe('[GET] /api/users/{name}', async () => {
  it('it should get testuser', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .get('/api/users/testuser')
        .end((err, res) => {
          expect(res.status).to.be.oneOf([200, 204]);
          expect(res.body.name).to.contains('testuser');
          done();
        });
    });
  });
});

describe('[POST] /api/users', async () => {
  it('it should add new users', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .post('/api/users')
        .send({
          'roles': [
            'string'
          ],
          'name': 'string'
        })
        .end((err, res) => {
          expect(res.status).to.be.oneOf([200, 204]);
          expect(res.body.name).to.contains('string');
          done();
        });
    });
  });
  it('it should fail add same user', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .post('/api/users')
        .send({
          'roles': [
            'string'
          ],
          'name': 'string'
        })
        .end((err, res) => {
          expect(res.status).to.be.oneOf([500]);
          done();
        });
    });
  });
});

describe('[PUT] /api/users', async () => {
  it('it should update user', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .get('/api/users/string')
        .end((err, res) => {
          chai.request(app)
            .put('/api/users/' + res.body.id)
            .send({
              'roles': [
                'string'
              ],
              'name': 'string'
            })
            .end((err, res) => {
              expect(res.status).to.be.oneOf([200, 204]);
              done();
            });
        });
    });
  });
});

describe('[DELETE] /api/users', async () => {
  it('it should delete user', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .get('/api/users/string')
        .end((err, res) => {
          chai.request(app)
            .delete('/api/users/' + res.body.id)
            .end((err, res) => {
              expect(res.status).to.be.oneOf([200, 204]);
              done();
            });
        });
    });
  });
});