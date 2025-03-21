const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 4000;


//routes require

const userRoutes = require('./routes/User');
const profileRoutes = require('./routes/Profile');
const paymentRoutes = require('./routes/Payments');
const courseRoutes = require('./routes/Course');

const cookieParser = require('cookie-parser');

//cors give power to connect with frontend
const cors = require('cors');

const dbConnect = require('./config/database');

//connect cloudinary

const  cloudinaryConnect  = require('./config/cloudinary');
const fileUpload = require('express-fileupload');

dbConnect();

// Middleware to parse JSON request bodies

app.use(express.json());
app.use(cookieParser());

app.use(cors({

    origin: "https://ede-techy.vercel.app",
    credentials: true,
}));
// app.use(cors({

//     origin: "http://localhost:3000",
//     credentials: true,
// }));


app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
}));

//cloudinary connection

cloudinaryConnect();

//mount routes

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/payment', paymentRoutes);

// default route

app.get('/', (req, res) => {

    return res.status(200).json({

        success: true,
        message: "Your server is up and running...",
    })
});

app.listen(PORT, () => { 

    console.log(`Server is running at Port : ${PORT}`);
})
