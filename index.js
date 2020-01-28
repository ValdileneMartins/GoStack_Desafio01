const express = require('express')
const server = express()
server.use(express.json())

const projects = []
var count = 0

//Middlewares

server.listen(3000)