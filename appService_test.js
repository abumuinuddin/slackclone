var asserts = require('assert');
var appService = require('./appService.js');
var sqlite3 = require('sqlite3');
var TransactionDatabase = require('sqlite3-transactions').TransactionDatabase;
var chai = require("chai"); 
var chaiAsPromised = require("chai-as-promised"); 
 
chai.use(chaiAsPromised); 
chai.should(); 

var conn = new sqlite3.Database('test.db');

describe('Test SlackService', () => {
    beforeEach(() => {
        conn.exec('BEGIN');
    });
    afterEach(() => {
        conn.exec('ROLLBACK');
    });

    it('#1 - given user id, return user with that id', function(done) {
        var id = 7;
        var expected = { id: id, username: 'swarup', name: 'Swarup Khatri', email: 'swarup@myslack.com', password: 'swarup' };
        appService.getUserById(conn, id).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#2 - get all the users, return 0 if no users found', function(done) {
        var expected = [{"id":1,"username":"shuvo","name":"Shuvo Ahmed","email":"shuvo@myslack.com","password":"shuvopassword"},{"id":2,"username":"abu","name":"Abu Moinuddin","email":"abu@myslack.com","password":"abupassword"},
        {"id":3,"username":"charles","name":"Charles Walsek","email":"charles@myslack.com","password":"charlespassword"},{"id":4,"username":"beiying","name":"Beiying Chen","email":"beiying@myslack.com","password":"beiyingpassword"},
        {"id":5,"username":"brian","name":"Brian Will","email":"bwill@myslack.com","password":"brian"},{"id":6,"username":"sly","name":"Sylvester Harvey","email":"sly@myslack.com","password":"sly"},
        {"id":7,"username":"swarup","name":"Swarup Khatri","email":"swarup@myslack.com","password":"swarup"}];
        appService.getUsers(conn).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#3 - given username, return user with that username', function(done) {
        var username = 'swarup';
        var expected = { id: 7, username: username, name: 'Swarup Khatri', email: 'swarup@myslack.com', password: 'swarup' };
        appService.getUserByUsername(conn, username).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#4 - given username, return user with that username', function(done) {
        var username = 'shuvo';
        var expected = { id: 1, username: username, name: 'Shuvo Ahmed', email: 'shuvo@myslack.com', password: 'shuvopassword' };
        appService.getUserByUsername(conn, username).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#5 - given user info, create that user in database', function(done) {
        var username = 'testusername';
        var name = 'Test Name';
        var email = 'TestEmail@slack.com';
        var password = 'testpassword';
        var expected = {id:8,username:"testusername",name:"Test Name",email:"TestEmail@slack.com",password:"testpassword"};
        //var expected = 8;
        appService.createUser(conn, username, name, email, password).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#6 - given a non existent user id, return 0', function(done) {
        var id = 55;
        var expected = 0;
        appService.getUserById(conn, id).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#7 - get all the users, return 0 if no users found', function(done) {
        var expected = [{"id":1,"username":"shuvo","name":"Shuvo Ahmed","email":"shuvo@myslack.com","password":"shuvopassword"},{"id":2,"username":"abu","name":"Abu Moinuddin","email":"abu@myslack.com","password":"abupassword"},
        {"id":3,"username":"charles","name":"Charles Walsek","email":"charles@myslack.com","password":"charlespassword"},{"id":4,"username":"beiying","name":"Beiying Chen","email":"beiying@myslack.com","password":"beiyingpassword"},
        {"id":5,"username":"brian","name":"Brian Will","email":"bwill@myslack.com","password":"brian"},{"id":6,"username":"sly","name":"Sylvester Harvey","email":"sly@myslack.com","password":"sly"},
        {"id":7,"username":"swarup","name":"Swarup Khatri","email":"swarup@myslack.com","password":"swarup"}];
        appService.getUsers(conn).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#8 - given team id, return team with that id', function(done) {
      var id = 1;
      var expected = { id: id, teamname: 'slack' };
      appService.getTeamById(conn, id).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#9 - given teamname, return team with that teamname', function(done) {
      var teamname = 'tweeter';
      var expected = { id: 2, teamname: teamname };
      appService.getTeamByName(conn, teamname).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#10 - given team name, return team with that teamname, this team previously saved in cache', function(done) {
      var teamname = 'slack';
      var expected = { id: 1, teamname: teamname };
      appService.getTeamByName(conn, teamname).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#11 - given team info, create that team in database', function(done) {
      var teamname = 'testteamname';
      var expected = 10;
      appService.createTeam(conn, teamname).should.eventually.equal(expected).notify(done);
    });

    it('#12 - given a non existent team id, return 0', function(done) {
      var id = 75;
      var expected = 0;
      appService.getTeamById(conn, id).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#13 - get all the teams, return 0 if no teams found', function(done) {
        var expected = [{"id":1,"teamname":"slack"},{"id":2,"teamname":"tweeter"},{"id":3,"teamname":"ssa4week"},{"id":4,"teamname":"team1"},{"id":5,"teamname":"team2"},{"id":6,"teamname":"abuShuvo"},
        {"id":7,"teamname":"abuSly"},{"id":8,"teamname":"abuCharles"},{"id":9,"teamname":"swarupShuvo"}];
        appService.getTeams(conn).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#14 - get all the teams, return 0 if no teams found.  This will get the teams from Cache and not from DB', function(done) {
        var expected = [{"id":1,"teamname":"slack"},{"id":2,"teamname":"tweeter"},{"id":3,"teamname":"ssa4week"},{"id":4,"teamname":"team1"},{"id":5,"teamname":"team2"},{"id":6,"teamname":"abuShuvo"},
        {"id":7,"teamname":"abuSly"},{"id":8,"teamname":"abuCharles"},{"id":9,"teamname":"swarupShuvo"}];
        appService.getTeams(conn).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#15 - given channel id, return channel with that id', function(done) {
      var id = 1;
      var expected = { id: id, channelname: 'slackChannel', teamid: 1, description: 'Channel for team slack' };
      appService.getChannelById(conn, id).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#16 - given channel name, return channel with that channel name', function(done) {
      var channelName = 'tweeterChannel';
      var expected = { id: 7, channelname: channelName, teamid: 2, description: 'Channel for team tweeter' };
      appService.getChannelByName(conn, channelName).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#17 - given channel name, return channel with that channel name this time from Cache', function(done) {
      var channelName = 'tweeterChannel';
      var expected = { id: 7, channelname: channelName, teamid: 2, description: 'Channel for team tweeter' };
      appService.getChannelByName(conn, channelName).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#18 - given channel info, create that channel in database', function(done) {
      var channelName = 'testchallenname';
      var teamId = 2;
      var description = 'testdescription';
      var type = 'T';
      var expected = 11;
      appService.createChannel(conn, channelName, teamId, description, type).should.eventually.equal(expected).notify(done);
    });

    it('#19 - given a non existent channel id, return 0', function(done) {
      var id = 88;
      var expected = 0;
      appService.getChannelById(conn, id).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#20 - get all the channels, return 0 if no channels found', function(done) {
        var expected = [{"id":1,"channelname":"slackChannel","teamid":1,"description":"Channel for team slack","type":"T"},{"id":2,"channelname":"ssa4week","teamid":3,"description":"Channel for team ssa4week","type":"T"},
        {"id":3,"channelname":"general","teamid":3,"description":"Channel for team general","type":"T"},{"id":4,"channelname":"team1","teamid":4,"description":"Channel for team team1","type":"T"},
        {"id":5,"channelname":"team2","teamid":5,"description":"Channel for team team2","type":"T"},{"id":6,"channelname":"shuvo.a-abu.m","teamid":6,"description":"Private Channel for team abuShuvo","type":"P"},
        {"id":7,"channelname":"tweeterChannel","teamid":2,"description":"Channel for team tweeter","type":"T"},{"id":8,"channelname":"abu.m-sly.h","teamid":7,"description":"Private Channel for team abuSly","type":"P"},
        {"id":9,"channelname":"abu.m-charles.w","teamid":8,"description":"Private Channel for team abuCharles","type":"P"},{"id":10,"channelname":"swarup.k-shuvo.a","teamid":9,"description":"Private Channel for team swarupShuvo","type":"P"}];
        appService.getChannels(conn).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#21 - get all the channels, return 0 if no channels found.  This uses cached Channels', function(done) {
        var expected = [{"id":1,"channelname":"slackChannel","teamid":1,"description":"Channel for team slack","type":"T"},{"id":2,"channelname":"ssa4week","teamid":3,"description":"Channel for team ssa4week","type":"T"},
        {"id":3,"channelname":"general","teamid":3,"description":"Channel for team general","type":"T"},{"id":4,"channelname":"team1","teamid":4,"description":"Channel for team team1","type":"T"},
        {"id":5,"channelname":"team2","teamid":5,"description":"Channel for team team2","type":"T"},{"id":6,"channelname":"shuvo.a-abu.m","teamid":6,"description":"Private Channel for team abuShuvo","type":"P"},
        {"id":7,"channelname":"tweeterChannel","teamid":2,"description":"Channel for team tweeter","type":"T"},{"id":8,"channelname":"abu.m-sly.h","teamid":7,"description":"Private Channel for team abuSly","type":"P"},
        {"id":9,"channelname":"abu.m-charles.w","teamid":8,"description":"Private Channel for team abuCharles","type":"P"},{"id":10,"channelname":"swarup.k-shuvo.a","teamid":9,"description":"Private Channel for team swarupShuvo","type":"P"}];
        appService.getChannels(conn).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

//     it('get all the channels for a given team id, return 0 if no channels found', function(done) {
//         var teamId = 1;
//         var expected = [{"id":1,"channelname":"slackChannel", "teamid":1, "description":"Channel for team slack"}];
//         slackService.getChannelsByTeamId(conn, teamId).should.eventually.equal(JSON.stringify(expected)).notify(done);
//     });

//     it('get all the channels for a given team name, return 0 if no channels found', function(done) {
//         var teamName = 'tweeter';
//         var expected = [{"id":2,"channelname":"tweeterChannel", "teamid":2, "description":"Channel for team tweeter"}];
//         slackService.getChannelsByTeamName(conn, teamName).should.eventually.equal(JSON.stringify(expected)).notify(done);
//     });

//     it('given channel id, return associated team', function(done) {
//       var channelId = 1;
//       var expected = [{ id: 1, teamname: 'slack' }];
//       slackService.getTeamByChannelId(conn, channelId).should.eventually.equal(JSON.stringify(expected)).notify(done);
//     });

//     it('given channel name, return team associated with that channel', function(done) {
//       var channelName = 'tweeterChannel';
//       var expected = [{ id: 2, teamname: 'tweeter' }];
//       slackService.getTeamByChannelName(conn, channelName).should.eventually.equal(JSON.stringify(expected)).notify(done);
//     });

//     it('given team id, return associated users', function(done) {
//       var teamId = 1;
//       var expected = [{"id":1,"username":"shuvo","name":"Shuvo Ahmed","email":"shuvoahmed@hotmail.com","password":"shuvopassword"}, {"id":5,"username":"swarup","name":"Swarup Khatri","email":"swarup@myslack.com","password":"swarup"}];
//       slackService.getUsersByTeamId(conn, teamId).should.eventually.equal(JSON.stringify(expected)).notify(done);
//     });

//     it('given team name, return associated users', function(done) {
//       var teamName = 'tweeter';
//       var expected = [{"id":1,"username":"shuvo","name":"Shuvo Ahmed","email":"shuvoahmed@hotmail.com","password":"shuvopassword"}, {"id":2,"username":"abu","name":"Abu Moinuddin","email":"abu@myslack.com","password":"abupassword"}];
//       slackService.getUsersByTeamName(conn, teamName).should.eventually.equal(JSON.stringify(expected)).notify(done);
//     });

//     it('given channel id, return associated users', function(done) {
//       var channelId = 1;
//       var expected = [{"id":1,"username":"shuvo","name":"Shuvo Ahmed","email":"shuvoahmed@hotmail.com","password":"shuvopassword"}, {"id":5,"username":"swarup","name":"Swarup Khatri","email":"swarup@myslack.com","password":"swarup"}];
//       slackService.getUsersByChannelId(conn, channelId).should.eventually.equal(JSON.stringify(expected)).notify(done);
//     });

//     it('given channel name, return associated users', function(done) {
//       var channelName = 'tweeterChannel';
//       var expected = [{"id":1,"username":"shuvo","name":"Shuvo Ahmed","email":"shuvoahmed@hotmail.com","password":"shuvopassword"}, {"id":2,"username":"abu","name":"Abu Moinuddin","email":"abu@myslack.com","password":"abupassword"}];
//       slackService.getUsersByChannelName(conn, channelName).should.eventually.equal(JSON.stringify(expected)).notify(done);
//     });

//     it('given user id, return associated teams', function(done) {
//       var userId = 1;
//       var expected = [{"id":1,"teamname":"slack"},{"id":2,"teamname":"tweeter"}];
//       slackService.getTeamsByUserId(conn, userId).should.eventually.equal(JSON.stringify(expected)).notify(done);
//     });

//     it('given username, return associated teams', function(done) {
//       var username = 'abu';
//       var expected = [{"id":2,"teamname":"tweeter"}];
//       slackService.getTeamsByUserName(conn, username).should.eventually.equal(JSON.stringify(expected)).notify(done);
//     });

//     it('given user id, return associated channels', function(done) {
//       var userId = 1;
//       var expected = [{"id":1,"channelname":"slackChannel","teamid":1,"description":"Channel for team slack"},{"id":2,"channelname":"tweeterChannel","teamid":2,"description":"Channel for team tweeter"}];
//       slackService.getChannelsByUserId(conn, userId).should.eventually.equal(JSON.stringify(expected)).notify(done);
//     });

//     it('given username, return associated channels', function(done) {
//       var username = 'abu';
//       var expected = [{"id":2,"channelname":"tweeterChannel","teamid":2,"description":"Channel for team tweeter"}];
//       slackService.getChannelsByUserName(conn, username).should.eventually.equal(JSON.stringify(expected)).notify(done);
//     });

//     it('given user id and team id, add user to that team', function(done) {
//         var userid = 3;
//         var teamid = 1;
//         var expected = 5;
//         slackService.createTeamMember(conn, userid, teamid).should.eventually.equal(expected).notify(done);
//     });

//     it('given message info, add that message to the database', function(done) {
//         var message = 'Test Message';
//         var userId = 3;
//         var channelId = 1;
//         var date = '2016-08-18 14:45:00';
//         //var expected = 3;
//         var expected = {"id":3,"message":"Test Message","username":"charles","channelid":channelId,"date":date};
//         slackService.createMessage(conn, message, userId, channelId, date).should.eventually.equal(JSON.stringify(expected)).notify(done);
//     });

//     it('given message id, retrieve that message from the database', function(done) {
//         var messageId = 1;
//         var expected = {"id":1,"message":"Hi Swarup!","username":"shuvo","channelid":1,"date":"2016-08-11 14:45:00"};
//         slackService.getMessageById(conn, messageId).should.eventually.equal(JSON.stringify(expected)).notify(done);
//     });

//     it('retrieve all the messages', function(done) {
//         var expected = [{"id":1,"message":"Hi Swarup!","username":"shuvo","channelid":1,"date":"2016-08-11 14:45:00"},{"id":2,"message":"Mocha testing....","username":"shuvo","channelid":2,"date":"2016-08-05 12:46:00"}];
//         slackService.getMessages(conn).should.eventually.equal(JSON.stringify(expected)).notify(done);
//     });
    
//     it('given a channel id, retrieve all the messages for that channel', function(done) {
//         var channelId = 1;
//         var expected = [{"id":1,"message":"Hi Swarup!","userid":1,"channelid":channelId,"date":"2016-08-11 14:45:00"}];
//         slackService.getMessagesByChannelId(conn, channelId).should.eventually.equal(JSON.stringify(expected)).notify(done);
//     });

//     it('given a channel name, retrieve all the messages for that channel', function(done) {
//         var channelName = 'tweeterChannel';
//         var expected = [{"id":2,"message":"Mocha testing....","userid":1,"channelid":2,"date":"2016-08-05 12:46:00"}];
//         slackService.getMessagesByChannelName(conn, channelName).should.eventually.equal(JSON.stringify(expected)).notify(done);
//     });
    
//     it('given a username and password, validate and return the user', function(done) {
//         var username = 'shuvo';
//         var password = 'shuvopassword';
//         var expected = { id: 1, username: username, name: 'Shuvo Ahmed', email: 'shuvoahmed@hotmail.com', password: password };
//         slackService.validateUser(conn, username, password).should.eventually.equal(JSON.stringify(expected)).notify(done);
//     });

//     it('given an user id, retrieve all the messages for that user', function(done) {
//         var userId = 1;
//         var expected = [{"id":1,"message":"Hi Swarup!","userid":userId,"channelid":1,"date":"2016-08-11 14:45:00"},{"id":2,"message":"Mocha testing....","userid":userId,"channelid":2,"date":"2016-08-05 12:46:00"}];
//         slackService.getMessagesByUserId(conn, userId).should.eventually.equal(JSON.stringify(expected)).notify(done);
//     });

//     it('given an user name, retrieve all the messages for that user', function(done) {
//         var userName = 'shuvo';
//         var expected = [{"id":1,"message":"Hi Swarup!","userid":1,"channelid":1,"date":"2016-08-11 14:45:00"},{"id":2,"message":"Mocha testing....","userid":1,"channelid":2,"date":"2016-08-05 12:46:00"}];
//         slackService.getMessagesByUserName(conn, userName).should.eventually.equal(JSON.stringify(expected)).notify(done);
//     });

});


// // describe('Db module', () => {
// //     var conn = db.getConnection('test.db');
// //     before(() => {
// //         //conn.transact();
// //         console.log("BEFORE TEST");
// //         conn.each("SELECT * FROM USER", function(err, row) {
// //             console.log(row.ID + " : " + row.USERNAME + " : " + row.NAME + " : " + row.PASSWORD);
// //         });

// //         conn.exec("BEGIN");
// //     });
// //     after(() => {
// //         //conn.transaction.rollback();
// //         console.log("DURING TEST");
// //         conn.each("SELECT * FROM USER", function(err, row) {
// //             console.log(row.ID + " : " + row.USERNAME + " : " + row.NAME + " : " + row.PASSWORD);
// //         });

// //         conn.exec("ROLLBACK");
// //         console.log("AFTER TEST & ROLLBACK");
// //         conn.each("SELECT * FROM USER", function(err, row) {
// //             console.log(row.ID + " : " + row.USERNAME + " : " + row.NAME + " : " + row.PASSWORD);
// //         });
// //     });

// //     it('given team name, return all channel names of that team', () => {

// //         var teamName = 'Yankees';
// //         var expected = ['Orange', 'Blue', 'Red', 'White'];
// //         var actual = db.getChannels(conn, teamName);
// //         asserts(actual, expected);
// //         //actual.must.eql(expected);
// //     });
// // });

