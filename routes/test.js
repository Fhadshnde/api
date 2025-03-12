const express = require('express');
const router = express.Router();

router.get('/test', async (req, res) => {
    try {
        // محاكاة عملية طويلة الأمد
        setTimeout(() => {
            res.status(200).send('Test route is working.');
        }, 2000); // إعداد مهلة زمنية قصيرة لتجنب انتهاء المهلة الزمنية
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' })
    }
});

module.exports = router;
