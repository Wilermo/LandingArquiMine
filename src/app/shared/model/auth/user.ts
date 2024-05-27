export class User {
    public id?: string | null = null;
    public firstName: string | null = '';
    public lastName: string | null = '';
    public email: string  | null = '';
    public username: string = '';
    public password: string = '';
    public role: string = 'ADMIN';

    public companyid : number = 0;

    constructor();
    constructor(firstName: string, lastName: string, email: string, role: string, id?: string, username?: string, password?: string);
    constructor(firstName?: string, lastName?: string, email?: string, role?: string, id?: string, username?: string, password?: string) {
      if (firstName) this.firstName = firstName;
      if (lastName) this.lastName = lastName;
      if (email) this.email = email;
      if (role) this.role = role;
      if (id) this.id = id;
      if (username) this.username = username;
      if (password) this.password = password;
    }
  }
