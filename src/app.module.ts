import { Module, MiddlewareConsumer, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./modules";
import { TokenMiddleware } from "./middleware";
import { UserController } from "./controllers";
import { AuthModule } from "./modules/auth.module";
import { EventModule } from "./events/events.module";

@Module({
  imports: [UserModule, AuthModule, EventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(TokenMiddleware).exclude(
    //   { path: "user/login", method: RequestMethod.GET},
    // ).forRoutes(UserController);
  }
}
