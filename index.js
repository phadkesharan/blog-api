const express = require('express');
const dotenv = require('dotenv');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
dotenv.config();


app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")))


const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, String(req.body.name));
    }
})

const upload = multer({ storage: storage });

const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoryRoute = require('./routes/categories');

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true

    })
    .then(() => console.log("Database connected!"))
    .catch(err => console.log(err));



app.post("/api/uploads", upload.single('file'), (req, res) => {
    res.status(200).json("File has been uploaded!");
})

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);
app.use('/api/categories', categoryRoute);



app.listen(8000, (err) => {
    if (!err)
        console.log("server running on port 8000")
})


