import config from 'config';
import fastifyPassport from '@fastify/passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import { JwtPayload } from './interfaces';
import User from '~/db/models/User';

const jwtConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.get<string>('jwt.secret'),
};

const jwtRefreshConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.get<string>('jwt.refreshToken.secret'),
};

const jwtTempConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.get<string>('jwt.tempToken.secret'),
};

export const setupPassport = () => {
  fastifyPassport.use('jwt', new JwtStrategy(jwtConfig, async (jwtPayload: JwtPayload, done: Function): Promise<void> => {
    try {
      const user = await User.findByPk(jwtPayload.id, { raw: true });

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    }
    catch (error) {
      done(error);
    }
  }));

  fastifyPassport.use('jwt-refresh-token', new JwtStrategy(jwtRefreshConfig, async (jwtPayload: JwtPayload, done: Function): Promise<void> => {
    try {
      const user = await User.findByPk(jwtPayload.id, { raw: true });

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    }
    catch (error) {
      done(error);
    }
  }));

  fastifyPassport.use('jwt-temp-token', new JwtStrategy(jwtTempConfig, async (jwtPayload: JwtPayload, done: Function): Promise<void> => {
    try {
      const user = await User.findByPk(jwtPayload.id, { raw: true });

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    }
    catch (error) {
      done(error);
    }
  }));
};
