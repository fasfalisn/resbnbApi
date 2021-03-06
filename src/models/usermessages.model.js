const query = require("../db/db-connection");
const { multipleColumnSet } = require("../utils/common.utils");
const { multipleColumnSetOr } = require("../utils/common-or.utils");
const { multipleColumnSetAnd } = require("../utils/common-and.utils");

class UserMessageModel {
  tableName = "user_messages";

  find = async (params = {}) => {
    let sql = `SELECT * FROM ${this.tableName}`;

    if (!Object.keys(params).length) {
      return await query(sql);
    }

    const { columnSet, values } = multipleColumnSet(params);
    sql += ` WHERE ${columnSet}`;

    return await query(sql, [...values]);
  };

  findOne = async (params) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

    const result = await query(sql, [...values]);

    // return back the first row (user)
    return result[0];
  };

  findOnesMessages = async (params) => {
    const { columnSet, values } = multipleColumnSetOr(params);

    // const sql = `SELECT UserID,Name FROM ${this.tableName}
    // JOIN user ON user.UserID = user_messages.To_UserID
    // WHERE ${columnSet}
    // union
    // SELECT UserID,Name FROM ${this.tableName}
    // JOIN user ON user.UserID = user_messages.From_UserID
    // WHERE ${columnSet}`;

    const sql = `SELECT ContactID, From_UserID, To_UserID, Text, Date, Name
    FROM ${this.tableName} JOIN user on ( case 
                                        when user_messages.From_UserID = ${values[0]}
                                            then user_messages.To_UserID = user.UserID
                                        when user_messages.From_UserID != ${values[0]}
                                            then user_messages.From_UserID = user.UserID
                                      end)
    WHERE ContactID IN (SELECT max(ContactID)
                        FROM ${this.tableName}
                        WHERE From_UserID = ${values[0]} or To_UserID = ${values[0]}
                        GROUP BY greatest(From_UserID,To_UserID), least(From_UserID,To_UserID)) 
                        ORDER BY date DESC`;

    // const sql = `SELECT t1.* FROM ${this.tableName} AS t1
    //     JOIN (SELECT
    //             LEAST(From_UserID, To_UserID) AS From_UserID,
    //             GREATEST(From_UserID, To_UserID) AS To_UserID,
    //             MAX(ContactID) AS max_id
    //           FROM ${this.tableName}
    //           GROUP BY
    //             LEAST(From_UserID, To_UserID),
    //             GREATEST(From_UserID, To_UserID)
    //          ) AS t2
    //     ON LEAST(t1.From_UserID, t1.To_UserID) = t2.From_UserID AND
    //        GREATEST(t1.From_UserID, t1.To_UserID) = t2.To_UserID AND
    //        t1.ContactID = t2.max_id
    //     WHERE t1.From_UserID = ${values[0]} OR t1.To_UserID = ${values[1]}`;

    const val = values.concat(values);
    // sql += ` GROUP BY to_userid`;

    const result = await query(sql, [...val]);

    // return back the first row (user)
    return result;
  };

  findOnesMessagesWithOne = async (params) => {
    const { columnSet, values } = multipleColumnSetAnd(params);

    // const sql = `SELECT * FROM ${this.tableName}
    //     WHERE ${columnSet} 
    //     ORDER BY date`;
    // sql += ` GROUP BY to_userid`;

    const sql = `SELECT * FROM ${this.tableName}
        WHERE (from_userid = ${values[0]} and to_userid = ${values[1]}) or
         (from_userid = ${values[1]} and to_userid = ${values[0]})
        ORDER BY date`;

    // const result = await query(sql, [...values]);
    const result = await query(sql);



    // return back the first row (user)
    return result;
  };

  create = async ({ from_userid,to_userid, text,date }) => {
    const sql = `INSERT INTO ${this.tableName}
    (from_userid,to_userid, text,date) VALUES (?,?,?,?)`;

    const result = await query(sql, [from_userid,to_userid, text,date]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };


}

module.exports = new UserMessageModel();
