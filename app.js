const express = require('express');
const Logger = require('./config/logger');
const morganMiddleware = require('./config/morganMiddleware');
const middlewares = require('./middlewares');

const productsRouter = require('./routes/product');
const usersRouter = require('./routes/user');
const categoryRouter = require('./routes/category.js');

const app = express();

app.use(express.json()); 
app.use(morganMiddleware);

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.use(
    '/products',
    productsRouter
);
app.use('/users',  usersRouter);
app.use('/category',  categoryRouter);
// app.use('/orders', ordersRouter);

app.use((err, req, res, next) => {
    console.log(err);
    Logger.error(err.message);
    res.status(err.statusCode || 500).json({ message: err.message });
});

app.use('*', middlewares.notFound);

const PORT = process.env.APP_PORT;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
