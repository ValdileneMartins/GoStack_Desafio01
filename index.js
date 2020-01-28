const express = require('express')
const server = express()
server.use(express.json())

const projects = []
var count = 0

//Middlewares

server.use((req, res, next) =>{
    count++
    console.log(count + ' ' + 'requests made')
    return next()
})

function checkIdExist(req, res, next){
    const {id} = req.params
    const project = projects.find(project => project.id === id) 
    if(!project){
        res.status(400).json('Project does not exists')
    }
    return next()
}

server.listen(3000)
