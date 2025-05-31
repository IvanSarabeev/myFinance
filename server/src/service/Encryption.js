import * as crypto from "node:crypto";

class Encryption {
    hashValue(value) {
        return crypto.createHash('sha256').update(value).digest('hex');
    }

    encrypt(value) {
        if (!value) return null;

        // eslint-disable-next-line no-undef
        return Buffer.from(value).toString("base64");
    }

    decrypt(value) {
        if (!value) return null;

        // eslint-disable-next-line no-undef
        return Buffer.from(value, "base64").toString('utf-8');
    }
}

export default new Encryption;