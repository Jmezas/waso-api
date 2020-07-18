import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcryptjs';
import { IJwtPayload } from './interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
    private readonly _jwtService: JwtService,
  ) {}

  /**
   * Permite el logueo en el sistema.
   * @param loginDto Objeto con las credenciales para el logueo
   */
  async login(loginDto: LoginDto): Promise<{ token: String }> {
    const { username, password } = loginDto;

    const user = await this._authRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: IJwtPayload = {
      id: user.id,
      email: user.username,
      username: user.username,
      role: user.role,
    };

    const token = await this._jwtService.sign(payload);

    return { token };
  }
}
