require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose')
const mongoString = process.env.DATABASE_URL
const routes = require('./routes/routes')

// Conect Database
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();

app.use(express.json());
// Let's use the routes 
// Now, all our endpoints will start from '/api'.
// app.use takes two things. One is the base endpoint, and the other is the contents of the routes.
app.use('/api', routes) 

app.listen(3000, () => {
    console.log("Server started at 3000")
})