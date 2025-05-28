import { HttpException, HttpStatus } from "@nestjs/common";

export class ExceptionHandler{
    static throwInternalError(message: string): never {
        throw new HttpException({statusCode: 500, message: message}, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    static throwNotFoundError(message: string): never {
        throw new HttpException({statusCode: 404, message: message}, HttpStatus.NOT_FOUND);
    }
}