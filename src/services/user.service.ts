import { Injectable } from "@nestjs/common";
import { User } from "../interfaces/user";

@Injectable()

class UserService {
    private user: User;
    getUser() {
        return this.user;
    }
    setUser(user: User) {
        return this.user = user;
    }
}

export default UserService;
