import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ZodError } from 'zod';
export declare class ZodValidationException extends BadRequestException {
    private error;
    constructor(error: ZodError);
    getZodError(): ZodError<any>;
}
export declare class ZodSerializationException extends InternalServerErrorException {
    private error;
    constructor(error: ZodError);
    getZodError(): ZodError<any>;
}
export declare type ZodExceptionCreator = (error: ZodError) => Error;
export declare const createZodValidationException: ZodExceptionCreator;
export declare const createZodSerializationException: ZodExceptionCreator;
