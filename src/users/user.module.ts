import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { UserMiddleware } from "src/middleware/user.middleware";

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserService]
})

export class UserModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserMiddleware)
            .forRoutes(UserController);
    }
}