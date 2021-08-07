import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JWTStrategy } from './jwt/jwt.strategy';
import { GoogleStrategy } from './google/google.strategy';

@Module({
  imports: [UserModule, PassportModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '10h'}
  })],
  providers: [AuthService, LocalStrategy, JWTStrategy, GoogleStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
