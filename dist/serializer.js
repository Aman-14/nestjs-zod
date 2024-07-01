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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZodSerializerInterceptor = exports.ZodSerializerDto = exports.ZodSerializerDtoOptions = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const validate_1 = require("./validate");
const exception_1 = require("./exception");
// NOTE (external)
// We need to deduplicate them here due to the circular dependency
// between core and common packages
const REFLECTOR = 'Reflector';
exports.ZodSerializerDtoOptions = 'ZOD_SERIALIZER_DTO_OPTIONS';
const ZodSerializerDto = (dto) => (0, common_1.SetMetadata)(exports.ZodSerializerDtoOptions, dto);
exports.ZodSerializerDto = ZodSerializerDto;
let ZodSerializerInterceptor = class ZodSerializerInterceptor {
    constructor(reflector) {
        this.reflector = reflector;
    }
    intercept(context, next) {
        const responseSchema = this.getContextResponseSchema(context);
        return next.handle().pipe((0, rxjs_1.map)((res) => {
            if (!responseSchema)
                return res;
            if (typeof res !== 'object' || res instanceof common_1.StreamableFile)
                return res;
            return Array.isArray(res)
                ? res.map((item) => (0, validate_1.validate)(item, responseSchema, exception_1.createZodSerializationException))
                : (0, validate_1.validate)(res, responseSchema, exception_1.createZodSerializationException);
        }));
    }
    getContextResponseSchema(context) {
        return this.reflector.getAllAndOverride(exports.ZodSerializerDtoOptions, [
            context.getHandler(),
            context.getClass(),
        ]);
    }
};
ZodSerializerInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(REFLECTOR)),
    __metadata("design:paramtypes", [Object])
], ZodSerializerInterceptor);
exports.ZodSerializerInterceptor = ZodSerializerInterceptor;
