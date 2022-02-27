process.env.NODE_ENV = 'test';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { db } from '@database';

chai.use(chaiHttp);

describe('[GET] /api/server-status', async () => {
  it('it should get server-status', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .get('/api/server-status')
        .end((err, res) => {
          expect(res.status).to.be.oneOf([200, 204]);
          expect(res.body.status).to.contains('running');
          done();
        });
    });
  });
});

describe('[GET] /api/server-status/routes', async () => {
  it('it should get server-status routes', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .get('/api/server-status/routes')
        .end((err, res) => {
          expect(res.status).to.be.oneOf([200, 204]);
          expect(res.body).to.a('array');
          done();
        });
    });
  });
});