import { JwtPayload as JwtPayloadExternal } from 'jsonwebtoken';
import { User } from '@frb/shared';

export interface JwtPayload extends JwtPayloadExternal {
  id: number;
  uuid: string;
  sessionId: string;
}

export interface UserWithSessionId extends User {
  sessionId: string;
}
