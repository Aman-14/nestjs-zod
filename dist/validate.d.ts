import { ZodSchema, ZodTypeDef } from 'zod';
import { ZodDto } from './dto';
import { ZodExceptionCreator } from './exception';
export declare function validate<TOutput = any, // eslint-disable-line @typescript-eslint/no-explicit-any
TDef extends ZodTypeDef = ZodTypeDef, TInput = TOutput>(value: unknown, schemaOrDto: ZodSchema<TOutput, TDef, TInput> | ZodDto<TOutput, TDef, TInput>, createValidationException?: ZodExceptionCreator): TOutput;
