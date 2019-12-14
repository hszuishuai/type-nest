import { Controller, Get, Param, Query } from "@nestjs/common";
import { User } from "../interfaces/user";
import { UserService } from "../services";

import RedisClient from "../redis/redis";

@Controller("user")

class UserController {
    constructor(private readonly userService: UserService) { }

    @Get("getUser")
    findUser(): User {
        RedisClient.set("name", "11111");
        // tslint:disable-next-line:no-console
        console.log(RedisClient.get("name"));
        return this.userService.setUser({ username: "22", possword: "2" });
    }

    @Get("parms")
    findAll(@Query() id): any {
        // tslint:disable-next-line:no-console
        console.log(id);
        return `ids ${id}`;
    }

}

export default UserController;
