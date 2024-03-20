import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

import { BadRequestException } from "../exceptions/bad-request.exception";

export function queryValidator<T>(Model: new () => T) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const validator = new Model() as Record<string, unknown>;
    Object.assign(validator, req.query);

    validate(validator, { whitelist: true, forbidNonWhitelisted: true }).then(
      (errs) => {
        if (errs.length > 0) {
          next(new BadRequestException(errs));
        } else next();
      }
    );
  };
}
