uploadProductImage = (req, res) => {
  try {
    if (req.file) {
      res.status(200).json({
        message: "Image uploaded successfully",
        filePath: req.file.path,
        success: true,
      });
    } else {
      res
        .status(400)
        .json({ message: "Please upload an image file.", success: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = { uploadProductImage };
