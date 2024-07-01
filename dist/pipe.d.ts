import { PipeTransform } from '@nestjs/common';
import { ZodDto } from './dto';
import { ZodExceptionCreator } from './exception';
import { ZodSchema } from 'zod';
interface ZodValidationPipeOptions {
    createValidationException?: ZodExceptionCreator;
}
declare type ZodValidationPipeClass = new (schemaOrDto?: ZodSchema | ZodDto) => PipeTransform;
export declare function createZodValidationPipe({ createValidationException, }?: ZodValidationPipeOptions): ZodValidationPipeClass;
export declare const ZodValidationPipe: ZodValidationPipeClass;
export {};
