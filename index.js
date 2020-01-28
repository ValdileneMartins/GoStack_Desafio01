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

//Routes

//List all projects
server.get('/projects', (req, res) =>{
    return res.json(projects)
})

//List project according to id
server.get('/projects/:id', checkIdExist, (req, res) =>{
    const {id} = req.params
    const project = projects.find(project => project.id === id)
    return res.json(project)
})

server.post('/projects', (req, res) =>{
    const {id, title, tasks} = req.body
    const project = {            //Create project object
        id : id,
        title: title,
        tasks: []
    }
    projects.push(project)       //Add project object in array projects
    return res.json('Project created successfuly')
})

server.post('/projects/:id/tasks', checkIdExist, (req, res) =>{
    const {id} = req.params
    const {title} = req.body
    const project = projects.find(project => project.id === id)
    project.tasks.push(title)
    return res.json('Task created successfuly')
})

server.put('/projects/:id', checkIdExist, (req, res) =>{
    const {id} = req.params
    const {title} = req.body
    const project = projects.find(project => project.id === id)
    project.title = title
    return res.json(project)
   
})

server.delete('/projects/:id', checkIdExist, (req, res) =>{
    const {id} = req.params
    const projectIndex = projects.findIndex(project => project.id === id)
    projects.splice(projectIndex, 1)
    return res.json('Project deleted successfuly')
})


server.listen(3000)
