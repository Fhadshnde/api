const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// إعداد الاتصال بقاعدة البيانات
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// إعداد التوجيهات
app.use(express.json());

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from Express!' });
});

// إضافة التوجيهات الأخرى من الملفات
const authRoutes = require('../routes/auth');
const postRoutes = require('../routes/posts');
const userRoutes = require('../routes/users');

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

module.exports.handler = serverless(app);
