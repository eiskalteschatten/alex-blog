import { UserWithSessionId } from './auth/interfaces';

declare module 'fastify' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface PassportUser extends UserWithSessionId {}
}
