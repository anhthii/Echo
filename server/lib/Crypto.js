const crypto = require('crypto');


module.exports = {

    getHash256: function(a){
        return crypto.createHash('sha256').update(a).digest('hex');
    },
    getHmac512: function(str, key){
        let hmac = crypto.createHmac("sha512", key);
        return hmac.update(Buffer.from(str, 'utf8')).digest("hex");
    }
}

