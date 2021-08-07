
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const { port,dbUrl } = require('./config');


const app = express()

app.use(cors())


app.use(express.urlencoded({ extended: true }))

app.use(express.json());


require('./src/app/routes/users.js')(app);

app.listen(port, () =>
  console.log(`My Node Server is running on: http://localhost:${port}.`)
)

app.get('/', (req, res) => {
    res.json({"message": "Welcome to My application"});
});

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbUrl, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});
