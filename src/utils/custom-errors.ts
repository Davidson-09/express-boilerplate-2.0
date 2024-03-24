abstract class CustomException extends Error {
  constructor(public message: string, public code: number) {
    // sometimes i also add the stack trace, but only in dev
    super(message)
    this.message = message;
    this.code = code;
  }
}

export class BadRequestException extends CustomException {
  constructor(message: string) {
    super(message, 400)
  }
}

// other error formats