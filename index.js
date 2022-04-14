const express = require('express');
const dotenv = require('dotenv');
const app = express();
const mongoose = require('mongoose');
dotenv.config();

app.use(express.json());

const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));


app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);

app.listen(8000, (err) => {
    if (!err)
        console.log("server running on port 8000")
})