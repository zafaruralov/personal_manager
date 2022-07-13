const categoryController = require('../controllers/category.js');

const categoryRouter = require('express').Router();

categoryRouter
    .route('/')
    .get(categoryController.getCategory)
    .post(categoryController.createCategory);


categoryRouter
    .route('/:id')
    .get(categoryController.getOneCategory)
    .put(categoryController.updateCategory)
    .delete(categoryController.deleteCategory);


module.exports = categoryRouter;
