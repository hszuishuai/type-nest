import * as fs from "fs";
import { Logger } from "@nestjs/common";

class FileHandler {
    static async writeFile(data, path) {
        await fs.writeFile(path, data, (err: NodeJS.ErrnoException) => {
            if (err) {
                return err;
            }
        });
    }

    static async readFile(path: string, options = { encoding: "utf-8" }) {
        return new Promise((resolve, reject) => {
            fs.readFile(path, options, (err: NodeJS.ErrnoException, res: Buffer) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            });
        });
    }
    // static async writeStream(path: string) {
    //     try {
    //         const stream: fs.ReadStream = await fs.createReadStream(path);
    //         return new Promise((resolve, reject) => {
    //             stream.on("end", () => {
    //                 resolve();
    //             });
    //         });

    //     } catch (e) {
    //         Logger.error("传输失败", e);
    //     }
    // }
}

export default FileHandler;
