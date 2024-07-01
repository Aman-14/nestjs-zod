"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dto_1 = require("./dto");
const exception_1 = require("./exception");
const pipe_1 = require("./pipe");
const zod_1 = require("zod");
describe('ZodValidationPipe', () => {
    const UserSchema = zod_1.z.object({
        username: zod_1.z.string(),
        password: zod_1.z.string(),
    });
    const UserDto = class Dto extends (0, dto_1.createZodDto)(UserSchema) {
    };
    it('should use manually passed Schema / DTO for validation', () => {
        for (const schemaOrDto of [UserSchema, UserDto]) {
            const pipe = new pipe_1.ZodValidationPipe(schemaOrDto);
            const valid = {
                username: 'vasya',
                password: '123',
            };
            const invalid = {
                username: 'vasya',
                password: 123,
            };
            const metadata = {
                type: 'body',
            };
            expect(pipe.transform(valid, metadata)).toEqual(valid);
            expect(() => pipe.transform(invalid, metadata)).toThrowError();
        }
    });
    it('should use contextual Dto for validation', () => {
        const pipe = new pipe_1.ZodValidationPipe();
        const valid = {
            username: 'vasya',
            password: '123',
        };
        const invalid = {
            username: 'vasya',
            password: 123,
        };
        const metadata = {
            type: 'body',
            metatype: class Dto extends (0, dto_1.createZodDto)(UserSchema) {
            },
        };
        expect(pipe.transform(valid, metadata)).toEqual(valid);
        expect(() => pipe.transform(invalid, metadata)).toThrowError(exception_1.ZodValidationException);
    });
});
