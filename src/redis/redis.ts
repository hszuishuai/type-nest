
import Redis = require("redis");

// 连接redis
const client = Redis.createClient({ password: "123456" });

export default client;
