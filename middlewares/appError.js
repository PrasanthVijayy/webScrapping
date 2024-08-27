class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

class BadRequestError extends AppError {
    constructor(message = 'Bad Request') {
        super(message, 400);
    }
}

class NotFoundError extends AppError {
    constructor(message = 'Not Found') {
        super(message, 404);
    }
}

class AuthError extends AppError {
    constructor(message = 'Authentication Failed') {
        super(message, 401);
    }
}

class DbError extends AppError {
    constructor(message = 'Database Error') {
        super(message, 500);
    }
}

class InternalServerError extends AppError {
    constructor(message = 'Internal Server Error') {
        super(message, 500);
    }
}

class UnacceptableError extends AppError {
    constructor(message = 'Not Acceptable') {
        super(message, 406);
    }
}

export {
    AppError,
    BadRequestError,
    NotFoundError,
    AuthError,
    DbError,
    InternalServerError,
    UnacceptableError
};
