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
                       "(ID             INTEGER         PRIMARY KEY     AUTOINCREMENT NOT NULL, " +
                       " USERNAME       CHAR(50)                                      NOT NULL, " +
                       " NAME           CHAR(50)                                      NOT NULL, " +
                       " EMAIL          CHAR(50)                                      NOT NULL, " +
                       " PASSWORD       CHAR(50)                                      NOT NULL, " +
                       " STATUS         CHAR(1)                                       NOT NULL  DEFAULT 'A' )";

        var createTeamTableSql = "CREATE TABLE IF NOT EXISTS TEAM " +
                       "(ID             INTEGER         PRIMARY KEY     AUTOINCREMENT NOT NULL, " +
                       " TEAMNAME       CHAR(50)                                      NOT NULL, " +
                       " STATUS         CHAR(1)                                       NOT NULL  DEFAULT 'A' )";

        var createChannelTableSql = "CREATE TABLE IF NOT EXISTS CHANNEL " +
                       "(ID             INTEGER         PRIMARY KEY     AUTOINCREMENT NOT NULL, " +
                       " CHANNELNAME    CHAR(50)                                      NOT NULL, " +
                       " TEAMID         INT                                           NOT NULL, " +
                       " DESCRIPTION    TEXT,                                                   " +
                       " TYPE           CHAR(1)                                       NOT NULL, " +
                       " STATUS         CHAR(1)                                       NOT NULL  DEFAULT 'A' )";
                       
        var createMessageTableSql = "CREATE TABLE IF NOT EXISTS MESSAGE " +
                       "(ID             INTEGER         PRIMARY KEY     AUTOINCREMENT NOT NULL, " +
                       " MESSAGE        TEXT                                          NOT NULL, " + 
                       " USERID         INT                                           NOT NULL, " + 
                       " CHANNELID      INT                                           NOT NULL, " + 
                       " DATE           TEXT                                          NOT NULL, " +
                       " STATUS         CHAR(1)                                       NOT NULL  DEFAULT 'A' )"; 

        var createTeamMemberTableSql = "CREATE TABLE IF NOT EXISTS TEAMMEMBER " +
                       "(ID             INTEGER         PRIMARY KEY     AUTOINCREMENT NOT NULL, " +
                       " USERID         INT                                           NOT NULL, " +
                       " TEAMID         INT                                           NOT NULL, " +
                       " STATUS         CHAR(1)                                       NOT NULL  DEFAULT 'A' )";

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
            "VALUES ('shuvo',   'Shuvo Ahmed',      'shuvo@myslack.com',      'shuvopassword')," +
                   "('abu',     'Abu Moinuddin',    'abu@myslack.com',        'abupassword')," +
                   "('charles', 'Charles Walsek',   'charles@myslack.com',    'charlespassword')," +
                   "('beiying', 'Beiying Chen',     'beiying@myslack.com',    'beiyingpassword')," +
                   "('brian',   'Brian Will',       'bwill@myslack.com',      'brian')," +
                   "('sly',     'Sylvester Harvey', 'sly@myslack.com',        'sly')," +
                   "('swarup',  'Swarup Khatri',    'swarup@myslack.com',     'swarup');"; 

        // var insertTeamSql = "INSERT INTO TEAM (ID, TEAMNAME) " +
        //     "VALUES (1, 'slack')," +
        //            "(2, 'tweeter');"; 

        var insertTeamSql = "INSERT INTO TEAM (TEAMNAME) " +
            "VALUES ('slack')," +
                   "('tweeter')," +
                   "('ssa4week')," +
                   "('team1')," +
                   "('team2')," +
                   "('abuShuvo')," +
                   "('abuSly')," +
                   "('abuCharles')," +
                   "('swarupShuvo');";

        // var insertChannelSql = "INSERT INTO CHANNEL (ID, CHANNELNAME, TEAMID, DESCRIPTION) " +
        //     "VALUES (1, 'slackChannel', 1, 'Channel for team slack')," +
        //            "(2, 'tweeterChannel', 2, 'Channel for team tweeter');"; 

        var insertChannelSql = "INSERT INTO CHANNEL (CHANNELNAME, TEAMID, DESCRIPTION, TYPE) " +
            "VALUES ('slackChannel',        1, 'Channel for team slack', 'T')," +
                    "('ssa4week',           3, 'Channel for team ssa4week', 'T')," +
                    "('general',            3, 'Channel for team general', 'T')," +
                    "('team1',              4, 'Channel for team team1', 'T')," +
                    "('team2',              5, 'Channel for team team2', 'T')," +
                    "('shuvo.a-abu.m',      6, 'Private Channel for team abuShuvo', 'P')," +
                    "('tweeterChannel',     2, 'Channel for team tweeter', 'T')," +
                    "('abu.m-sly.h',        7, 'Private Channel for team abuSly', 'P')," +
                    "('abu.m-charles.w',    8, 'Private Channel for team abuCharles', 'P')," +
                    "('swarup.k-shuvo.a',   9, 'Private Channel for team swarupShuvo', 'P');";
        
        // var insertTeamMemberSql = "INSERT INTO TEAMMEMBER (ID, USERID, TEAMID) " +
        //    "VALUES (1, 1, 1)," +
        //           "(2, 1, 2)," +
        //           "(3, 5, 1)," +
        //           "(4, 2, 2);";

        var insertTeamMemberSql = "INSERT INTO TEAMMEMBER (USERID, TEAMID) " +
           "VALUES (1, 1)," +
                  "(7, 1)," +
                  "(2, 1)," +
                  "(6, 1)," +
                  "(1, 2)," +
                  "(2, 2)," +
                  "(3, 2)," +
                  "(4, 2)," +
                  "(1, 3)," +
                  "(2, 3)," +
                  "(3, 3)," +
                  "(4, 3)," +
                  "(5, 3)," +
                  "(6, 3)," +
                  "(7, 3)," +
                  "(2, 4)," +
                  "(6, 4)," +
                  "(1, 5)," +
                  "(7, 5)," +
                  "(1, 6)," +
                  "(2, 6)," +
                  "(2, 7)," +
                  "(6, 7)," +
                  "(2, 8)," +
                  "(3, 8)," +
                  "(7, 9)," +
                  "(1, 9);";

        // var insertMessageSql = "INSERT INTO MESSAGE (ID, MESSAGE, USERID, CHANNELID, DATE) " +
        //      "VALUES (1, 'Hi Swarup!',          1, 1, '2016-08-11 14:45:00'), " +
        //             "(2, 'Mocha testing....',   1, 2, '2016-08-05 12:46:00');";

        var insertMessageSql = "INSERT INTO MESSAGE (MESSAGE, USERID, CHANNELID, DATE) " +
             "VALUES ('Hi, Swarup Here!',                   7, 1, '2016-08-22T10:10:01.123-0400'), " +
                    "('Hello from Sly',                     6, 1, '2016-08-22T13:19:05.256-0400'), " +
                    "('Shuvo Here...',                      1, 1, '2016-08-22T14:21:19.458-0400'), " +
                    "('Hi Team Slack!',                     2, 1, '2016-08-22T15:55:22.458-0400'), " +
                    "('Hi Team Tweeter!',                   1, 7, '2016-08-23T09:01:24.459-0400'), " +
                    "('Hello...',                           2, 7, '2016-08-23T09:12:04.254-0400'), " +
                    "('Welcome to Tweeter!',                3, 7, '2016-08-23T10:11:59.559-0400'), " +
                    "('Hi!',                                4, 7, '2016-08-23T10:18:45.785-0400'), " +
                    "('BootCamp Starts',                    1, 2, '2016-08-23T11:45:44.523-0400'), " +
                    "('Here for 4 weeks',                   2, 2, '2016-08-23T12:48:18.125-0400'), " +
                    "('Time to learn',                      3, 2, '2016-08-23T16:55:14.426-0400'), " +
                    "('Learning java',                      7, 2, '2016-08-24T08:41:42.359-0400'), " +
                    "('Nodejs is fun',                      6, 2, '2016-08-24T08:45:19.357-0400'), " +
                    "('Team1 here',                         2, 4, '2016-08-24T09:10:26.246-0400'), " +
                    "('Hi Team1!!',                         6, 4, '2016-08-24T09:14:25.129-0400'), " +
                    "('Team2!!!!!',                         1, 5, '2016-08-24T09:13:21.842-0400'), " +
                    "('Hi Team2!!',                         7, 5, '2016-08-24T10:01:33.454-0400'), " +
                    "('Angular is cool',                    2, 6, '2016-08-24T10:08:47.444-0400'), " +
                    "('Yes, Angular is fun',                1, 6, '2016-08-24T10:21:05.564-0400'), " +
                    "('Message between Abu and Sylvester',  2, 7, '2016-08-24T11:28:09.785-0400'), " +
                    "('Message between Abu and Charles',    3, 8, '2016-08-24T12:42:17.225-0400'), " +
                    "('Message between Shuvo and Swarup',   1, 9, '2016-08-24T13:11:16.363-0400');";
                    
        db.run(insertUserSql);
        db.run(insertTeamSql);
        db.run(insertChannelSql);
        db.run(insertTeamMemberSql);
        db.run(insertMessageSql);
    });
}

db.each("SELECT * FROM USER", function(err, row) {
     console.log(row.ID + " : " + row.USERNAME + " : " + row.NAME + " : " + row.EMAIL + " : " + row.PASSWORD + " : " + row.STATUS);
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