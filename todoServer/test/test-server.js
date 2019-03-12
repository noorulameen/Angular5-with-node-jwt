var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);


describe('User module test case', function() {
  
  it('getcoin', function(done) {
	  chai.request(server)
	    .get('/todo/users/getcoin')
	    .end(function(err, res){
	      res.should.have.status(200);
	      done();
	    });
	});
  
  it('add', function(done) {
	  chai.request(server)
	    .post('/todo/users/add')
	    .end(function(err, res){
	      res.should.have.status(200);
	      done();
	    });
	});
  
  
  it('edit', function(done) {
	  chai.request(server)
	    .post('/todo/users/edit')
	    .end(function(err, res){
	      res.should.have.status(200);
	      done();
	    });
	});
  
  
});

