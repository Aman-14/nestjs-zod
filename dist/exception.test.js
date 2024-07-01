"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const exception_1 = require("./exception");
const zod_1 = require("zod");
describe('ZodValidationException', () => {
    it('should correctly create exception', () => {
        const UserSchema = zod_1.z.object({
            username: zod_1.z.string(),
            password: zod_1.z.string(),
        });
        const invalidUser = {
            username: 123,
            password: true,
        };
        const result = UserSchema.safeParse(invalidUser);
        expect(result.success).toBe(false);
        if (result.success)
            return;
        const error = new exception_1.ZodValidationException(result.error);
        expect(error).toBeInstanceOf(common_1.BadRequestException);
        expect(error.getStatus()).toBe(common_1.HttpStatus.BAD_REQUEST);
        expect(error.message).toBe('Validation failed');
        expect(error.getZodError()).toBe(result.error);
    });
});
