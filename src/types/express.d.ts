import * as express from "express";

declare global {
  namespace Express {
    interface User {
      id: string;
      role?: string;
      teamId?: string;
    }

    interface Request {
      user?: User;
    }
  }
}
