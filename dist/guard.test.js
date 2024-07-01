"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_jest_1 = require("@golevelup/ts-jest");
const dto_1 = require("./dto");
const exception_1 = require("./exception");
const guard_1 = require("./guard");
const zod_1 = require("zod");
describe('ZodGuard', () => {
    const UserSchema = zod_1.z.object({
        username: zod_1.z.string(),
        password: zod_1.z.string(),
    });
    const UserDto = class Dto extends (0, dto_1.createZodDto)(UserSchema) {
    };
    const contextMock = (0, ts_jest_1.createMock)();
    function mockSource(source, value) {
        contextMock.switchToHttp().getRequest.mockReturnValue({ [source]: value });
    }
    it('should work with any source and with Schema or DTO', () => {
        const sources = ['body', 'params', 'query'];
        for (const source of sources) {
            for (const schemaOrDto of [UserSchema, UserDto]) {
                const guard = new guard_1.ZodGuard(source, schemaOrDto);
                const valid = {
                    username: 'vasya',
                    password: '123',
                };
                const invalid = {
                    username: 'vasya',
                    password: 123,
                };
                mockSource(source, valid);
                expect(guard.canActivate(contextMock)).toBe(true);
                mockSource(source, invalid);
                expect(() => guard.canActivate(contextMock)).toThrowError(exception_1.ZodValidationException);
            }
        }
    });
});
