import JWT = require("jsonwebtoken");
import fs = require("fs");
import Path = require("path");

interface IResult {
    exp: number;
    data: object | string;
}
// 解密
function verifyToken(token) {
    const cert = fs.readFileSync(Path.join(__dirname, "../../src/config/rsa_public_key.pem"));

    // tslint:disable-next-line:no-console
    let res: object;
    try {
        const result: any = JWT.verify(token, cert, { algorithms: ["RS256"], ignoreExpiration: true }) || {};
        const { exp } = result;
        const current = Math.floor(Date.now() / 1000);
        current <= exp ? res = result.data : res = {};
        // res = result.data;

    } catch (e) {
        // tslint:disable-next-line:no-console
        console.log(e);
        return e;
    }
    return res;
}
// 加密

function createToken(data, expires = 7200) {
    const exp = Math.floor(Date.now() / 1000) + expires;
    const cert = fs.readFileSync(Path.join(__dirname, "../../src/config/rsa_private_key.pem"));
    const token = JWT.sign({ data, exp }, cert, { algorithm: "RS256" });
    return token;
}

export {
    createToken,
    verifyToken,
};
