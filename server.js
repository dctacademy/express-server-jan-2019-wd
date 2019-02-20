const express = require('express') 
const uuid = require('uuid') // npm install --save uuid // used for generating unique ids
const cors = require('cors')
const app = express()
const port = 3000

// configuration allow express to read incoming json data 
app.use(express.json())
app.use(cors())

// Request Handler (Route handlers)
// app.httpMethod(path, function)
// localhost:3000/

// function logRequets(request) {
//     console.log(request.url, request.ip, request.method, new Date())
// }

// app.get('/', function(request, response){
//     logRequets(request)
//     response.send('hello world')
// })

// // localhost:3000/contact
// app.get('/contact', function(request, response){
//     logRequets(request)
//     response.send('contact us page')
// })

// // localhost:3000/users 
// app.get('/users', function(request, response){
//     logRequets(request)
//     response.send('<ul> <li> Suresh </li> </ul>')
// })

// // localhost:3000/products 
// app.get('/products', (req, res) => {
//     logRequets(req)
//     const products = [
//         { id: 1, name: 'marker' },
//         { id: 2, name: 'scale'}
//     ]
//     res.send(products)
// })

// POST - Create
// GET - Read
// PUT - Update
// DELETE - Destroy

const users = [
    { id: uuid(), name: 'arjun', email: 'arjun@gmail.com' }
]

// GET localhost:3000/users - must list all users 
app.get('/users/list', function(req, res){
    // res.send(`${req.method} called for ${req.url}`)
    res.send(users)
})

// GET localhost:3000/users/show/:id -must  show one user 
// users/show/1 OR users/show/2 or users/show/3
app.get('/users/show/:id', function(req,res){
    // res.send(`${req.method} called for ${req.url} with ${req.params.id}`)
    const user = users.find(function(user){
        return user.id == req.params.id 
    })
    if(user) {
        res.send(user)
    } else {
        res.send({})
    }
})

// POST localhost:3000/users/create - must be able to create a new user 
app.post('/users/create', function(req, res){
    // console.log(req.body)
    // const { id, email} = req.body
    // res.send(`${req.method} called for ${req.url} with ${id} ${email} ${req.body.name}`)
    const user = req.body // to read json we must have defined app.use(express.json())
    user.id = uuid()
    users.push(user) 
    res.send({
        user, 
        notice: 'successfully created user'
    })

})


// PUT localhost:3000/users/update/:id - must be able to update a user 
app.put('/users/update/:id', function(req, res){
    // res.send(`${req.method} called for ${req.url} to update ${req.params.id}`)
    const id = req.params.id 
    const body = req.body 
    const user = users.find(function(user){
        return user.id == id 
    })
    if(user) {
        Object.assign(user, body)
        res.send({
            user,
            notice: 'successfully updated the user'
        })
    } else {
        res.send({})
    }
  
})


// DELETE localhost:3000/users/delete/:id - must be able to delete a user
app.delete('/users/delete/:id', function(req, res){
    // res.send(`${req.method} called for ${req.url} to delete ${req.params.id}`)
    const index = users.findIndex(function(user){
        return user.id == req.params.id 
    })
    
    if(index >= 0){
        users.splice(index, 1)
        res.send({
            notice: 'successfully removed the user'
        })
    } else {
        res.send({})
    }
  
    
})


// nested routes 
// app.get('/users/:id/projects')

app.get('/users/:id/projects/:projectId/tasks/:taskId', function(req, res){
    res.send(req.params)
})

app.listen(port, () => {
    console.log('listening on port', port)
})