import { CanActivate } from '@nestjs/common';
import { ZodDto } from './dto';
import { ZodExceptionCreator } from './exception';
import { Source } from './shared/types';
import { ZodSchema } from 'zod';
interface ZodBodyGuardOptions {
    createValidationException?: ZodExceptionCreator;
}
declare type ZodGuardClass = new (source: Source, schemaOrDto: ZodSchema | ZodDto) => CanActivate;
export declare function createZodGuard({ createValidationException, }?: ZodBodyGuardOptions): ZodGuardClass;
export declare const ZodGuard: ZodGuardClass;
export declare const UseZodGuard: (source: Source, schemaOrDto: ZodSchema | ZodDto) => MethodDecorator & ClassDecorator;
export {};
