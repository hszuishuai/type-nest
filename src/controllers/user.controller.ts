import { Controller, Get, Param, Query } from "@nestjs/common";
import { User } from "../interfaces/user";
import { UserService } from "../services";
import { Log, Method, LoginConfig } from "../decorators/log";

import RedisClient from "../redis/redis";

import fsUtil from "../utils/fsUtil";

const Redis = new RedisClient();
@Controller("user")

@Log
class UserController {
    constructor(private readonly userService: UserService) { }
    @LoginConfig("wx")
    wxConfig;

    @Get("getUser")
    async  findUser() {
        // Redis.set("name", "11111");
        // tslint:disable-next-line:no-console
        console.log("start");
        await fsUtil.writeFile("22", "./test.text");
        const res = await fsUtil.readFile("./src/config/rsa_private_key.pem");
        console.log("end", res.toString());
        return this.userService.setUser({ username: "22", password: "2" });
    }

    @Get("params")
    findAll(@Query() id): any {
        // tslint:disable-next-line:no-console
        console.log(id, this.wxConfig);
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
