// extend express capabilites

export interface Auth {
  userId: string;
}

declare global {
  namespace Express {
    interface Request {
      user: Auth
    }
  }
}