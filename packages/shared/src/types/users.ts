export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export type SerializedUser = Omit<User, 'password' | 'createdAt' | 'updatedAt'>;
export type UserRegistration = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserLoginReply {
  user: SerializedUser;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshAccessTokenReply {
  accessToken: string;
}
