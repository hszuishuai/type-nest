
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
        const data = await this.Client.hget(hkey, key);
        return data;
    }
    async setHmp(hkey: string, data: object, express?: number) {
        this.Client.hmset(hkey, data);
        this.Client.expire(hkey, express);
    }
    async clearHkey(hkey: string) {
        return await this.Client.hdel(hkey);
    }

}

export default RedisStore;
