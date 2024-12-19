import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { MyLoggerService } from './my-logger/my-logger.service';
import { Request, Response } from 'express'; // Import Express types

interface MyResponseObj {
  statusCode: number;
  timestamp: string;
  path: string;
  response: string | object;
}

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter implements ExceptionFilter {
  private readonly logger = new MyLoggerService(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>(); // Correctly type as Express Response
    const request = ctx.getRequest<Request>(); // Correctly type as Express Request

    let status: number;
    let message: string | object;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = 'Internal server error';
    }

    const myResponseObj: MyResponseObj = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      response: message,
    };

    // Log the exception details
    this.logger.error(
      `HTTP ${status} Error: ${JSON.stringify(myResponseObj)}`,
      exception instanceof Error ? exception.stack : ''
    );

    // Send response
    response.status(status).json(myResponseObj); // Ensure response is typed correctly
  }
}
