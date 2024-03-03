const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet=require('helmet')

const AppError = require('./Utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//1) GLOBAL MIDDLEWARES

//Set security HTTP headers
app.use(helmet());

// DEVELOPMENT LOGGING
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Limit request form same API
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, Please try again in an hour!',
});
app.use('/api',limiter);

//Body Parser, reading data from body into req.body
app.use(express.json({
  limit:'10kb'
}));



//Serving static files
app.use(express.static(`${__dirname}/public/`));

// Test Middlewares
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//3) Routes

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't Find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
