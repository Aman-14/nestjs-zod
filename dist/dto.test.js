"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dto_1 = require("./dto");
const zod_1 = require("zod");
describe('createZodDto', () => {
    it('should correctly create DTO', () => {
        const UserSchema = zod_1.z.object({
            username: zod_1.z.string(),
            password: zod_1.z.string(),
        });
        class UserDto extends (0, dto_1.createZodDto)(UserSchema) {
        }
        expect(UserDto.isZodDto).toBe(true);
        expect(UserDto.schema).toBe(UserSchema);
        const user = UserDto.create({
            username: 'vasya',
            password: 'strong',
        });
        expect(user).toEqual({
            username: 'vasya',
            password: 'strong',
        });
    });
});
