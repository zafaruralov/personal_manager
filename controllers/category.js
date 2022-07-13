const { v4: uuidv4 } = require('uuid');
const Logger = require('../config/logger');
const Database = require('../db/index');
const AppError = require('../utils/AppError');


const categoryController = {
    getCategory: async (req, res, next) => {
        try {
            const result = await Database.query(
                `SELECT * FROM category`
            );
            const products = result.rows;
            Logger.info(`Products length ${products.length}`);
            res.status(200).json({ data: products });
        } catch (error) {
            next(error);
        }
    },
    createCategory: async (req, res, next) => {
        try {
            const { name } = req.body;
            const uuid = uuidv4();

            const values = [uuid, name];


            const result = await Database.query(
                'INSERT INTO category (id, name) VALUES ($1, $2) RETURNING *;',
                values
            );
            const product = result.rows[0];
            res.status(201).json({ data: product });
        } catch (error) {
            next(error);
        }
    },
    getOneCategory: async (req, res, next) => {
        try {
            const { id } = req.params;

            const result = await Database.query(
                `SELECT * from category WHERE id = $1;`,
                [id]
            );
            Logger.info('Got products list');

            const product = result.rows[0];
            Logger.info('Got products');

            if (!product) {
                Error();
                const err = new AppError(400, `Not found with id ${id}`);
                return next(err);
            }
            Logger.info('Response sent to client');

            res.status(200).json({ data: product });
        } catch (error) {
            next(error);
        }
    },
    updateCategory: async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name } = req.body
            const result = await Database.query(
                'UPDATE category SET name = $1 WHERE id = $2',
                [name, id]
            )
            const product = result.rows[0];
            res.status(200).json({ data: product });
        } catch (error) {
            next(error)
        }
    },
    deleteCategory: async (req, res, next) => {
        try {
            const { id } = req.params
            const result = await Database.query(
                'DELETE FROM category WHERE id = $1',
                [id]
            )
            const product = result.rows[0];
            res.json({ data: product });
        } catch (error) {
            next(error)
        }
    },
}
module.exports = categoryController;