const query = require('../db/db-connection');
const { multipleColumnSet } = require('../utils/common.utils');

class ReservationModel {
    tableName = 'reservation';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findWithHouse = async (params = {}) => {
        const { columnSet, values } = multipleColumnSet(params)
        let sql = `SELECT * FROM ${this.tableName} 
        JOIN house ON house.houseid = reservation.houseid 
        WHERE ${columnSet}`;

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

        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE resid = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    create = async ({ userid, houseid, paymentstatus, status, numguests, bill, date}) => {
        const sql = `INSERT INTO ${this.tableName}
        ( userid, houseid, paymentstatus, status, numguests, bill, date) VALUES (?,?,?,?,?,?,?)`;

        const result = await query(sql, [ userid, houseid, paymentstatus, status, numguests, bill, date]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new ReservationModel;