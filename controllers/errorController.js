const AppError = require('./../Utils/appError');

const handleCastErrorDB = (err) => {
  if (process.env.NODE_ENV.trim() === 'production'){
    const message = `Invalid ${err.path} : ${err.value}.`;
    return new AppError(message, 400);
  } else{
    return new AppError('No tour found with that ID', 404)
  }
};



const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  //Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    //Programming or other unknown error: don't leak error details
  } else {
    // 1) Log error
    console.error('ERROR🔥', err);

    //2) Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    let error= {...err}
    if(err.name==='CastError'){
      error= handleCastErrorDB(error);
    }

    sendErrorDev(error, res);
    
  } else if (process.env.NODE_ENV.trim() === 'production') {
    let error = { ...err };

    if (err.name === 'CastError') {
      error = handleCastErrorDB(error);
    }

    sendErrorProd(error, res);
  }
};
