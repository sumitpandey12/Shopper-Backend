const ProductRoutes = require('express').Router();
const ProductController = require('./../controllers/product_controller');

ProductRoutes.post("/", ProductController.createProduct);
ProductRoutes.get("/", ProductController.fetchAllProduct);
ProductRoutes.get("/:id", ProductController.fetchProductById);
ProductRoutes.get("/category/:id", ProductController.fetchAllProductByCategory);

module.exports = ProductRoutes;