import { Controller, Get, Param, Query } from "@nestjs/common";
import { User } from "../interfaces/user";
import { UserService } from "../services";
import { Log, Method} from "../decorators/log";

import RedisClient from "../redis/redis";

const Redis = new RedisClient();
@Controller("user")

@Log
class UserController {
    constructor(private readonly userService: UserService) { }

    @Get("getUser")
    findUser(): User {
        Redis.set("name", "11111");
        // tslint:disable-next-line:no-console
        console.log(Redis.get("name"));
        return this.userService.setUser({ username: "22", password: "2" });
    }

    @Get("params")
    findAll(@Query() id): any {
        // tslint:disable-next-line:no-console
        console.log(id);
        return `ids ${id}`;
    }
    @Method
    @Get("login")
    login(): any {
        console.log("login");
        return "login";
    }
}

export default UserController;
