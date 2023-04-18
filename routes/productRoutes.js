import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  productCountController,
  productFiltersController,
  productListController,
  realtedProductController,
  seaarchProductController,
  updateProductController,
  productCategoryController,
  braintreeTokenController,
  brainTreePaymentController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
const router = express.Router();
//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);
//get products
router.get("/get-product", getProductController);
//single products
router.get("/get-product/:slug", getSingleProductController);
//get photo
router.get('/product-photo/:pid', productPhotoController);
//delete product
router.delete('/delete-product/:pid',deleteProductController)
//filter product
router.post('/product-filters',productFiltersController)
//product count
router.get('/product-count',productCountController)
//product per page
router.get('/product-list/:page',productListController)
//search product router 
router.get('/search/:keyword',seaarchProductController)
///similar product
router.get("/related-product/:pid/:cid", realtedProductController);


//category wise product
router.get("/product-category/:slug", productCategoryController);
//payment routes
//token
router.get('/braintree/token',braintreeTokenController)
//payments
router.post('/braintree/payment',requireSignIn,brainTreePaymentController)


export default router;
