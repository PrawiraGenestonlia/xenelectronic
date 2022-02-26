process.env.NODE_ENV = 'test';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { db } from '@database';

chai.use(chaiHttp);

describe('[GET] /api/user-permission/get-all', async () => {

  it('it should get all users', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .get('/api/user-permission/get-all')
        .end((err, res) => {
          expect(res.status).to.be.oneOf([200, 204]);
          expect(res.body).to.be.a('array');
          done();
        });
    });
  });

});