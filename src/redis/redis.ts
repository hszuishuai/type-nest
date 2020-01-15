
import * as Redis from "redis";
// 连接redis
// const client =

class RedisStore {
    constructor() {
        this.Client = Redis.createClient({ password: "123456" });
    }
    public Client;

    async get(key) {
        const data: string = await this.Client.get(key);
        return data;
    }
    async set(key, value, max?: number) {
        max ? this.Client.set(key, value) : this.Client.set(key, value, "Ex", max / 1000);

    }
    async clear(key) {
        return await this.Client.del(key);
    }
    async getHkey(hKey: string, key: string) {
        return new Promise((resolve, reject) => {
            this.Client.hget(hKey, key, (err, value) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(value);
                }
            });
        });

        // tslint:disable-next-line:no-consol
    }
    async setHmp(hKey: string, data: object, express?: number) {
        await this.Client.hmset(hKey, data, Redis.print);

        // console.log(aa);
        await this.Client.expire(hKey, express);
    }
    async clearHkey(hKey: string) {
        return await this.Client.hdel(hKey);
    }
}

// 封装成一个Promise

export default RedisStore;
