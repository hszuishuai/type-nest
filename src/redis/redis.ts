
import Redis = require("redis");

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
    async getHkey(hkey: string, key: string) {
        return new Promise((resolve, reject) => {
            this.Client.hget(hkey, key, (err, value) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(value);
                }
            });
        });

        // tslint:disable-next-line:no-consol
    }
    async setHmp(hkey: string, data: object, express?: number) {
        await this.Client.hmset(hkey, data, Redis.print);
        await this.Client.expire(hkey, express);
    }
    async clearHkey(hkey: string) {
        return await this.Client.hdel(hkey);
    }
}

// 封装成一个Promise

export default RedisStore;
