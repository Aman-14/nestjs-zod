"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodValidationPipe = exports.createZodValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const dto_1 = require("./dto");
const validate_1 = require("./validate");
function createZodValidationPipe({ createValidationException, } = {}) {
    let ZodValidationPipe = class ZodValidationPipe {
        constructor(schemaOrDto) {
            this.schemaOrDto = schemaOrDto;
        }
        transform(value, metadata) {
            if (this.schemaOrDto) {
                return (0, validate_1.validate)(value, this.schemaOrDto, createValidationException);
            }
            const { metatype } = metadata;
            if (!(0, dto_1.isZodDto)(metatype)) {
                return value;
            }
            return (0, validate_1.validate)(value, metatype.schema, createValidationException);
        }
    };
    ZodValidationPipe = __decorate([
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [Object])
    ], ZodValidationPipe);
    return ZodValidationPipe;
}
exports.createZodValidationPipe = createZodValidationPipe;
exports.ZodValidationPipe = createZodValidationPipe();
