const { v4: uuidv4 } = require('uuid');
const Logger = require('../config/logger');
const Database = require('../db/index');
const AppError = require('../utils/AppError');

const mapToProductWithUser = (product) => {
    return {
        _id: product.id,
        title: product.title,
        price: product.price,
        status: product.status,
        created_at: product.created_at,
        category: {
            _id: product.category_id,
            name: product.category
        },
    };
};

const productsController = {
    getProducts: async (req, res, next) => {
        try {
//             const result = await Database.query(
//                 `SELECT * FROM product;`
//             );
// 1

            const result = await Database.query(
                `SELECT p.id, p.title, p.price,
                p.category_id, p.created_at, p.status, c.name as "category"
                from product p JOIN category c ON p.category_id = c.id;`
            );
            const products = result.rows;
            const prods = products.map(mapToProductWithUser);
            Logger.info(`Products length ${products.length}`);
            res.status(200).json({ data: prods });
        } catch (error) {
            next(error);
        }
    },
    createProduct: async (req, res, next) => {
        try {
            const { category_id } = req.body;
            const { title, price, isImportant } = req.body;
            const uuid = uuidv4();

            const values = [uuid, title, price, category_id, isImportant];
            const result = await Database.query(
                'INSERT INTO product (id, title, price , category_id, status) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
                values
            );
            const product = result.rows[0];
            res.status(201).json({ data: product });
        } catch (error) {
            next(error);
        }
    },
    getOneProduct: async (req, res, next) => {
        try {
            const { id } = req.params;


            Logger.info('Connected to db');
            const result = await Database.query(
                `SELECT * from product WHERE id = $1;`,
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
            Logger.info('REsponse sent to client');

            res.status(200).json({ data: product });
        } catch (error) {
            next(error);
        }
    },
    updateProduct: async (req, res, next) => {
        try {
            const uuid = uuidv4()
            const { title, price } = req.body
            const result = await Database.query(
                'UPDATE product SET title = $1, price = $2 WHERE id = $3',
                [title, price, uuid]
            )
            const product = result.rows[0];
            res.status(200).json({ data: product });
        } catch (error) {
            next(error)
        }
    },
    deleteProduct: async (req, res, next) => {
        try {
            const { id } = req.params
            const result = await Database.query(
                'DELETE FROM product WHERE id = $1',
                [id]
            )
            const product = result.rows[0];
            res.json({ data: product });
        } catch (error) {
            next(error)
        }
    },
};

module.exports = productsController;
