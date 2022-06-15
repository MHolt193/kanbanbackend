const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv/config')
const port = process.env.PORT || 5000
const connectDb = require('./config/db')

connectDb();

const app =  express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


app.use('/api/boards', require('./routes/boardRoutes'));
app.use('/api/users', require('./routes/userRoutes'));



//listen
app.listen(port, ()=>{
    console.log(`Server Running on port ${port}`)
});

//connect to db
