const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');

class RatingsModel {
    tableName = 'user_rates_house';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    // need to check if date should be passed as a parameter in the function below.
    create = async ({ userid,houseid,description, rating, date}) => {
        const sql = `INSERT INTO ${this.tableName}
        ( userid, houseid, description, rating, date) VALUES (?,?,?,?,?)`;

        const result = await query(sql, [userid,houseid,description, rating, date]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new RatingsModel;