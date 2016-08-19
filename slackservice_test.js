var asserts = require('assert');
var slackService = require('./slackService.js');
var sqlite3 = require('sqlite3');
var TransactionDatabase = require('sqlite3-transactions').TransactionDatabase;
var chai = require("chai"); 
var chaiAsPromised = require("chai-as-promised"); 
 
chai.use(chaiAsPromised); 
chai.should(); 

var conn = new sqlite3.Database('test.db');

describe('Test SlackService', () => {
    //this.timeout(15000);
    // var conn = new TransactionDatabase(
    //     new sqlite3.Database("test.db", 
    //         sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE
    //     )
    // );
    beforeEach(() => {
        conn.exec('BEGIN');
    });
    afterEach(() => {
        conn.exec('ROLLBACK');
    });

    // after(() => {
    //     conn.close();
    // });    
    // configure conn

    it('given user id, return user with that id', function(done) {
        //this.timeout(20000);
        //setTimeout(done, 20000);
        var id = 5;
        var expected = { id: id, username: 'swarup', name: 'Swarup Khatri', email: 'swarup@myslack.com', password: 'swarup' };
        slackService.getUserById(conn, id).should.eventually.equal(JSON.stringify(expected)).notify(done);


        // conn.beginTransaction(function(err, conn) {
        //     if(err) {
        //         throw 'Could not use connection!';
        //     }
        //     try {
        //         var id = 5;
        //         var expected = { id: 5, username: 'swarup', name: 'Swarup Khatri', email: 'swarup@myslack.com', password: 'swarup' };
        //         slackService.getUserById(conn, id).should.eventually.equal(JSON.stringify(expected)).notify(done);
        //         //var actual = slackService.getUserById(conn, id);
        //         //console.log(expected);
        //         //console.log(actual);
        //         //asserts(actual, expected);
        //         //done();
        //     } finally {
        //         //conn.rollback;
        //     }
        //});
    });

    it('given username, return user with that username', function(done) {
        //this.timeout(20000);
        //setTimeout(done, 20000);
        var username = 'shuvo';
        var expected = { id: 1, username: username, name: 'Shuvo Ahmed', email: 'shuvoahmed@hotmail.com', password: 'shuvopassword' };
        slackService.getUserByUsername(conn, username).should.eventually.equal(JSON.stringify(expected)).notify(done);

        // conn.beginTransaction(function(err, conn) {
        //     if(err) {
        //         throw 'Could not use connection!';
        //     }
        //     try {
        //         var username = 'shuvo';
        //         var expected = { id: 1, username: 'shuvo', name: 'Shuvo Ahmed', email: 'shuvoahmed@hotmail.com', password: 'shuvopassword' };
        //         slackService.getUserByUsername(conn, username).should.eventually.equal(JSON.stringify(expected)).notify(done);
        //         //var actual = slackService.getUserByUsername(conn, username);
        //         //console.log(expected);
        //         //console.log(actual);
        //         //asserts(actual, expected);
        //         //done();
        //     } finally {
        //         //conn.rollback;
        //     }
        // });
    });

    it('given user info, create that user in database', function(done) {
        //this.timeout(15000);
        //setTimeout(done, 15000);
        
        var username = 'testusername';
        var name = 'Test Name';
        var email = 'TestEmail@slack.com';
        var password = 'testpassword';
        //var expected = [6, 'testusername', 'Test Name', 'TestEmail@slack.com', 'testpassword'];
        var expected = 6;
        slackService.createUser(conn, username, name, email, password).should.eventually.equal(expected).notify(done);
        // conn.beginTransaction(function(err, conn) {
        //     if(err) {
        //         throw 'Could not use connection!';
        //     }
        //     try {
        //         var username = 'testusername';
        //         var name = 'Test Name';
        //         var email = 'TestEmail@slack.com';
        //         var password = 'testpassword';
        //         var expected = [6, 'testusername', 'Test Name', 'TestEmail@slack.com', 'testpassword'];
        //         var actual_id = slackService.setUser(conn, username, name, email, password);
        //         var actual = slackService.getUser(conn, actual_id);
        //         asserts(actual, expected);
        //         done();
        //     } finally {
        //         conn.rollback;
        //     }
        // });
    });

    it('given a non existent user id, return 0', function(done) {
        var id = 6;
        var expected = 0;
        slackService.getUserById(conn, id).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('get all the users, return 0 if no users found', function(done) {
        var expected = [{"id":1,"username":"shuvo","name":"Shuvo Ahmed","email":"shuvoahmed@hotmail.com","password":"shuvopassword"},{"id":2,"username":"abu","name":"Abu Moinuddin","email":"abu@myslack.com"
                        ,"password":"abupassword"},{"id":3,"username":"charles","name":"Charles Walsek","email":"charles@myslack.com","password":"charlespassword"},{"id":4,"username":"beiying","name":"Beiying Chen"
                        ,"email":"beiying@myslack.com","password":"beiyingpassword"},{"id":5,"username":"swarup","name":"Swarup Khatri","email":"swarup@myslack.com","password":"swarup"}];
        slackService.getUsers(conn).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('given team id, return team with that id', function(done) {
      var id = 1;
      var expected = { id: id, teamname: 'slack' };
      slackService.getTeamById(conn, id).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('given teamname, return team with that teamname', function(done) {
      var teamname = 'tweeter';
      var expected = { id: 2, teamname: teamname };
      slackService.getTeamByName(conn, teamname).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('given team info, create that team in database', function(done) {
      var teamname = 'testteamname';
      var expected = 3;
      slackService.createTeam(conn, teamname).should.eventually.equal(expected).notify(done);
    });

    it('given a non existent team id, return 0', function(done) {
      var id = 3;
      var expected = 0;
      slackService.getTeamById(conn, id).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('get all the teams, return 0 if no teams found', function(done) {
        var expected = [{"id":1,"teamname":"slack"},{"id":2,"teamname":"tweeter"}];
        slackService.getTeams(conn).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('given channel id, return channel with that id', function(done) {
      var id = 1;
      var expected = { id: id, channelname: 'slackChannel', teamid: 1, description: 'Channel for team slack' };
      slackService.getChannelById(conn, id).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('given channel name, return channel with that channel name', function(done) {
      var channelName = 'tweeterChannel';
      var expected = { id: 2, channelname: channelName, teamid: 2, description: 'Channel for team tweeter' };
      slackService.getChannelByName(conn, channelName).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('given channel info, create that channel in database', function(done) {
      var channelName = 'testchallenname';
      var teamId = 2;
      var description = 'testdescription';
      var expected = 3;
      slackService.createChannel(conn, channelName, teamId, description).should.eventually.equal(expected).notify(done);
    });

    it('given a non existent channel id, return 0', function(done) {
      var id = 3;
      var expected = 0;
      slackService.getChannelById(conn, id).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('get all the channels, return 0 if no channels found', function(done) {
        var expected = [{"id":1,"channelname":"slackChannel", "teamid":1, "description":"Channel for team slack"},{"id":2,"channelname":"tweeterChannel", "teamid":2, "description":"Channel for team tweeter"}];
        slackService.getChannels(conn).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('get all the channels for a given team id, return 0 if no channels found', function(done) {
        var teamId = 1;
        var expected = [{"id":1,"channelname":"slackChannel", "teamid":1, "description":"Channel for team slack"}];
        slackService.getChannelsByTeamId(conn, teamId).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('get all the channels for a given team name, return 0 if no channels found', function(done) {
        var teamName = 'tweeter';
        var expected = [{"id":2,"channelname":"tweeterChannel", "teamid":2, "description":"Channel for team tweeter"}];
        slackService.getChannelsByTeamName(conn, teamName).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('given channel id, return associated team', function(done) {
      var channelId = 1;
      var expected = [{ id: 1, teamname: 'slack' }];
      slackService.getTeamByChannelId(conn, channelId).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('given channel name, return team associated with that channel', function(done) {
      var channelName = 'tweeterChannel';
      var expected = [{ id: 2, teamname: 'tweeter' }];
      slackService.getTeamByChannelName(conn, channelName).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('given team id, return associated users', function(done) {
      var teamId = 1;
      var expected = [{"id":1,"username":"shuvo","name":"Shuvo Ahmed","email":"shuvoahmed@hotmail.com","password":"shuvopassword"}, {"id":5,"username":"swarup","name":"Swarup Khatri","email":"swarup@myslack.com","password":"swarup"}];
      slackService.getUsersByTeamId(conn, teamId).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('given team name, return associated users', function(done) {
      var teamName = 'tweeter';
      var expected = [{"id":1,"username":"shuvo","name":"Shuvo Ahmed","email":"shuvoahmed@hotmail.com","password":"shuvopassword"}, {"id":2,"username":"abu","name":"Abu Moinuddin","email":"abu@myslack.com","password":"abupassword"}];
      slackService.getUsersByTeamName(conn, teamName).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('given channel id, return associated users', function(done) {
      var channelId = 1;
      var expected = [{"id":1,"username":"shuvo","name":"Shuvo Ahmed","email":"shuvoahmed@hotmail.com","password":"shuvopassword"}, {"id":5,"username":"swarup","name":"Swarup Khatri","email":"swarup@myslack.com","password":"swarup"}];
      slackService.getUsersByChannelId(conn, channelId).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('given channel name, return associated users', function(done) {
      var channelName = 'tweeterChannel';
      var expected = [{"id":1,"username":"shuvo","name":"Shuvo Ahmed","email":"shuvoahmed@hotmail.com","password":"shuvopassword"}, {"id":2,"username":"abu","name":"Abu Moinuddin","email":"abu@myslack.com","password":"abupassword"}];
      slackService.getUsersByChannelName(conn, channelName).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('given user id, return associated teams', function(done) {
      var userId = 1;
      var expected = [{"id":1,"teamname":"slack"},{"id":2,"teamname":"tweeter"}];
      slackService.getTeamsByUserId(conn, userId).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('given username, return associated teams', function(done) {
      var username = 'abu';
      var expected = [{"id":2,"teamname":"tweeter"}];
      slackService.getTeamsByUserName(conn, username).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('given user id, return associated channels', function(done) {
      var userId = 1;
      var expected = [{"id":1,"channelname":"slackChannel","teamid":1,"description":"Channel for team slack"},{"id":2,"channelname":"tweeterChannel","teamid":2,"description":"Channel for team tweeter"}];
      slackService.getChannelsByUserId(conn, userId).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('given username, return associated channels', function(done) {
      var username = 'abu';
      var expected = [{"id":2,"channelname":"tweeterChannel","teamid":2,"description":"Channel for team tweeter"}];
      slackService.getChannelsByUserName(conn, username).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('given user id and team id, add user to that team', function(done) {
        var userid = 3;
        var teamid = 1;
        var expected = 5;
        slackService.createTeamMember(conn, userid, teamid).should.eventually.equal(expected).notify(done);
    });

    it('given message info, add that message to the database', function(done) {
        var message = 'Test Message';
        var userId = 3;
        var channelId = 1;
        var date = '2016-08-18 14:45:00';
        //var expected = 3;
        var expected = {"id":3,"message":"Test Message","username":"charles","channelid":channelId,"date":date};
        slackService.createMessage(conn, message, userId, channelId, date).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('given message id, retrieve that message from the database', function(done) {
        var messageId = 1;
        var expected = {"id":1,"message":"Hi Swarup!","username":"shuvo","channelid":1,"date":"2016-08-11 14:45:00"};
        slackService.getMessageById(conn, messageId).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('retrieve all the messages', function(done) {
        var expected = [{"id":1,"message":"Hi Swarup!","username":"shuvo","channelid":1,"date":"2016-08-11 14:45:00"},{"id":2,"message":"Mocha testing....","username":"shuvo","channelid":2,"date":"2016-08-05 12:46:00"}];
        slackService.getMessages(conn).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });
    
    it('given a channel id, retrieve all the messages for that channel', function(done) {
        var channelId = 1;
        var expected = [{"id":1,"message":"Hi Swarup!","userid":1,"channelid":channelId,"date":"2016-08-11 14:45:00"}];
        slackService.getMessagesByChannelId(conn, channelId).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('given a channel name, retrieve all the messages for that channel', function(done) {
        var channelName = 'tweeterChannel';
        var expected = [{"id":2,"message":"Mocha testing....","userid":1,"channelid":2,"date":"2016-08-05 12:46:00"}];
        slackService.getMessagesByChannelName(conn, channelName).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });
    
    it('given a username and password, validate and return the user', function(done) {
        var username = 'shuvo';
        var password = 'shuvopassword';
        var expected = { id: 1, username: username, name: 'Shuvo Ahmed', email: 'shuvoahmed@hotmail.com', password: password };
        slackService.validateUser(conn, username, password).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('given an user id, retrieve all the messages for that user', function(done) {
        var userId = 1;
        var expected = [{"id":1,"message":"Hi Swarup!","userid":userId,"channelid":1,"date":"2016-08-11 14:45:00"},{"id":2,"message":"Mocha testing....","userid":userId,"channelid":2,"date":"2016-08-05 12:46:00"}];
        slackService.getMessagesByUserId(conn, userId).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('given an user name, retrieve all the messages for that user', function(done) {
        var userName = 'shuvo';
        var expected = [{"id":1,"message":"Hi Swarup!","userid":1,"channelid":1,"date":"2016-08-11 14:45:00"},{"id":2,"message":"Mocha testing....","userid":1,"channelid":2,"date":"2016-08-05 12:46:00"}];
        slackService.getMessagesByUserName(conn, userName).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

});


// describe('Db module', () => {
//     var conn = db.getConnection('test.db');
//     before(() => {
//         //conn.transact();
//         console.log("BEFORE TEST");
//         conn.each("SELECT * FROM USER", function(err, row) {
//             console.log(row.ID + " : " + row.USERNAME + " : " + row.NAME + " : " + row.PASSWORD);
//         });

//         conn.exec("BEGIN");
//     });
//     after(() => {
//         //conn.transaction.rollback();
//         console.log("DURING TEST");
//         conn.each("SELECT * FROM USER", function(err, row) {
//             console.log(row.ID + " : " + row.USERNAME + " : " + row.NAME + " : " + row.PASSWORD);
//         });

//         conn.exec("ROLLBACK");
//         console.log("AFTER TEST & ROLLBACK");
//         conn.each("SELECT * FROM USER", function(err, row) {
//             console.log(row.ID + " : " + row.USERNAME + " : " + row.NAME + " : " + row.PASSWORD);
//         });
//     });

//     it('given team name, return all channel names of that team', () => {

//         var teamName = 'Yankees';
//         var expected = ['Orange', 'Blue', 'Red', 'White'];
//         var actual = db.getChannels(conn, teamName);
//         asserts(actual, expected);
//         //actual.must.eql(expected);
//     });
// });

