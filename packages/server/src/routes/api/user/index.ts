import { FastifyRequest, FastifyReply, FastifyInstance } from 'fastify';
import { UserUpdate } from '@tfrb/shared';

import User from '~/db/models/User';
import { HttpError } from '~/lib/errors';
import UserService from '~/services/UserService';
import { fastifyPreValidationJwt } from '~/auth/fastify';

export default async (app: FastifyInstance) => {
  type RegistrationRequest = FastifyRequest<{ Body: { registrationData: User } }>;

  app.post('/register', async (req: RegistrationRequest, reply: FastifyReply) => {
    const registrationData = req.body?.registrationData;

    if (!registrationData) {
      throw new HttpError('No registration data was provided!', 400);
    }

    const userService = new UserService();
    const user = await userService.register(registrationData);

    const accessToken = await UserService.generateJwt(user.id);
    const refreshToken = await UserService.generateRefreshToken(user.id);

    reply.send({
      user: userService.serializeUser(),
      accessToken,
      refreshToken,
    });
  });

  type UpdateSelfRequest = FastifyRequest<{ Body: { updateData: UserUpdate } }>;

  app.put('/self', fastifyPreValidationJwt, async (req: UpdateSelfRequest, reply: FastifyReply) => {
    const updateData = req.body?.updateData;
    const { user } = req;

    if (!updateData) {
      throw new HttpError('No update data was provided!', 400);
    }

    const userService = new UserService();
    await userService.update(user.id, updateData);

    reply.send({
      user: userService.serializeUser(),
    });
  });
};
