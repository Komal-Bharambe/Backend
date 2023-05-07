// class ErrorHandler extends Error{

//     constructor(message, statuscode){
//         super(message);

//         this.statusCode = statuscode
//     }
// }


const errorMiddleware = (err, req, res, next) =>{

    err.message = err.message || "Internal server Error"
    err.statusCode = err.statusCode || 500

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
}

module.exports = errorMiddleware
    
