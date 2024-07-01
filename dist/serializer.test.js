"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ts_jest_1 = require("@golevelup/ts-jest");
const rxjs_1 = require("rxjs");
const zod_1 = require("zod");
const dto_1 = require("./dto");
const exception_1 = require("./exception");
const serializer_1 = require("./serializer");
describe('ZodSerializerInterceptor', () => {
    const UserSchema = zod_1.z.object({
        username: zod_1.z.string(),
    });
    class UserDto extends (0, dto_1.createZodDto)(UserSchema) {
    }
    const testUser = {
        username: 'test',
        password: 'test',
    };
    const context = (0, ts_jest_1.createMock)();
    test('interceptor should strip out password', async () => {
        const handler = (0, ts_jest_1.createMock)({
            handle: () => (0, rxjs_1.of)(testUser),
        });
        const reflector = (0, ts_jest_1.createMock)({
            getAllAndOverride: () => UserDto,
        });
        const interceptor = new serializer_1.ZodSerializerInterceptor(reflector);
        const userObservable = interceptor.intercept(context, handler);
        const user = await (0, rxjs_1.lastValueFrom)(userObservable);
        expect(user.password).toBe(undefined);
        expect(user.username).toBe('test');
    });
    test('wrong response shape should throw ZodSerializationException', async () => {
        const handler = (0, ts_jest_1.createMock)({
            handle: () => (0, rxjs_1.of)({ user: 'test' }),
        });
        const reflector = (0, ts_jest_1.createMock)({
            getAllAndOverride: () => UserDto,
        });
        const interceptor = new serializer_1.ZodSerializerInterceptor(reflector);
        const userObservable = interceptor.intercept(context, handler);
        expect((0, rxjs_1.lastValueFrom)(userObservable)).rejects.toBeInstanceOf(exception_1.ZodSerializationException);
    });
    test('interceptor should not strip out password if no UserDto is defined', async () => {
        const handler = (0, ts_jest_1.createMock)({
            handle: () => (0, rxjs_1.of)(testUser),
        });
        const reflector = (0, ts_jest_1.createMock)({
            getAllAndOverride: jest.fn(),
        });
        const interceptor = new serializer_1.ZodSerializerInterceptor(reflector);
        const userObservable = interceptor.intercept(context, handler);
        const user = await (0, rxjs_1.lastValueFrom)(userObservable);
        expect(user.password).toBe('test');
        expect(user.username).toBe('test');
    });
});
