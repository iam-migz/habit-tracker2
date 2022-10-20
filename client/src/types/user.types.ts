export type User = {
  _id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type RegisterDto = Pick<User, 'name' | 'email' | 'password'>;
export type LoginDto = Omit<RegisterDto, 'name'>;

export type UserResponse = Pick<User, 'name' | 'email'> & {
  token: string;
};
