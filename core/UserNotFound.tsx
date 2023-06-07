export class UserNotFound extends Error {
  constructor() {
    super("Request failed with status code 404 Not Found");

    Object.setPrototypeOf(this, UserNotFound.prototype);
  }
}
