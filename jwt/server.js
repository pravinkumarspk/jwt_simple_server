const express = require('express')
require('dotenv').config()
const app = express();
const jwt = require('jsonwebtoken')

app.use(express.json())


const posts=[
    {
        username:"Spk",
        title:"Post 1"
    },
    {
        username:"Udhay",
        title:"Post 2"
    }
]

function authenticate(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
        if(err) res.sendStatus(403)
        
        req.user = user
        next()
    })
}

app.get('/posts',authenticate,(req,res)=>{
    res.json(posts.filter(post=>post.username === req.user.name))
})



app.listen(3000,()=>{
    console.log("Server Started")
})