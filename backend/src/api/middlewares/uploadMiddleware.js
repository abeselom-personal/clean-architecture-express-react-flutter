const multer = require('multer');
const path = require('path');

// Configure multer storage to save images in a specific folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // Store in 'uploads' folder
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // Get file extension
    const fileName = Date.now() + ext; // Generate a unique file name
    cb(null, fileName);
  }
});

// File filter to accept only certain image types
const fileFilter = (req, file, cb) => {
  // Allowed file types: JPEG, PNG, GIF, WebP
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    return cb(new Error('Only image files (jpeg, jpg, png, gif, webp) are allowed.'));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,  // Validate file types
});

module.exports = upload;
