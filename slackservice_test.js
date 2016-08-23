var asserts = require('assert');
var slackService = require('./slackService.js');
var sqlite3 = require('sqlite3');
var TransactionDatabase = require('sqlite3-transactions').TransactionDatabase;
var chai = require("chai"); 
var chaiAsPromised = require("chai-as-promised"); 
 
chai.use(chaiAsPromised); 
chai.should(); 

var conn = new sqlite3.Database('slackclone.db');

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

    it('#1 - given user id, return user with that id', function(done) {
        //this.timeout(20000);
        //setTimeout(done, 20000);
        var id = 5;
        var expected = { id: id, username: 'brian', name: 'Brian Will', email: 'bwill@myslack.com', password: 'brian' };
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

    it('#2 - given username, return user with that username', function(done) {
        //this.timeout(20000);
        //setTimeout(done, 20000);
        var username = 'shuvo';
        var expected = { id: 1, username: username, name: 'Shuvo Ahmed', email: 'shuvo@myslack.com', password: 'shuvopassword' };
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

    it('#3 - iven user info, create that user in database', function(done) {
        //this.timeout(15000);
        //setTimeout(done, 15000);
        
        var username = 'testusername';
        var name = 'Test Name';
        var email = 'TestEmail@slack.com';
        var password = 'testpassword';
        var expected = {"id":8,"username":"testusername","name":"Test Name","email":"TestEmail@slack.com","password":"testpassword"};
        //var expected = 8;
        slackService.createUser(conn, username, name, email, password).should.eventually.equal(JSON.stringify(expected)).notify(done);
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

    it('#4 - given a non existent user id, return 0', function(done) {
        var id = 8;
        var expected = 0;
        slackService.getUserById(conn, id).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#5 - get all the users, return 0 if no users found', function(done) {
        var expected = [{"id":1,"username":"shuvo","name":"Shuvo Ahmed","email":"shuvo@myslack.com","password":"shuvopassword"},{"id":2,"username":"abu","name":"Abu Moinuddin","email":"abu@myslack.com"
                        ,"password":"abupassword"},{"id":3,"username":"charles","name":"Charles Walsek","email":"charles@myslack.com","password":"charlespassword"},{"id":4,"username":"beiying","name":"Beiying Chen"
                        ,"email":"beiying@myslack.com","password":"beiyingpassword"},{"id":5,"username":"brian","name":"Brian Will","email":"bwill@myslack.com","password":"brian"},{"id":6,"username":"sly","name":"Sylvester Harvey"
                        ,"email":"sly@myslack.com","password":"sly"},{"id":7,"username":"swarup","name":"Swarup Khatri","email":"swarup@myslack.com","password":"swarup"}];
        slackService.getUsers(conn).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#6 - given team id, return team with that id', function(done) {
      var id = 1;
      var expected = { id: id, teamname: 'slack' };
      slackService.getTeamById(conn, id).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#7 - given teamname, return team with that teamname', function(done) {
      var teamname = 'tweeter';
      var expected = { id: 2, teamname: teamname };
      slackService.getTeamByName(conn, teamname).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#8 - given team info, create that team in database', function(done) {
      var teamname = 'testteamname';
      var expected = 7;
      slackService.createTeam(conn, teamname).should.eventually.equal(expected).notify(done);
    });

    it('#9 - given a non existent team id, return 0', function(done) {
      var id = 7;
      var expected = 0;
      slackService.getTeamById(conn, id).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#10 - get all the teams, return 0 if no teams found', function(done) {
        var expected = [{"id":1,"teamname":"slack"},{"id":2,"teamname":"tweeter"},{"id":3,"teamname":"ssa4week"},{"id":4,"teamname":"team1"},{"id":5,"teamname":"team2"},{"id":6,"teamname":"abuShuvo"}];
        slackService.getTeams(conn).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#11 - given channel id, return channel with that id', function(done) {
      var id = 1;
      var expected = { id: id, channelname: 'slackChannel', teamid: 1, description: 'Channel for team slack' };
      slackService.getChannelById(conn, id).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#12 - given channel name, return channel with that channel name', function(done) {
      var channelName = 'tweeterChannel';
      var expected = { id: 7, channelname: channelName, teamid: 2, description: 'Channel for team tweeter' };
      slackService.getChannelByName(conn, channelName).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#13 - given channel info, create that channel in database', function(done) {
      var channelName = 'testchallenname';
      var teamId = 2;
      var description = 'testdescription';
      var type = 'testtype';
      var expected = 8;
      slackService.createChannel(conn, channelName, teamId, description, type).should.eventually.equal(expected).notify(done);
    });

    it('#14 - given a non existent channel id, return 0', function(done) {
      var id = 99;
      var expected = 0;
      slackService.getChannelById(conn, id).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#15 - get all the channels, return 0 if no channels found', function(done) {
        var expected = [{"id":1,"channelname":"slackChannel","teamid":1,"description":"Channel for team slack","type":"T"},{"id":2,"channelname":"ssa4week","teamid":3,"description":"Channel for team ssa4week","type":"T"}
        ,{"id":3,"channelname":"general","teamid":3,"description":"Channel for team general","type":"T"},{"id":4,"channelname":"team1","teamid":4,"description":"Channel for team team1","type":"T"},
        {"id":5,"channelname":"team2","teamid":5,"description":"Channel for team team2","type":"T"},{"id":6,"channelname":"abuShuvo","teamid":6,"description":"Private Channel for team abuShuvo","type":"P"},
        {"id":7,"channelname":"tweeterChannel","teamid":2,"description":"Channel for team tweeter","type":"T"}];
        slackService.getChannels(conn).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#16 - get all the channels for a given team id, return 0 if no channels found', function(done) {
        var teamId = 1;
        var expected = [{"id":1,"channelname":"slackChannel", "teamid":1, "description":"Channel for team slack"}];
        slackService.getChannelsByTeamId(conn, teamId).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#17 - get all the channels for a given team name, return 0 if no channels found', function(done) {
        var teamName = 'tweeter';
        var expected = [{"id":7,"channelname":"tweeterChannel", "teamid":2, "description":"Channel for team tweeter"}];
        slackService.getChannelsByTeamName(conn, teamName).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#18 - given channel id, return associated team', function(done) {
      var channelId = 1;
      var expected = [{ id: 1, teamname: 'slack' }];
      slackService.getTeamByChannelId(conn, channelId).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#19 - given channel name, return team associated with that channel', function(done) {
      var channelName = 'tweeterChannel';
      var expected = [{ id: 2, teamname: 'tweeter' }];
      slackService.getTeamByChannelName(conn, channelName).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#20 - given team id, return associated users', function(done) {
      var teamId = 1;
      var expected = [{"id":1,"username":"shuvo","name":"Shuvo Ahmed","email":"shuvo@myslack.com","password":"shuvopassword"},{"id":2,"username":"abu","name":"Abu Moinuddin","email":"abu@myslack.com","password":"abupassword"},
      {"id":6,"username":"sly","name":"Sylvester Harvey","email":"sly@myslack.com","password":"sly"},
      {"id":7,"username":"swarup","name":"Swarup Khatri","email":"swarup@myslack.com","password":"swarup"}];;
      slackService.getUsersByTeamId(conn, teamId).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#21 - given team name, return associated users', function(done) {
      var teamName = 'tweeter';
      var expected = [{"id":1,"username":"shuvo","name":"Shuvo Ahmed","email":"shuvo@myslack.com","password":"shuvopassword"},{"id":2,"username":"abu","name":"Abu Moinuddin","email":"abu@myslack.com","password":"abupassword"},
      {"id":3,"username":"charles","name":"Charles Walsek","email":"charles@myslack.com","password":"charlespassword"},{"id":4,"username":"beiying","name":"Beiying Chen","email":"beiying@myslack.com","password":"beiyingpassword"}];
      slackService.getUsersByTeamName(conn, teamName).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#22 - given channel id, return associated users', function(done) {
      var channelId = 5;
      var expected = [{"id":1,"username":"shuvo","name":"Shuvo Ahmed","email":"shuvo@myslack.com","password":"shuvopassword"},{"id":7,"username":"swarup","name":"Swarup Khatri","email":"swarup@myslack.com","password":"swarup"}];
      slackService.getUsersByChannelId(conn, channelId).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#23 - given channel name, return associated users', function(done) {
      var channelName = 'abuShuvo';
      var expected = [{"id":1,"username":"shuvo","name":"Shuvo Ahmed","email":"shuvo@myslack.com","password":"shuvopassword"},{"id":2,"username":"abu","name":"Abu Moinuddin","email":"abu@myslack.com","password":"abupassword"}];
      slackService.getUsersByChannelName(conn, channelName).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#24 - given user id, return associated teams', function(done) {
      var userId = 1;
      var expected = [{"id":1,"teamname":"slack"},{"id":2,"teamname":"tweeter"},{"id":3,"teamname":"ssa4week"},{"id":5,"teamname":"team2"},{"id":6,"teamname":"abuShuvo"}];
      slackService.getTeamsByUserId(conn, userId).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#25 - given username, return associated teams', function(done) {
      var username = 'abu';
      var expected = [{"id":1,"teamname":"slack"},{"id":2,"teamname":"tweeter"},{"id":3,"teamname":"ssa4week"},{"id":4,"teamname":"team1"},{"id":6,"teamname":"abuShuvo"}];
      slackService.getTeamsByUserName(conn, username).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#26 - given user id, return associated channels', function(done) {
      var userId = 6;
      var expected = [{"id":1,"channelname":"slackChannel","teamid":1,"description":"Channel for team slack"},{"id":2,"channelname":"ssa4week","teamid":3,"description":"Channel for team ssa4week"},
      {"id":3,"channelname":"general","teamid":3,"description":"Channel for team general"},{"id":4,"channelname":"team1","teamid":4,"description":"Channel for team team1"}];
      slackService.getChannelsByUserId(conn, userId).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#27 - given username, return associated channels', function(done) {
      var username = 'charles';
      var expected = [{"id":2,"channelname":"ssa4week","teamid":3,"description":"Channel for team ssa4week"},{"id":3,"channelname":"general","teamid":3,"description":"Channel for team general"},
      {"id":7,"channelname":"tweeterChannel","teamid":2,"description":"Channel for team tweeter"}];
      slackService.getChannelsByUserName(conn, username).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#28 - given user id and team id, add user to that team', function(done) {
        var userid = 3;
        var teamid = 1;
        var expected = 22;
        slackService.createTeamMember(conn, userid, teamid).should.eventually.equal(expected).notify(done);
    });

    it('#29 - given message info, add that message to the database', function(done) {
        var message = 'Test Message';
        var userId = 3;
        var channelId = 1;
        var date = '2016-08-18 14:45:00';
        //var expected = 3;
        var expected = {"id":23,"message":"Test Message","username":"charles","channelid":channelId,"date":date};
        slackService.createMessage(conn, message, userId, channelId, date).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#30 - given message id, retrieve that message from the database', function(done) {
        var messageId = 1;
        var expected = {"id":1,"message":"Hi, Swarup Here!","username":"swarup","channelid":1,"date":"2016-08-11 14:45:00"};
        slackService.getMessageById(conn, messageId).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#31 - retrieve all the messages', function(done) {
        var expected = [{"id":15,"message":"Hi Team1!!","username":"sly","channelid":4,"date":"2016-08-22 12:47:00"},{"id":17,"message":"Hi Team2!!","username":"swarup","channelid":5,"date":"2016-08-22 12:47:00"},
        {"id":14,"message":"Team1 here","username":"abu","channelid":4,"date":"2016-08-22 12:46:00"},{"id":16,"message":"Team2!!!!!","username":"shuvo","channelid":5,"date":"2016-08-22 12:46:00"},
        {"id":4,"message":"Hi Team Slack!","username":"abu","channelid":1,"date":"2016-08-11 14:47:00"},{"id":2,"message":"Hello from Sly","username":"sly","channelid":1,"date":"2016-08-11 14:46:00"},
        {"id":1,"message":"Hi, Swarup Here!","username":"swarup","channelid":1,"date":"2016-08-11 14:45:00"},{"id":5,"message":"Hi Team Tweeter!","username":"shuvo","channelid":7,"date":"2016-08-11 14:45:00"},
        {"id":3,"message":"Shuvo Here...","username":"shuvo","channelid":1,"date":"2016-08-11 14:44:00"},{"id":6,"message":"Hello...","username":"abu","channelid":7,"date":"2016-08-11 14:44:00"},
        {"id":7,"message":"Welcome to Tweeter!","username":"charles","channelid":7,"date":"2016-08-11 14:43:00"},{"id":12,"message":"Learning java","username":"swarup","channelid":2,"date":"2016-08-05 12:47:00"},
        {"id":19,"message":"Yes, Angular is fun","username":"shuvo","channelid":6,"date":"2016-08-05 12:47:00"},{"id":8,"message":"Hi!","username":"beiying","channelid":7,"date":"2016-08-05 12:46:00"},
        {"id":9,"message":"BootCamp Starts","username":"shuvo","channelid":2,"date":"2016-08-05 12:46:00"},{"id":11,"message":"Time to learn","username":"charles","channelid":2,"date":"2016-08-05 12:46:00"},
        {"id":13,"message":"Nodejs is fun","username":"sly","channelid":2,"date":"2016-08-05 12:46:00"},{"id":18,"message":"Angular is cool","username":"abu","channelid":6,"date":"2016-08-05 12:46:00"},
        {"id":10,"message":"Here for 4 weeks","username":"abu","channelid":2,"date":"2016-08-05 12:45:00"}];
        slackService.getMessages(conn).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });
    
    it('#32 - given a channel id, retrieve all the messages for that channel', function(done) {
        var channelId = 6;
        var expected = [{"id":19,"message":"Yes, Angular is fun","userid":1,"channelid":6,"date":"2016-08-05 12:47:00"},{"id":18,"message":"Angular is cool","userid":2,"channelid":6,"date":"2016-08-05 12:46:00"}];
        slackService.getMessagesByChannelId(conn, channelId).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#33 - given a channel name, retrieve all the messages for that channel', function(done) {
        var channelName = 'team2';
        var expected = [{"id":17,"message":"Hi Team2!!","userid":7,"channelid":5,"date":"2016-08-22 12:47:00"},{"id":16,"message":"Team2!!!!!","userid":1,"channelid":5,"date":"2016-08-22 12:46:00"}];
        slackService.getMessagesByChannelName(conn, channelName).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });
    
    it('#34 - given a username and password, validate and return the user', function(done) {
        var username = 'shuvo';
        var password = 'shuvopassword';
        var expected = { id: 1, username: username, name: 'Shuvo Ahmed', email: 'shuvo@myslack.com', password: password };
        slackService.validateUser(conn, username, password).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#35 - given an user id, retrieve all the messages for that user', function(done) {
        var userId = 7;
        var expected = [{"id":17,"message":"Hi Team2!!","userid":7,"channelid":5,"date":"2016-08-22 12:47:00"},{"id":1,"message":"Hi, Swarup Here!","userid":7,"channelid":1,"date":"2016-08-11 14:45:00"},
        {"id":12,"message":"Learning java","userid":7,"channelid":2,"date":"2016-08-05 12:47:00"}];
        slackService.getMessagesByUserId(conn, userId).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#36 - given an user name, retrieve all the messages for that user', function(done) {
        var userName = 'sly';
        var expected = [{"id":15,"message":"Hi Team1!!","userid":6,"channelid":4,"date":"2016-08-22 12:47:00"},{"id":2,"message":"Hello from Sly","userid":6,"channelid":1,"date":"2016-08-11 14:46:00"},
        {"id":13,"message":"Nodejs is fun","userid":6,"channelid":2,"date":"2016-08-05 12:46:00"}];
        slackService.getMessagesByUserName(conn, userName).should.eventually.equal(JSON.stringify(expected)).notify(done);
    });

    it('#37 - given user id, return associated private channels', function(done) {
      var userId = 1;
      var expected = [{"id":6,"channelname":"abuShuvo","teamid":6,"description":"Private Channel for team abuShuvo"}];
      slackService.getPrivateChannelsByUserId(conn, userId).should.eventually.equal(JSON.stringify(expected)).notify(done);
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

