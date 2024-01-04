import { LoginDto } from '../../application/dto/login-auth.dto';
import { RegisterDto } from '../../application/dto/register-auth.dto';

export abstract class AuthUseCasePort {
  abstract login(data: LoginDto): Promise<{ token: string }>;
  abstract register(data: RegisterDto): Promise<{ token: string }>;
}
