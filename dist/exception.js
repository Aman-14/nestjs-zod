"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createZodSerializationException = exports.createZodValidationException = exports.ZodSerializationException = exports.ZodValidationException = void 0;
const common_1 = require("@nestjs/common");
class ZodValidationException extends common_1.BadRequestException {
    constructor(error) {
        super({
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            message: 'Validation failed',
            errors: error.errors,
        });
        this.error = error;
    }
    getZodError() {
        return this.error;
    }
}
exports.ZodValidationException = ZodValidationException;
class ZodSerializationException extends common_1.InternalServerErrorException {
    constructor(error) {
        super();
        this.error = error;
    }
    getZodError() {
        return this.error;
    }
}
exports.ZodSerializationException = ZodSerializationException;
const createZodValidationException = (error) => {
    return new ZodValidationException(error);
};
exports.createZodValidationException = createZodValidationException;
const createZodSerializationException = (error) => {
    return new ZodSerializationException(error);
};
exports.createZodSerializationException = createZodSerializationException;
