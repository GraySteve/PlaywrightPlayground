export interface User {
  userName: string;
  password: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export class UserBuilder {
  private user: User;

  constructor() {
    this.user = {
      userName: 'standard_user',
      password: 'secret_sauce',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
    };
  }

  withUserName(userName: string): UserBuilder {
    this.user.userName = userName;
    return this;
  }

  withPassword(password: string): UserBuilder {
    this.user.password = password;
    return this;
  }

  withFirstName(firstName: string): UserBuilder {
    this.user.firstName = firstName;
    return this;
  }

  locked(): UserBuilder {
    this.user.userName = 'locked_out_user';
    return this;
  }

  build(): User {
    return { ...this.user };
  }
}