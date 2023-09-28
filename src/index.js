const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const bodyParser = require('body-parser');
dotenv.config()

const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
    return res.send('Hello World everyone!!!!!!!!!!!!');
})
app.use(bodyParser.json());

routes(app);


mongoose.connect(`${process.env.MONGO_DB}`)
    .then(() => { 
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err)
    })

app.listen(port, () => {
    console.log('Server is running in port ', + port);
})