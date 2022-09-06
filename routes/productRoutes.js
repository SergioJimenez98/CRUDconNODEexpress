const express = require("express");
const productController = require('./../controllers/productsController.js');

const productRouter = express.Router();

//ROUTES
productRouter.route("/").get(productController.getAllProducts).post(productController.addProduct);
productRouter.route("/:id").get(productController.getProductById).put(productController.upDateProduct).delete(productController.deleteProduct);

module.exports = productRouter; 