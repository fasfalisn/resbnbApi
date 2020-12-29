const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');

class UserModel {
    tableName = 'user';

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

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    create = async ({ name, email}) => {
        const sql = `INSERT INTO ${this.tableName}
        (name, email) VALUES (?,?)`;

        const result = await query(sql, [name, email]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }


}

module.exports = new UserModel;