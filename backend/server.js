const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

// Call router
const productRouter = require('./routes/productRoutes');

// Set routes
app.use('/api/v1/product', productRouter);

// Listen
app.listen(port, () => {
  console.log(`> Server is listening on port ${port}`);
});
