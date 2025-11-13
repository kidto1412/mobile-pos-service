import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class GlobalResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;

        const messageMap: Record<number, string> = {
          200: 'Success',
          201: 'Created',
          400: 'Bad Request',
          404: 'Data Not Found',
          500: 'Internal Server Error',
        };

        const message = messageMap[statusCode] ?? 'Success';

        return {
          success: statusCode < 400,
          statusCode,
          message,
          data: data?.data ?? data,
        };
      }),
    );
  }
}
