const ProductModel = require('../models/product_model');

const ProductController = {
    createProduct: async function(req, res){
        try {
            
            const productData =  req.body;
            const newProduct = new ProductModel(productData);
            await newProduct.save();
            return res.json({ success: true, message: "Product Saved", data: newProduct});

        } catch (ex) {
            return res.json({ success: false, message: ex });
        }
    },

    fetchAllProduct: async function(req, res){
        try {
            
            const products = await ProductModel.find();
            return res.json({ success: true, message: "Success", data: products});

        } catch (ex) {
            return res.json({ success: false, message: "Error" });
        }
    },


    fetchProductById: async function(req, res){
        try {
            
            const id = req.params.id;
            const product = await ProductModel.findById(id);
            if(!product){
                return res.json({ success: false, message: "Product Not Found"});
            }
            return res.json({ success: true, message: "Product Found", data: product});

        } catch (ex) {
            return res.json({ success: false, message: ex });
        }
    },

    fetchAllProductByCategory: async function (req, res) {
        try {

            const categoryId = req.params.id;
            const products = await ProductModel.find({category:categoryId});
            return res.json({ success: true, message: "Products Found", data: products });
        } catch (ex) {
            return res.json({ success: false, message: ex });
        }
    }
};

module.exports = ProductController;