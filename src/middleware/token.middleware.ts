import { Injectable, NestMiddleware, Header } from "@nestjs/common";
import { Request, Response } from "express";

import { createToken, verifyToken } from "../utils/Jwt";

import RedisClient from "../redis/redis";
import { async } from "rxjs/internal/scheduler/async";
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
    async  use(req: Request, res: Response, next: any) {
        const token: string | string[] = req.headers["x-authorization"];
        if (!token) {
            return res.json({
                code: 0,
                info: "登录失效",
            });
        }
        // 解析token
        // const token = createToken(User, 60 * 5);
        // const REFRESH_TOKEN = createToken(User, 60 * 10);
        console.log("token", token);
        const userInfo: User = verifyToken(token);
        console.log(userInfo);

        // 设置hash-key的过期时间
        // await Redis.setHmp("token", {
        //     "refresh_token": REFRESH_TOKEN,
        //     "subNumber": "123456",
        // }, 12000);

        /**
         * 判断token 是否过期
         * 检验refresh_token是否过期
         */
        if (Object.keys(userInfo).length === 0) {
            // token 过期  获取refresh_token 重新获取行的token 和 refresh_token
            Redis.getHkey("token", "refresh_token").then(async (result) => {
                console.log("res", result);
                if (result) {
                    const newToken: string = createToken(User, 60 * 5);
                    const REFRESH_TOKEN: string = await createToken(User, 60 * 10);
                    await Redis.setHmp(`token:${userInfo.id}`, {
                        refresh_token: REFRESH_TOKEN,
                        subNumber: "123456",
                    }, 12000);
                    return res.json({
                        token: newToken,
                        code: "再次获取到的token",
                        refresh_token: REFRESH_TOKEN,
                    });
                } else {
                    return res.json({
                        code: 0,
                        info: "token过期",
                    });
                }
            });
        } else {
            // token 验证正确且没有过期
            next();
        }
    }
}

export default TokenMiddleware;
