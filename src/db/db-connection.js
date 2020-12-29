const dotenv = require('dotenv');
dotenv.config();
const mysql2 = require('mysql2');

// const db = mysql2.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'resbnb_db'
// })

// db.connect((err)=>{
//     if(err){
//         throw err;
//     }
//     console.log('Connected');
// });

class DBConnection {
    constructor() {
        this.db = mysql2.createPool({
            // host: "eu-cdbr-west-03.cleardb.net",
            // user: "be46e85583b1dd",
            // password: "c4306dc5",
            // database: "heroku_f7f2b5ee759b774",
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_DATABASE
        });

        this.checkConnection();
    }

    checkConnection() {
        this.db.getConnection((err, connection) => {
            if (err) {
                if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed.');
                }
                if (err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.');
                }
                if (err.code === 'ECONNREFUSED') {
                    console.error('Database connection was refused.');
                }
            }
            if (connection) {
                console.log('connected');
                connection.release();
            }
            return
        });
    }

    query = async (sql, values) => {
        return new Promise((resolve, reject) => {
            const callback = (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve(result);
            }
            // execute will internally call prepare and query
            this.db.execute(sql, values, callback);
        }).catch(err => {
            const mysqlErrorList = Object.keys(HttpStatusCodes);
            // convert mysql errors which in the mysqlErrorList list to http status code
            err.status = mysqlErrorList.includes(err.code) ? HttpStatusCodes[err.code] : err.status;

            throw err;
        });
    }
}

const HttpStatusCodes = Object.freeze({
    ER_TRUNCATED_WRONG_VALUE_FOR_FIELD: 422,
    ER_DUP_ENTRY: 409
});

module.exports = new DBConnection().query;