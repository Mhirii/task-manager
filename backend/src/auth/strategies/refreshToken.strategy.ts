import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { jwtPayload } from "./accessToken.strategy";


export type JwtPayloadWithRt = jwtPayload & { refreshToken: string };


@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'refreshTokenSecret',
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: JwtPayloadWithRt) {
    const refreshToken = req
      ?.get('authorisation')
      ?.replace('Bearer', '')
      ?.trim();
    return {
      ...payload,
      refreshToken,
    };
  }
}
