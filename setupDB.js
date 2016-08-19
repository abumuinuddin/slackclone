var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');

var filename = 'slackclone.db';
var dbexists = false;
try {
    fs.accessSync(filename);
    dbexists = true;
} catch (ex) {
    dbexists = false;
}

var db = new sqlite3.Database(filename);

exports.getConnection = getConnection;
function getConnection(name) {
    return new sqlite3.Database(name);
}


var dbexists = false;
try {
    fs.accessSync(filename);
    dbexists = true;
} catch (ex) {
    dbexists = false;
}

if (!dbexists) {
    db.serialize(function() {
        var createUserTableSql = "CREATE TABLE IF NOT EXISTS USER " +
                       "(ID             INTEGER         PRIMARY KEY     AUTOINCREMENT NOT NULL," +
                       " USERNAME       CHAR(50)                                      NOT NULL, " +
                       " NAME           CHAR(50)                                      NOT NULL, " +
                       " EMAIL          CHAR(50)                                      NOT NULL, " +
                       " PASSWORD       CHAR(50)                                      NOT NULL)"; 

        var createTeamTableSql = "CREATE TABLE IF NOT EXISTS TEAM " +
                       "(ID             INTEGER         PRIMARY KEY     AUTOINCREMENT NOT NULL," +
                       " TEAMNAME       CHAR(50)                                      NOT NULL)";

        var createChannelTableSql = "CREATE TABLE IF NOT EXISTS CHANNEL " +
                       "(ID             INTEGER         PRIMARY KEY     AUTOINCREMENT NOT NULL," +
                       " CHANNELNAME    CHAR(50)                                      NOT NULL," +
                       " TEAMID         INT                                           NOT NULL," +
                       " DESCRIPTION    TEXT                                )";
                       
        var createMessageTableSql = "CREATE TABLE IF NOT EXISTS MESSAGE " +
                       "(ID             INTEGER         PRIMARY KEY     AUTOINCREMENT NOT NULL," +
                       " MESSAGE        TEXT                                          NOT NULL, " + 
                       " USERID         INT                                           NOT NULL, " + 
                       " CHANNELID      INT                                           NOT NULL, " + 
                       " DATE           TEXT                                          NOT NULL)"; 

        var createTeamMemberTableSql = "CREATE TABLE IF NOT EXISTS TEAMMEMBER " +
                       "(ID             INTEGER         PRIMARY KEY     AUTOINCREMENT NOT NULL," +
                       " USERID         INT                                           NOT NULL," +
                       " TEAMID         INT                                           NOT NULL)"; 

        db.run(createUserTableSql);
        db.run(createTeamTableSql);
        db.run(createChannelTableSql);
        db.run(createMessageTableSql);
        db.run(createTeamMemberTableSql);
        

        // var insertUserSql = "INSERT INTO USER (ID, USERNAME, NAME, EMAIL, PASSWORD) " +
        //     "VALUES (1, 'shuvo',   'Shuvo Ahmed',      'shuvoahmed@hotmail.com', 'shuvopassword')," +
        //            "(2, 'abu',     'Abu Moinuddin',    'abu@myslack.com',        'abupassword')," +
        //            "(3, 'charles', 'Charles Walsek',   'charles@myslack.com',    'charlespassword')," +
        //            "(4, 'beiying', 'Beiying Chen',     'beiying@myslack.com',    'beiyingpassword')," +
        //            "(5, 'swarup',  'Swarup Khatri',    'swarup@myslack.com',     'swarup');"; 

        var insertUserSql = "INSERT INTO USER (USERNAME, NAME, EMAIL, PASSWORD) " +
            "VALUES ('shuvo',   'Shuvo Ahmed',      'shuvoahmed@hotmail.com', 'shuvopassword')," +
                   "('abu',     'Abu Moinuddin',    'abu@myslack.com',        'abupassword')," +
                   "('charles', 'Charles Walsek',   'charles@myslack.com',    'charlespassword')," +
                   "('beiying', 'Beiying Chen',     'beiying@myslack.com',    'beiyingpassword')," +
                   "('swarup',  'Swarup Khatri',    'swarup@myslack.com',     'swarup');"; 

        // var insertTeamSql = "INSERT INTO TEAM (ID, TEAMNAME) " +
        //     "VALUES (1, 'slack')," +
        //            "(2, 'tweeter');"; 

        var insertTeamSql = "INSERT INTO TEAM (TEAMNAME) " +
            "VALUES ('slack')," +
                   "('tweeter');"; 

        // var insertChannelSql = "INSERT INTO CHANNEL (ID, CHANNELNAME, TEAMID, DESCRIPTION) " +
        //     "VALUES (1, 'slackChannel', 1, 'Channel for team slack')," +
        //            "(2, 'tweeterChannel', 2, 'Channel for team tweeter');"; 

        var insertChannelSql = "INSERT INTO CHANNEL (CHANNELNAME, TEAMID, DESCRIPTION) " +
            "VALUES ('slackChannel', 1, 'Channel for team slack')," +
                   "('tweeterChannel', 2, 'Channel for team tweeter');"; 
        
        // var insertTeamMemberSql = "INSERT INTO TEAMMEMBER (ID, USERID, TEAMID) " +
        //    "VALUES (1, 1, 1)," +
        //           "(2, 1, 2)," +
        //           "(3, 5, 1)," +
        //           "(4, 2, 2);";

        var insertTeamMemberSql = "INSERT INTO TEAMMEMBER (USERID, TEAMID) " +
           "VALUES (1, 1)," +
                  "(1, 2)," +
                  "(5, 1)," +
                  "(2, 2);";

        // var insertMessageSql = "INSERT INTO MESSAGE (ID, MESSAGE, USERID, CHANNELID, DATE) " +
        //      "VALUES (1, 'Hi Swarup!',          1, 1, '2016-08-11 14:45:00'), " +
        //             "(2, 'Mocha testing....',   1, 2, '2016-08-05 12:46:00');";

        var insertMessageSql = "INSERT INTO MESSAGE (MESSAGE, USERID, CHANNELID, DATE) " +
             "VALUES ('Hi Swarup!',          1, 1, '2016-08-11 14:45:00'), " +
                    "('Mocha testing....',   1, 2, '2016-08-05 12:46:00');";
                    
        db.run(insertUserSql);
        db.run(insertTeamSql);
        db.run(insertChannelSql);
        db.run(insertTeamMemberSql);
        db.run(insertMessageSql);
    });
}

db.each("SELECT * FROM USER", function(err, row) {
     console.log(row.ID + " : " + row.USERNAME + " : " + row.NAME + " : " + row.EMAIL + " : " + row.PASSWORD);
});

db.close();

exports.getChannels = getChannels;
function getChannels(conn, teamName) {
    //return conn.select();
    //var data = ['Orange', 'Blue', 'Red'];
    var data = getUser(conn, 5);
    return data;
}

exports.createUser = createUser;
function createUser(conn, username, name, email, password) {
    //getUser(conn, 5);
    var createUserSql = "INSERT INTO USER (USERNAME, NAME, EMAIL, PASSWORD) VALUES (" + username + "', '" + name + "', '" + email + "', '" + password + "');";
    //console.log(createUserSql);
    //console.log(conn.run(createUserSql));
    conn.run(createUserSql);
}

exports.getUser = getUser;
function getUser(conn, id) {
    var getUserSql = "SELECT * FROM USER WHERE ID = " + id;
    conn.each(getUserSql, function(err, row) {
        console.log(row);
        console.log(row.ID + " : " + row.USERNAME + " : " + row.NAME + " : " + row.EMAIL + " : " + row.PASSWORD);
        return row;
    });
}