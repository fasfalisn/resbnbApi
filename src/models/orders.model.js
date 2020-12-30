const query = require('../db/db-connection');
const { multipleColumnSetAnd } = require('../utils/common-and.utils');
const { multipleColumnSet } = require('../utils/common.utils');

class OrderModel {
    tableName = '`order`';

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

    create = async ({ resid, itemid, quantity}) => {
        const sql = `INSERT INTO ${this.tableName}
        (resid, itemid, quantity) VALUES (?,?,?)`;

        const result = await query(sql, [resid, itemid, quantity]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, resid, itemid) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE resid = ? and itemid = ?`;

        const result = await query(sql, [...values, resid, itemid]);

        return result;
    }
}

module.exports = new OrderModel;