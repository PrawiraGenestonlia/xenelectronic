process.env.NODE_ENV = 'development';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import { db } from '@database';

chai.use(chaiHttp);

describe('[POST] /login', async () => {
  it('it should login to ensure user exists', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .post('/api/users/login')
        .send({ 'name': 'testuser' })
        .end((err, res) => {
          expect(res.status).to.be.oneOf([200]);
          done();
        });
    });
  });
});

describe('[GET] /api/docs/', async () => {
  it('it should get swagger file', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .get('/api/docs/')
        .end((err, res) => {
          expect(res.status).to.be.oneOf([200, 304]);
          done();
        });
    });
  });
  it('it should return 404', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .post('/api/users3')
        .end((err, res) => {
          expect(res.status).to.be.oneOf([204, 404]);
          done();
        });
    });
  });
});

describe('[GET] /api/carts', async () => {
  it('it should get all carts', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .get('/api/carts')
        .end((err, res) => {
          expect(res.status).to.be.oneOf([200, 204]);
          expect(res.body).to.be.a('array');
          done();
        });
    });
  });
});

describe('[GET] /api/carts/{user}', async () => {
  it('it should fail to find cart for unknownuser', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .get('/api/carts/unknownuser')
        .end((err, res) => {
          expect(res.status).to.be.oneOf([500]);
          done();
        });
    });
  });
  it('it should get cart for testuser', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .get('/api/carts/testuser')
        .end((err, res) => {
          expect(res.status).to.be.oneOf([200, 204]);
          expect(res.body).to.a('array');
          done();
        });
    });
  });
});

describe('[POST] /api/carts/add', async () => {
  it('it should fail', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .post('/api/carts/add')
        .send({ name: 'unknowuser22', productName: 'XenBox 5' })
        .end((err, res) => {
          expect(res.status).to.be.oneOf([500]);
          done();
        });
    });
  });
  it('it should fail', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .post('/api/carts/add')
        .send({ name: 'testuser', productName: 'unknownproduct' })
        .end((err, res) => {
          expect(res.status).to.be.oneOf([500]);
          done();
        });
    });
  });
  it('it should add product to cart', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .post('/api/carts/add')
        .send({ name: 'testuser', productName: 'Super XenFan 3' })
        .end((err, res) => {
          expect(res.status).to.be.oneOf([200, 204]);
          expect(res.body.product.productName).to.contains('Super XenFan 3');
          done();
        });
    });
  });
});

describe('[POST] /api/carts/remove', async () => {
  it('it should fail', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .post('/api/carts/remove')
        .send({ name: 'unknowuser22', productName: 'XenBox 5' })
        .end((err, res) => {
          expect(res.status).to.be.oneOf([500]);
          done();
        });
    });
  });
  it('it should fail', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .post('/api/carts/remove')
        .send({ name: 'testuser', productName: 'unknownproduct' })
        .end((err, res) => {
          expect(res.status).to.be.oneOf([500]);
          done();
        });
    });
  });
  it('it should remove product from cart', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .post('/api/carts/remove')
        .send({ name: 'testuser', productName: 'Super XenFan 3' })
        .end((err, res) => {
          expect(res.status).to.be.oneOf([200, 204]);
          done();
        });
    });
  });
});

describe('[POST] /api/carts/checkout', async () => {
  it('it should fail to find unknownuser', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .post('/api/carts/checkout/unknownuser')
        .end((err, res) => {
          expect(res.status).to.be.oneOf([500]);
          done();
        });
    });
  });
  it('it should check a user out', (done) => {
    db.connectToDB().then(() => {
      chai.request(app)
        .post('/api/carts/checkout/testuser')
        .end((err, res) => {
          expect(res.status).to.be.oneOf([200, 204]);
          expect(res.body.status).to.contains('successful');
          done();
        });
    });
  });
});