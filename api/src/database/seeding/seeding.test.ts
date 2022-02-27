process.env.SEEDING_TEST = '1';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { db } from '@database';
import { seeding } from './index';

chai.use(chaiHttp);

describe('[SEEDING]', async () => {
  it('it should seed db', (done) => {
    db.connectToDB().then(() => {
      seeding().then(() => {
        done();
      })
    });
  });
});
