// Define centralized error handler middleware
const errorHandler = (err, res) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    console.error(err);

    // Send the error response to the client
    return res.status(statusCode).json({message});
};

module.exports = errorHandler;