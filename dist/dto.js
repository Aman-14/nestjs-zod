"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isZodDto = exports.createZodDto = void 0;
function createZodDto(schema) {
    class AugmentedZodDto {
        static create(input) {
            return this.schema.parse(input);
        }
    }
    AugmentedZodDto.isZodDto = true;
    AugmentedZodDto.schema = schema;
    return AugmentedZodDto;
}
exports.createZodDto = createZodDto;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isZodDto(metatype) {
    return metatype?.isZodDto;
}
exports.isZodDto = isZodDto;
