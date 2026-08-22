import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';

import {
  Request,
  Response,
  NextFunction,
} from 'express';

import {
  map,
} from 'rxjs/operators';

/*
|--------------------------------------------------------------------------
| API Response Interceptor
|--------------------------------------------------------------------------
*/

export class ApiResponseInterceptor {
  intercept(
    context: any,
    next: any,
  ) {
    return next.handle().pipe(
      map((data: any) => ({
        success: true,
        data,
        message: 'OK',
      })),
    );
  }
}

/*
|--------------------------------------------------------------------------
| Global Exception Filter
|--------------------------------------------------------------------------
*/

@Catch()
export class GlobalExceptionFilter
  implements ExceptionFilter
{
  catch(
    exception: any,
    host: ArgumentsHost,
  ) {
    const response =
      host
        .switchToHttp()
        .getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : 500;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    response.status(status).json({
      success: false,
      message,
      statusCode: status,
    });
  }
}

/*
|--------------------------------------------------------------------------
| Request Sanitizer Middleware
|--------------------------------------------------------------------------
*/

@Injectable()
export class RequestSanitizerMiddleware
  implements NestMiddleware
{
  use(
    req: Request,
    _res: Response,
    next: NextFunction,
  ) {
    if (
      req.body &&
      typeof req.body === 'object'
    ) {
      Object.keys(req.body).forEach(
        (key) => {
          if (
            typeof req.body[key] ===
            'string'
          ) {
            req.body[key] =
              req.body[key].trim();
          }
        },
      );
    }

    next();
  }
}