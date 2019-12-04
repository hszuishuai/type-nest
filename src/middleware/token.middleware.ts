import { Injectable, NestMiddleware, Header } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()

class TokenMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: any) {
        // tslint:disable-next-line:no-console

        if (req.headers["x-tokem"] === "22") {
            return res.json("失败");
        } else {
            // console.log(req.header);
            next();
        }
    }
}

export default TokenMiddleware;
