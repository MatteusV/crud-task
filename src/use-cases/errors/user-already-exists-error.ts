export class UserAlreadyExistsError extends Error {
  constructor() {
    super('Name already exists')
  }
}
