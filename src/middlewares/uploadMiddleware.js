// middleware/uploadMiddleware.js
const multer = require('multer');
const cloudinary = require('../config/cloudinaryConfig');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configure multer-storage-cloudinary
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'products', // Folder where images will be stored in Cloudinary
        allowedFormats: ['jpeg', 'png', 'jpg', 'gif'],
    },
});

// Initialize multer
const upload = multer({ storage: storage });

module.exports = upload;
