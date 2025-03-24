// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');
const testRoute = require('./routes/test');  // إضافة السطر لاستيراد المسار
const cookieParser = require('cookie-parser');

const app = express();

// إعداد CORS للسماح بالوصول من الجهة الأمامية
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

// إعداد Body Parser
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 500000, limit: '500mb' }));

// إعداد Body Parsing و Cookies
app.use(express.json());
app.use(cookieParser());

// إضافة المسارات
app.use("/api", router);
app.use("/api", testRoute);  // إضافة المسار الذي تم تعريفه في routes/test.js

const PORT = process.env.PORT || 8080;

// الاتصال بقاعدة البيانات ثم بدء الخادم
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log("Server is running on port " + PORT);
    });
}).catch((error) => {
    console.log('Error connecting to database:', error);
});

module.exports = app;
