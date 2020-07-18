import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthRepository } from '../auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { IJwtPayload } from '../interfaces/payload.interface';
import { Status } from '../../common/status.enum';
import { UnauthorizedException, Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'VOS_SABES_QUE_FREDO_ES_GAY',
    });
  }

  async validate(payload: IJwtPayload) {
    const { username } = payload;

    const user = await this._authRepository.findOne({
      where: { username, status: Status.ACTIVE },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
