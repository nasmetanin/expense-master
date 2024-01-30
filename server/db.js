const fs = require('fs');

const response = (status, data, message) => {
    return {
        success: status,
        data: data,
        message: message || ''
    }
}

const readDB = () => {
    try {
        const db = fs.readFileSync(__dirname + '/db/data.json');
        return response(true, JSON.parse(db));
    } catch (err) {
        console.log(err);
        return response(false, null, 'Failed to read database');
    }
}

const writeDB = (db) => {
    try {
        fs.writeFileSync(__dirname + '/db/data.json', JSON.stringify(db));
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    readDB,
    writeDB,
    response
}

