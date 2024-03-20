export class HttpException<T = unknown> extends Error {
  status: number;
  body?: T;

  constructor(message: string, status: number, body?: T) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.body = body;
  }
}
