const express = require('express');
require('dotenv').config();
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');

const port = process.env.PORT || 5000;
connectDB();

// Call router
const productRouter = require('./routes/productRoutes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set routes
app.use('/api/v1/product', productRouter);

// Error middleware
app.use(errorHandler);

// Listining
app.listen(port, () => {
  console.log(`> Server is listening on port ${port}`);
});
