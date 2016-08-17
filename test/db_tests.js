
//var asserts = require('assert');
var chai = require("chai");
var db = require('../db.js');
var sqlite3 = require('sqlite3');
var TransactionDatabase = require("sqlite3-transactions").TransactionDatabase;
// create test.db if it doesn't exist

describe('Db module', () => {
    var conn = new TransactionDatabase(
        new sqlite3.Database("../slackcloneTest.db",
            sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE
        )    
    );
    after(() => {
        conn.close();
    });
    
    // First Test   
    it('given team name, return all channel names of that team', (done) => {
        conn.beginTransaction(function(err, conn) {
            try {
                var username = 'abu';
                var expected = '[{"USERID":"abu","NAME":"Abu Muinuddin","PASSWORD":"abupassword","EMAIL":"abu@yahoo.com","PHONE":"703-854-6753"}]';
                var actual = "";

                var p = db.getUsersJSON(conn, 'abu');
                
                p.then(
                    (val) => {
                        actual= val;
                        console.log("actual......." + actual);
                        console.log("expected....." + expected);
                        assert(actual, expected);

                        done();
                    },
                    (err) => {
                        console.log('Printing ERROR :..... ', err);

                    }

                );


            } finally {
                conn.rollback();
            }
        });
    });

    
});

/*
// TestUserHandler - test all the user functions
var sqlite3 = require('sqlite3');
var expect = require('expect.js');
var assert = require('assert');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");


chai.use(chaiAsPromised);
chai.should();


var userHandler = require("../userhandler.js");
var db = new sqlite3.Database('testslackclone.db');


describe('Test userHandler', () => {
    beforeEach(() => {
        db.exec('BEGIN');
    });
    afterEach(() => {
        db.exec('ROLLBACK');
    });
    it('#1 getUserProfileJSON', (done) => {
        var userId = 1;
        var user = { id: userId, name: "shuvo", password: "QWEWRER", email: "BLASHS@GMAIL.COM" };
        var expected = JSON.stringify(user);
        userHandler.getUserProfileJSON(db, userId).should.eventually.equal(expected).notify(done);
    });


   it('#2 createUserProfile', (done) => {
        var user = { name: "Paul Frey", password: "superman", email: "paulgfrey@gmail.com" };
        var expected = JSON.stringify(user);
        userHandler.createUserProfile(db, user.name, user.password, user.email)
            .then(
            () => {
                return getUserFromDb(user.id);
            })
            .should.eventually.equal(expected).notify(done);
    });
});


function getUserFromDb(userId) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM USERS "
            + "  WHERE ID = '" + userId + "'";
        var user;
        db.each(query,
            function (err, row) {
                if (err) {
                    throw err;
                }
                user = { id: ID, name: row.NAME, password: row.PASSWORD, email: row.EMAIL };
            },
            function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(JSON.stringify(user));
                }
            });
    });
}
*/