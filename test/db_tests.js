
var asserts = require('assert');
var db = require('../db.js');
var sqlite3 = require('sqlite3');
var TransactionDatabase = require("sqlite3-transactions").TransactionDatabase;
// create test.db if it doesn't exist

describe('Db module', () => {    
    var conn = new TransactionDatabase(
        new sqlite3.Database("slackcloneTest.db",
            sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE
        )    
    );
    after(() => {
        conn.close();
    });
    
    // configure conn    
    it('given team name, return all channel names of that team', () => {
        conn.beginTransaction(function(err, conn) {
            try {
                var username = 'abu';
                var expected = '{"USERID":"abu","NAME":"Abu Muinuddin","PASSWORD":"abupassword","EMAIL":"abu@yahoo.com","PHONE":"703-854-6753"}';
                var actual = "";

                var p = db.getUsersJSON(conn, 'abu');
                p.then(
                    (val) => {
                        actual= val;
                        console.log(val);
                    },
                    (err) => {
                        console.log('Printing ERROR :..... ', err);
                    }
                );

                assert(actual, expected);
            } finally {
                conn.rollback();
            }
        });
    });
});