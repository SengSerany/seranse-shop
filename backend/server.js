const express = require('express');
require('dotenv').config();
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const Auth = require('./models/authModel');

const { errorHandler } = require('./middleware/errorHandler');

const port = process.env.PORT || 5000;
connectDB();

// Call router
const productRouter = require('./routes/productRoutes');
const authRouter = require('./routes/authRoutes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 },
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Set routes
app.use('/api/v1/product', productRouter);
app.use('/api/v1/auth', authRouter);

// Session
passport.use(Auth.createStrategy());
passport.serializeUser(Auth.serializeUser());
passport.deserializeUser(Auth.deserializeUser());

// Error middleware
app.use(errorHandler);

// Listining
app.listen(port, () => {
  console.log(`> Server is listening on port ${port}`);
});
