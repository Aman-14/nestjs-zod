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
exports.UseZodGuard = exports.ZodGuard = exports.createZodGuard = void 0;
const common_1 = require("@nestjs/common");
const validate_1 = require("./validate");
function createZodGuard({ createValidationException, } = {}) {
    let ZodGuard = class ZodGuard {
        constructor(source, schemaOrDto) {
            this.source = source;
            this.schemaOrDto = schemaOrDto;
        }
        canActivate(context) {
            const data = context.switchToHttp().getRequest()[this.source];
            (0, validate_1.validate)(data, this.schemaOrDto, createValidationException);
            return true;
        }
    };
    ZodGuard = __decorate([
        (0, common_1.Injectable)(),
        __metadata("design:paramtypes", [String, Object])
    ], ZodGuard);
    return ZodGuard;
}
exports.createZodGuard = createZodGuard;
exports.ZodGuard = createZodGuard();
const UseZodGuard = (source, schemaOrDto) => (0, common_1.UseGuards)(new exports.ZodGuard(source, schemaOrDto));
exports.UseZodGuard = UseZodGuard;
