const { serverTest, server } = require('../serverTest')
var supertest = require('supertest');
let chai = require('chai');
var expect = chai.expect;

describe('Testeando con Supertest:', function () {
    it('Recupera los textos correctamente', async function () {
        const response = await supertest(serverTest)
            .get('/')
        expect(response.body)
    });

    it("Recibe texto por query y responde con status 200", async function () {
        const response = await supertest(serverTest)
            .get("/iecho?text=test")
        expect(response.status).to.equal(200)
    })

    it("Si no recibe texto por query responde con status 400", async function () {
        const response = await supertest(serverTest)
            .get("/iecho?text=")
        expect(response.status).to.equal(400)
    })

    it("Invierte el texto recibido", async function () {
        const response = await supertest(serverTest)
            .get("/iecho?text=hola")
        console.log(response.body.content)
        expect(response.body.content).to.equal("aloh")
    })

    it("Reconoce si el texto recibido es palindromo", async function () {
        const response = await supertest(serverTest)
            .get("/iecho?text=acurruca")
        expect(response.body.palindrome).to.equal(true);

    })
});
