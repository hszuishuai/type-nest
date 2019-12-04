import { Controller, Get, Param, Query } from "@nestjs/common";
import { User } from "../interfaces/user";
import { UserService } from "../services";

@Controller("user")

class UserController {
    constructor(private readonly userService: UserService) { }

    @Get("getUser")
    findUser(): User {
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
