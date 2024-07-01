import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ZodSchema } from 'zod';
import { ZodDto } from './dto';
export declare const ZodSerializerDtoOptions: "ZOD_SERIALIZER_DTO_OPTIONS";
export declare const ZodSerializerDto: (dto: ZodDto | ZodSchema) => import("@nestjs/common").CustomDecorator<"ZOD_SERIALIZER_DTO_OPTIONS">;
export declare class ZodSerializerInterceptor implements NestInterceptor {
    protected readonly reflector: any;
    constructor(reflector: any);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    protected getContextResponseSchema(context: ExecutionContext): ZodDto | ZodSchema | undefined;
}
