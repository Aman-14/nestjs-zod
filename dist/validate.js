"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const dto_1 = require("./dto");
const exception_1 = require("./exception");
function validate(value, schemaOrDto, createValidationException = exception_1.createZodValidationException) {
    const schema = (0, dto_1.isZodDto)(schemaOrDto) ? schemaOrDto.schema : schemaOrDto;
    const result = schema.safeParse(value);
    if (!result.success) {
        throw createValidationException(result.error);
    }
    return result.data;
}
exports.validate = validate;
