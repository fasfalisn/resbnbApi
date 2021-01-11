const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');

class HostModel {
    tableName = 'host';

    create = async ({id}) => {
        const sql = `INSERT INTO ${this.tableName}
        (hostid) VALUES (?)`;

        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE hostid = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

}
module.exports = new HostModel;