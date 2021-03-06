import { Module } from "@nestjs/common";
import AuthService from "../services/auth.service";
import { UserModule } from "./";

@Module({
  imports: [UserModule],
  providers: [AuthService],
})
export class AuthModule {}
