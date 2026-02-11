import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomServerErrorException extends HttpException {
  constructor(e: Error, description: string) {
    super(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: e.message,
        description,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
      { cause: e, description },
    );
  }
}
