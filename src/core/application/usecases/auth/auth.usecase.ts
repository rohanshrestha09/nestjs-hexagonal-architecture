import {
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Otp } from 'src/core/domain/otp/otp.domain';
import { User } from 'src/core/domain/user/user.domain';
import { AuthUseCase } from 'src/core/ports/in/auth/auth-usecase.port';
import {
  LoginWithEmailDto,
  LoginWithPhoneDto,
  RegisterWithEmailDto,
  RegisterWithPhoneDto,
  ResetPasswordWithEmailDto,
  ResetPasswordWithPhoneDto,
  VerifyEmailUserDto,
  VerifyPhoneUserDto,
} from 'src/core/ports/in/auth/auth-usecase.types';
import { UserCourseUseCase } from 'src/core/ports/in/course/user-course-usecase.port';
import { OtpUseCase } from 'src/core/ports/in/otp/otp-usecase.port';
import { RoleUseCase } from 'src/core/ports/in/role/role-usecase.port';
import { UserUseCase } from 'src/core/ports/in/user/user-usecase.port';
import { ROLE } from 'src/common/enums/role.enum';

@Injectable()
export class AuthUseCaseImpl implements AuthUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userUseCase: UserUseCase,
    private readonly roleUseCase: RoleUseCase,
    private readonly otpUseCase: OtpUseCase,
    private readonly userCourseUseCase: UserCourseUseCase,
  ) {}

  async loginWithEmail({ email, password }: LoginWithEmailDto) {
    const user = await this.userUseCase.getUserByEmail(email);

    if (!user) throw new UnauthorizedException('Unauthorized');

    const userPassword = await this.userUseCase.getUserPassword(user.id);

    const isMatched = await bcrypt.compare(password, userPassword);

    if (!isMatched) throw new UnauthorizedException();

    const payload = { sub: user.id };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async registerWithEmail({ name, email, password }: RegisterWithEmailDto) {
    const userExists = await this.userUseCase.userExistsByEmail(email);

    if (userExists)
      throw new ForbiddenException(
        'User already exists. Choose a different email',
      );

    const salt = await bcrypt.genSalt(10);

    const encryptedPassword = await bcrypt.hash(password, salt);

    const role = await this.roleUseCase.getRoleByName(ROLE.USER);

    const user = await this.userUseCase.createUser(
      User.create({
        name,
        email,
        password: encryptedPassword,
        roleId: role.id,
      }),
    );

    await this.otpUseCase.sendOtpToEmail(Otp.create({ user, code: '111111' }));
  }

  async loginWithPhone({ phone, password }: LoginWithPhoneDto) {
    const user = await this.userUseCase.getUserByPhone(phone);

    if (!user) throw new UnauthorizedException('Unauthorized');

    const userPassword = await this.userUseCase.getUserPassword(user.id);

    const isMatched = await bcrypt.compare(password, userPassword);

    if (!isMatched) throw new UnauthorizedException();

    const payload = { sub: user.id };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async registerWithPhone({ name, phone, password }: RegisterWithPhoneDto) {
    const userExists = await this.userUseCase.userExistsByPhone(phone);

    if (userExists)
      throw new ForbiddenException(
        'User already exists. Choose a different email',
      );

    const salt = await bcrypt.genSalt(10);

    const encryptedPassword = await bcrypt.hash(password, salt);

    const role = await this.roleUseCase.getRoleByName(ROLE.USER);

    const user = await this.userUseCase.createUser(
      User.create({
        name,
        phone,
        password: encryptedPassword,
        roleId: role.id,
      }),
    );

    await this.otpUseCase.sendOtpToPhone(Otp.create({ user, code: '111111' }));
  }

  async verifyEmailUser({ code, email }: VerifyEmailUserDto) {
    const user = await this.userUseCase.getUserByEmail(email);

    const isVerified = await this.otpUseCase.verifyOtp(code, user);

    if (!isVerified) throw new UnauthorizedException();

    const payload = { sub: user.id };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async verifyPhoneUser({ code, phone }: VerifyPhoneUserDto) {
    const user = await this.userUseCase.getUserByPhone(phone);

    const isVerified = await this.otpUseCase.verifyOtp(code, user);

    if (!isVerified) throw new UnauthorizedException();

    const payload = { sub: user.id };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async forgetEmailPassword(email: string) {
    const user = await this.userUseCase.getUserByEmail(email);

    await this.otpUseCase.sendOtpToEmail(Otp.create({ user, code: '111111' }));
  }

  async forgetPhonePassword(phone: string) {
    const user = await this.userUseCase.getUserByPhone(phone);

    await this.otpUseCase.sendOtpToPhone(Otp.create({ user, code: '111111' }));
  }

  async resetPhonePassword({
    phone,
    password,
    code,
  }: ResetPasswordWithPhoneDto) {
    const user = await this.userUseCase.getUserByPhone(phone);

    const isVerified = await this.otpUseCase.verifyOtp(code, user);

    if (!isVerified) throw new UnauthorizedException();

    const salt = await bcrypt.genSalt(10);

    const encryptedPassword = await bcrypt.hash(password, salt);

    await this.userUseCase.changeUserPassword(user.id, encryptedPassword);
  }

  async resetEmailPassword({
    email,
    password,
    code,
  }: ResetPasswordWithEmailDto) {
    const user = await this.userUseCase.getUserByEmail(email);

    const isVerified = await this.otpUseCase.verifyOtp(code, user);

    if (!isVerified) throw new UnauthorizedException();

    const salt = await bcrypt.genSalt(10);

    const encryptedPassword = await bcrypt.hash(password, salt);

    await this.userUseCase.changeUserPassword(user.id, encryptedPassword);
  }

  async getProfile(user: User) {
    const enrolledCoursesCount =
      await this.userCourseUseCase.getEnrolledCoursesCount(user);

    return {
      data: user,
      isEnrolled: enrolledCoursesCount > 0,
      enrolledCoursesCount,
    };
  }
}
