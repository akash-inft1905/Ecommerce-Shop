import express from "express";
import {
  getProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validator.js";
import { body, check, param } from "express-validator";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "cloudinary";

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "products", // Your folder name in Cloudinary
    allowedFormats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

// Validation schema
const validator = {
  getProducts: [
    check("limit")
      .optional()
      .isNumeric()
      .withMessage("Limit parameter must be a number")
      .custom((value) => {
        if (value < 0) throw new Error("Value should not be less than Zero");
        return true;
      }),
    check("skip")
      .optional()
      .isNumeric()
      .withMessage("skip parameter must be a number")
      .custom((value) => {
        if (value < 0) throw new Error("Value should not be less than Zero");
        return true;
      }),
    check("search").optional().trim().escape(),
  ],
  createProduct: [
    check("name").trim().notEmpty().withMessage("Name is required").escape(),
    check("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required")
      .escape(),
    check("brand").trim().notEmpty().withMessage("Brand is required").escape(),
    check("category")
      .trim()
      .notEmpty()
      .withMessage("Category is required")
      .escape(),
    check("price")
      .notEmpty()
      .withMessage("Price is required")
      .isNumeric()
      .withMessage("Price must be a number"),
    check("countInStock")
      .notEmpty()
      .withMessage("Count in stock is required")
      .isNumeric()
      .withMessage("Count in stock must be a number"),
  ],
  createProductReview: [
    param("id")
      .notEmpty()
      .withMessage("Id is required")
      .isMongoId()
      .withMessage("Invalid Id Format"),
    body("rating")
      .notEmpty()
      .withMessage("Rating is Empty")
      .bail()
      .isNumeric()
      .withMessage("Ratings must be number"),
    body("comment").trim().escape(),
  ],
  getProduct: [
    param("id")
      .notEmpty()
      .withMessage("Id is required")
      .isMongoId()
      .withMessage("Invalid Id Format"),
  ],
  deleteProduct: [
    param("id")
      .notEmpty()
      .withMessage("Id is required")
      .isMongoId()
      .withMessage("Invalid Id Format"),
  ],
  updateProduct: [
    check("name").trim().notEmpty().withMessage("Name is required").escape(),
    check("description")
      .trim()
      .notEmpty()
      .withMessage("Description is required")
      .escape(),
    check("brand").trim().notEmpty().withMessage("Brand is required").escape(),
    check("category")
      .trim()
      .notEmpty()
      .withMessage("Category is required")
      .escape(),
    check("price")
      .notEmpty()
      .withMessage("Price is required")
      .isNumeric()
      .withMessage("Price must be a number"),
    check("countInStock")
      .notEmpty()
      .withMessage("Count in stock is required")
      .isNumeric()
      .withMessage("Count in stock must be a number"),
    param("id")
      .notEmpty()
      .withMessage("Id is required")
      .isMongoId()
      .withMessage("Invalid Id Format"),
  ],
};

// Define routes
const router = express.Router();

// Add image upload middleware in createProduct and updateProduct routes
router
  .route("/")
  .post(
    upload.single("image"),
    validator.createProduct,
    validateRequest,
    protect,
    admin,
    createProduct
  )
  .get(validator.getProducts, validateRequest, getProducts);

router.get("/top", getTopProducts);

router.post(
  "/reviews/:id",
  validator.createProductReview,
  validateRequest,
  protect,
  createProductReview
);

router
  .route("/:id")
  .get(validator.getProduct, validateRequest, getProduct)
  .put(
    upload.single("image"),
    validator.updateProduct,
    validateRequest,
    protect,
    admin,
    updateProduct
  )
  .delete(
    validator.deleteProduct,
    validateRequest,
    protect,
    admin,
    deleteProduct
  );

export default router;
