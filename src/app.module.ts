import { Module, MiddlewareConsumer, NestModule, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./modules";
import { TokenMiddleware } from "./middleware";
import { UserController } from "./controllers";

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).exclude(
      { path: "user/login", method: RequestMethod.GET},
    ).forRoutes(UserController);
  }
}
