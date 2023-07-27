const CategoryModel = require('../models/category_model');

const CategoryController = {
    createCategory: async function (req, res) {
        try {

            const categoryData = req.body;
            const newCategory = new CategoryModel(categoryData);
            await newCategory.save();
            return res.json({ success: true, message: "Category Saved", data: newCategory });

        } catch (ex) {
            return res.json({ success: false, message: ex });
        }
    },

    fetchAllCategory: async function (req, res) {
        try {

            const categories = await CategoryModel.find();
            return res.json({ success: true, message: "Success", data: categories });

        } catch (ex) {
            return res.json({ success: false, message: "Error" });
        }
    },


    fetchcategoryById: async function (req, res) {
        try {

            const id = req.params.id;
            const category = await CategoryModel.findById(id);
            if (!category) {
                return res.json({ success: false, message: "Category Not Found" });
            }
            return res.json({ success: true, message: "Category Found", data: category });

        } catch (ex) {
            return res.json({ success: false, message: ex });
        }
    },
};

module.exports = CategoryController;