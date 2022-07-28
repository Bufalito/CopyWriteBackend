'use stricts'

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url = 'http://localhost:3002';

describe('Testeando con Chai: ', () => {

	it('Recibe texto por query y responde con status 200', (done) => {
		chai.request(url)
			.get('/iecho?text=hola')
			.end(function (err, res) {
				expect(res).to.have.status(200);
				done();
			});
	});

	it('si no recibe texto por query responde con status 400', (done) => {
		chai.request(url)
			.get('/iecho?text=')
			.end(function (err, res) {
				expect(res).to.have.status(400);
				done();
			});
	});

	it('Responde con status 200 si el texto es palindromo', (done) => {
		chai.request(url)
			.get('/iecho?text=acurruca')
			.end(function (err, res) {
				expect(res.body).to.have.property('palindrome').to.be.equal(true);
				expect(res).to.have.status(200);
				done();
			});
	});

	it('Logra invertir el texto recibido', (done) => {
		chai.request(url)
			.get('/iecho?text=test')
			.end(function (err, res) {
				expect(res.body).to.have.property('content').to.be.equal("tset");
				expect(res).to.have.status(200);
				done();
			});
	});


});



