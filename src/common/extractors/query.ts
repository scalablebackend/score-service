/* eslint-disable @typescript-eslint/ban-types */
import { Request } from "express";

export function query<T extends {}>(req: Request, key: keyof T) {
  return (req.query as T)[key];
}
