const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');

class HouseModel {
    tableName = 'house_has_offers';
    wh = 'valid';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName} WHERE status = ?`;

        if (!Object.keys(params).length) {
            return await query(sql, [this.wh]);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }


}



module.exports = new HouseModel;