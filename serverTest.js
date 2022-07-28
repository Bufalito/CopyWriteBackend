const express = require("express")
var bodyParser = require('body-parser')
var serverTest = express()

serverTest.use(bodyParser.urlencoded({ extended: false }))

serverTest.use(bodyParser.json())

serverTest.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


let texts = []

serverTest.get("/", (request, response) => {
    response.status(200).send(texts)
})

serverTest.get("/iecho", (request, response) => {
    const textQuery = request.query;
    const text = textQuery.text.toLowerCase();
    const ids = texts.map(text => text.id);
    const maxId = Math.max(...ids);

    let invertedText = text.split("").reverse().join("").toLowerCase();
    let newTextId = 0;
    ids.length === 0 ? newTextId = 1 : newTextId = maxId + 1;

    const newText = {
        id: newTextId,
        content: invertedText,
        palindrome: text === invertedText ? true : false,
    }

    text ? texts = [newText, ...texts] : console.log("")

    newText.content ?
        response.status(200).json(newText) && console.log(newText) :
        response.status(400).json({
            error: "no text",
        }) && console.log({ error: "no text" })
})

const PORTTEST = 3002
const server = serverTest.listen(PORTTEST, () => {
    console.log(`Server running on port ${PORTTEST}`)
})


module.exports = {serverTest, server}