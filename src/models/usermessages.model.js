const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');
const { multipleColumnSetOr } = require('../utils/common-or.utils');
const { multipleColumnSetAnd } = require('../utils/common-and.utils');


class UserMessageModel {
    tableName = 'user_messages';

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

    findOnesMessages = async (params) => {
        const { columnSet, values } = multipleColumnSetOr(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;
        // sql += ` GROUP BY to_userid`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result;
    }

    findOnesMessagesWithOne = async (params) => {
        const { columnSet, values } = multipleColumnSetAnd(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;
        // sql += ` GROUP BY to_userid`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result;
    }
    
}

module.exports = new UserMessageModel;