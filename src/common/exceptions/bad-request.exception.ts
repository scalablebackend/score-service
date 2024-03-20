import { HttpException } from './http.exception';

export class BadRequestException<T = unknown> extends HttpException<T> {
  constructor(body?: T) {
    super('BadRequestException', 400, body);
  }
}
