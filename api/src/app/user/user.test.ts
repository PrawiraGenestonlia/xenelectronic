process.env.NODE_ENV = 'test';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { db } from '@database';

chai.use(chaiHttp);

describe('/GET user', async () => {

  await db.connectToDB();
  it('it should GET all the users', (done) => {
    chai.request(app)
      .get('/api/user-permission/get-all')
      .end((err, res) => {
        expect(res.status).to.be.oneOf([200, 204]);
        // res.body.should.be.a('array');
        // res.body.length.should.be.eql(0);
        done();
      });
  });
});