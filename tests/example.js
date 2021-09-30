require('dotenv').config();
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const chai = require('chai');

chai.use(chaiHttp);

const server = require('../app');

const agent = chai.request.agent(server);
const should = chai.should();

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('Index API endpoints', () => {
  // example
  it('should be return a greeting', (done) => {
    agent.get('/').end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });

  after((done) => {
        done();
  });
});