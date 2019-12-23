import { Injectable, NestMiddleware, Header } from "@nestjs/common";
import { Request, Response } from "express";

import { createToken, verifyToken } from "../utils/Jwt";

import RedisClient from "../redis/redis";
const Redis = new RedisClient();

interface User {
    id: number;
    isVip: boolean;
}
const User: User = {
    id: 22,
    isVip: true,
};

@Injectable()

class TokenMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: any) {
        // const token = req.headers["x-AuthToken"];
        // if (!token) {
        //     return res.json({
        //         code: 0,
        //         info: "登录失效",
        //     });
        // }
        // 解析token
        const token = createToken(User);
        const REFRESH_TOKEN = createToken(User, 60);
        // tslint:disable-next-line:no-console
        console.log(token);
        const userInfo: User = verifyToken(token);

        // 设置hash-key的过期时间
        Redis.set("hash-key", "token", 60);
        Redis.setHmp("token", {
            refresh_token: REFRESH_TOKEN,
            subNumber: "123456",
        }, 60);
        // let data;
        // Redis.getHkey("token", "refresh_token").then((res) => {
        //     data = res;
        // });
        // tslint:disable-next-line:no-console
        // console.log(data);
        // tslint:disable-next-line:no-console
        console.log(`ACCESS_TOKEN:${token}:${userInfo.id}`);
        if (req.headers["X-Authorization"] === "22") {
            return res.json("失败");
        } else {
            // console.log(req.header);
            next();
        }
    }

    // 验证用户token
}

export default TokenMiddleware;
