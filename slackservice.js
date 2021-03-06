var sqlite3 = require('sqlite3');

exports.getUserById = getUserById;
function getUserById(db, id) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM USER WHERE STATUS = 'A' AND ID = '" + id + "'";
        var user;
        db.each(query,
            function(err, row) {
                user = { id: row.ID, username: row.USERNAME, name: row.NAME, email: row.EMAIL, password: row.PASSWORD };
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    if(user === undefined){
                        resolve(JSON.stringify(0));
                    }
                    else{
                        resolve(JSON.stringify(user));
                    }
                }
        });
    });
}

exports.getUserByUsername = getUserByUsername;
function getUserByUsername(db, username) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM USER WHERE STATUS = 'A' AND USERNAME = '" + username + "'";
        var user;
        db.each(query,
            function(err, row) {
                user = { id: row.ID, username: row.USERNAME, name: row.NAME, email: row.EMAIL, password: row.PASSWORD };
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    //console.log(user);
                    resolve(JSON.stringify(user));
                }
        });
    });
}

exports.getUsers = getUsers;
function getUsers(db) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM USER WHERE STATUS = 'A'";
        var users = [];
        var user;
        db.each(query,
            function(err, row) {
                user = { id: row.ID, username: row.USERNAME, name: row.NAME, email: row.EMAIL, password: row.PASSWORD };
                users.push(user);
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    if(users === undefined){
                        resolve(JSON.stringify(0));
                    }
                    else{
                        resolve(JSON.stringify(users));
                        //resolve(users);
                    }
                }
        });
    });
}

exports.createUser = createUser;
function createUser(db, username, name, email, password) {
    return new Promise((resolve, reject) => {
        var sql = "INSERT INTO USER(USERNAME, NAME, EMAIL, PASSWORD) VALUES (?, ?, ?, ?)";
        db.run(sql, username, name, email, password, function(err) {
            if(err) {
                reject(err);
                throw err;
            }
            else {
                //console.log('this=' + JSON.stringify(this));
                //console.log('this.lastID=' + this.lastID);
                //resolve(this.lastID);
                resolve(getUserById(db, this.lastID));

            }
        });
    });
}

exports.getTeamById = getTeamById;
function getTeamById(db, id) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM TEAM WHERE STATUS = 'A' AND ID = '" + id + "'";
        var team;
        db.each(query,
            function(err, row) {
                team = { id: row.ID, teamname: row.TEAMNAME };
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    if(team === undefined){
                        resolve(JSON.stringify(0));
                    }
                    else{
                        resolve(JSON.stringify(team));
                    }
                }
        });
    });
}

exports.getTeamByName = getTeamByName;
function getTeamByName(db, name) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM TEAM WHERE STATUS = 'A' AND TEAMNAME = '" + name + "'";
        var team;
        db.each(query,
            function(err, row) {
                team = { id: row.ID, teamname: row.TEAMNAME };
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    if(team === undefined){
                        resolve(JSON.stringify(0));
                    }
                    else{
                        resolve(JSON.stringify(team));
                    }
                }
        });
    });
}

exports.createTeam = createTeam;
function createTeam(db, teamname) {
    return new Promise((resolve, reject) => {
        var sql = "INSERT INTO TEAM(TEAMNAME) VALUES (?)";
        db.run(sql, teamname, function(err) {
            if(err) {
                reject(err);
                throw err;
            }
            else {
                //console.log('this=' + JSON.stringify(this));
                //console.log('this.lastID=' + this.lastID);
                resolve(this.lastID);
            }
        });
    });
}

exports.getTeams = getTeams;
function getTeams(db) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM TEAM WHERE STATUS = 'A'";
        var teams = [];
        var team;
        db.each(query,
            function(err, row) {
                team = { id: row.ID, teamname: row.TEAMNAME };
                teams.push(team);
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    if(teams === undefined){
                        resolve(JSON.stringify(0));
                    }
                    else{
                        resolve(JSON.stringify(teams));
                    }
                }
        });
    });
}

exports.getChannelById = getChannelById;
function getChannelById(db, id) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM CHANNEL WHERE STATUS = 'A' AND ID = '" + id + "'";
        var channel;
        db.each(query,
            function(err, row) {
                channel = { id: row.ID, channelname: row.CHANNELNAME, teamid: row.TEAMID, description: row.DESCRIPTION };
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    if(channel === undefined){
                        resolve(JSON.stringify(0));
                    }
                    else{
                        resolve(JSON.stringify(channel));
                    }
                }
        });
    });
}

exports.getChannelByName = getChannelByName;
function getChannelByName(db, name) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM CHANNEL WHERE STATUS = 'A' AND CHANNELNAME = '" + name + "'";
        var channel;
        db.each(query,
            function(err, row) {
                channel = { id: row.ID, channelname: row.CHANNELNAME, teamid: row.TEAMID, description: row.DESCRIPTION };
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    if(channel === undefined){
                        resolve(JSON.stringify(0));
                    }
                    else{
                        resolve(JSON.stringify(channel));
                    }
                }
        });
    });
}

exports.createChannel = createChannel;
function createChannel(db, channelName, teamId, description, type) {
    return new Promise((resolve, reject) => {
        var sql = "INSERT INTO CHANNEL(CHANNELNAME, TEAMID, DESCRIPTION, TYPE) VALUES (?, ?, ?, ?)";
        db.run(sql, channelName, teamId, description, type, function(err) {
            if(err) {
                reject(err);
                throw err;
            }
            else {
                //console.log('this=' + JSON.stringify(this));
                //console.log('this.lastID=' + this.lastID);
                resolve(this.lastID);
            }
        });
    });
}

exports.getChannels = getChannels;
function getChannels(db) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM CHANNEL WHERE STATUS = 'A'";
        var channels = [];
        var channel;
        db.each(query,
            function(err, row) {
                channel = { id: row.ID, channelname: row.CHANNELNAME, teamid: row.TEAMID, description: row.DESCRIPTION, type: row.TYPE };
                channels.push(channel);
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    if(channels === undefined){
                        resolve(JSON.stringify(0));
                    }
                    else{
                        resolve(JSON.stringify(channels));
                    }
                }
        });
    });
}

exports.getChannelsByTeamId = getChannelsByTeamId;
function getChannelsByTeamId(db, id) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM CHANNEL WHERE STATUS = 'A' AND TEAMID = '" + id + "'";
        var channels = [];
        var channel;
        db.each(query,
            function(err, row) {
                channel = { id: row.ID, channelname: row.CHANNELNAME, teamid: row.TEAMID, description: row.DESCRIPTION };
                channels.push(channel);
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    if(channels === undefined){
                        resolve(JSON.stringify(0));
                    }
                    else{
                        resolve(JSON.stringify(channels));
                    }
                }
        });
    });
}

exports.getChannelsByTeamName = getChannelsByTeamName;
function getChannelsByTeamName(db, name) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM CHANNEL WHERE STATUS = 'A' AND TEAMID IN (SELECT ID FROM TEAM WHERE STATUS = 'A' AND TEAMNAME = '" + name + "')";
        var channels = [];
        var channel;
        db.each(query,
            function(err, row) {
                channel = { id: row.ID, channelname: row.CHANNELNAME, teamid: row.TEAMID, description: row.DESCRIPTION };
                channels.push(channel);
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    if(channels === undefined){
                        resolve(JSON.stringify(0));
                    }
                    else{
                        resolve(JSON.stringify(channels));
                    }
                }
        });
    });
}

exports.getTeamByChannelId = getTeamByChannelId;
function getTeamByChannelId(db, id) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM TEAM WHERE STATUS = 'A' AND ID IN (SELECT TEAMID FROM CHANNEL WHERE STATUS = 'A' AND ID = '" + id + "')";
        var teams = [];
        var team;
        db.each(query,
            function(err, row) {
                team = { id: row.ID, teamname: row.TEAMNAME };
                teams.push(team);
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    if(teams === undefined){
                        resolve(JSON.stringify(0));
                    }
                    else{
                        resolve(JSON.stringify(teams));
                    }
                }
        });
    });
}

exports.getTeamByChannelName = getTeamByChannelName;
function getTeamByChannelName(db, name) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM TEAM WHERE STATUS = 'A' AND ID IN (SELECT TEAMID FROM CHANNEL WHERE STATUS = 'A' AND CHANNELNAME = '" + name + "')";
        var teams = [];
        var team;
        db.each(query,
            function(err, row) {
                team = { id: row.ID, teamname: row.TEAMNAME };
                teams.push(team);
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    if(teams === undefined){
                        resolve(JSON.stringify(0));
                    }
                    else{
                        resolve(JSON.stringify(teams));
                    }
                }
        });
    });
}

exports.getUsersByTeamId = getUsersByTeamId;
function getUsersByTeamId(db, id) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM USER WHERE STATUS = 'A' AND ID IN (SELECT USERID FROM TEAMMEMBER WHERE STATUS = 'A' AND TEAMID = '" + id + "')";
        var users = [];
        var user;
        db.each(query,
            function(err, row) {
                user = { id: row.ID, username: row.USERNAME, name: row.NAME, email: row.EMAIL, password: row.PASSWORD };
                users.push(user);
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    if(users === undefined){
                        resolve(JSON.stringify(0));
                    }
                    else{
                        resolve(JSON.stringify(users));
                    }
                }
        });
    });
}

exports.getUsersByTeamName = getUsersByTeamName;
function getUsersByTeamName(db, teamName) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM USER WHERE STATUS = 'A' AND ID IN (SELECT USERID FROM TEAMMEMBER WHERE STATUS = 'A' AND TEAMID IN (SELECT ID FROM TEAM WHERE STATUS = 'A' AND TEAMNAME = '" + teamName + "'))";
        var users = [];
        var user;
        db.each(query,
            function(err, row) {
                user = { id: row.ID, username: row.USERNAME, name: row.NAME, email: row.EMAIL, password: row.PASSWORD };
                users.push(user);
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    if(users === undefined){
                        resolve(JSON.stringify(0));
                    }
                    else{
                        resolve(JSON.stringify(users));
                    }
                }
        });
    });
}

exports.getUsersByChannelId = getUsersByChannelId;
function getUsersByChannelId(db, id) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM USER WHERE STATUS = 'A' AND ID IN (SELECT USERID FROM TEAMMEMBER WHERE STATUS = 'A' AND TEAMID IN (SELECT TEAMID FROM CHANNEL WHERE STATUS = 'A' AND ID = '" + id + "'))";
        var users = [];
        var user;
        db.each(query,
            function(err, row) {
                user = { id: row.ID, username: row.USERNAME, name: row.NAME, email: row.EMAIL, password: row.PASSWORD };
                users.push(user);
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    if(users === undefined){
                        resolve(JSON.stringify(0));
                    }
                    else{
                        resolve(JSON.stringify(users));
                    }
                }
        });
    });
}

exports.getUsersByChannelName = getUsersByChannelName;
function getUsersByChannelName(db, name) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM USER WHERE STATUS = 'A' AND ID IN (SELECT USERID FROM TEAMMEMBER WHERE STATUS = 'A' AND TEAMID IN (SELECT TEAMID FROM CHANNEL WHERE STATUS = 'A' AND CHANNELNAME = '" + name + "'))";
        var users = [];
        var user;
        db.each(query,
            function(err, row) {
                user = { id: row.ID, username: row.USERNAME, name: row.NAME, email: row.EMAIL, password: row.PASSWORD };
                users.push(user);
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    if(users === undefined){
                        resolve(JSON.stringify(0));
                    }
                    else{
                        resolve(JSON.stringify(users));
                    }
                }
        });
    });
}

exports.getTeamsByUserId = getTeamsByUserId;
function getTeamsByUserId(db, id) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM TEAM WHERE STATUS = 'A' AND ID IN (SELECT TEAMID FROM TEAMMEMBER WHERE STATUS = 'A' AND USERID = '" + id + "')";
        var teams = [];
        var team;
        db.each(query,
            function(err, row) {
                team = { id: row.ID, teamname: row.TEAMNAME };
                teams.push(team);
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    if(teams === undefined){
                        resolve(JSON.stringify(0));
                    }
                    else{
                        resolve(JSON.stringify(teams));
                    }
                }
        });
    });
}

exports.getTeamsByUserName = getTeamsByUserName;
function getTeamsByUserName(db, name) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM TEAM WHERE STATUS = 'A' AND ID IN (SELECT TEAMID FROM TEAMMEMBER WHERE STATUS = 'A' AND USERID IN (SELECT ID FROM USER WHERE STATUS = 'A' AND USERNAME = '" + name + "'))";
        var teams = [];
        var team;
        db.each(query,
            function(err, row) {
                team = { id: row.ID, teamname: row.TEAMNAME };
                teams.push(team);
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    if(teams === undefined){
                        resolve(JSON.stringify(0));
                    }
                    else{
                        resolve(JSON.stringify(teams));
                    }
                }
        });
    });
}

exports.getChannelsByUserId = getChannelsByUserId;
function getChannelsByUserId(db, id) {
    return new Promise((resolve, reject) => {
        //var query = "SELECT * FROM CHANNEL WHERE TYPE != 'P' AND TEAMID IN (SELECT TEAMID FROM TEAMMEMBER WHERE USERID IN (SELECT ID FROM USER WHERE ID = '" + id + "'))";
        var query = "SELECT C.*, NM.NUMBEROFMESSAGES " +
                    "  FROM CHANNEL C INNER JOIN TEAM T ON C.TEAMID = T.ID " +
                    "                 INNER JOIN TEAMMEMBER TM ON T.ID = TM.TEAMID " +
                    "                 INNER JOIN (SELECT CHANNELID, COUNT(*) AS NUMBEROFMESSAGES FROM MESSAGE WHERE STATUS = 'A' GROUP BY CHANNELID) NM ON C.ID = NM.CHANNELID " +
                    " WHERE C.TYPE != 'P' " +
                    "   AND C.STATUS = 'A' " +
                    "   AND T.STATUS = 'A' " +
                    "   AND TM.STATUS = 'A' " +
                    "   AND TM.USERID = '" + id + "' " +
                    " ORDER BY C.ID";

        var channels = [];
        var channel;
        db.each(query,
            function(err, row) {
                channel = { id: row.ID, channelname: row.CHANNELNAME, teamid: row.TEAMID, description: row.DESCRIPTION, type: row.TYPE, numberofmessages: row.NUMBEROFMESSAGES };
                channels.push(channel);
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    if(channels === undefined){
                        resolve(JSON.stringify(0));
                    }
                    else{
                        resolve(JSON.stringify(channels));
                    }
                }
        });
    });
}

exports.getPrivateChannelsByUserId = getPrivateChannelsByUserId;
function getPrivateChannelsByUserId(db, id) {
    return new Promise((resolve, reject) => {
        //var query = "SELECT * FROM CHANNEL WHERE TYPE = 'P' AND TEAMID IN (SELECT TEAMID FROM TEAMMEMBER WHERE USERID IN (SELECT ID FROM USER WHERE ID = '" + id + "'))";
        //var query = "SELECT * FROM CHANNEL WHERE TYPE != 'P' AND TEAMID IN (SELECT TEAMID FROM TEAMMEMBER WHERE USERID IN (SELECT ID FROM USER WHERE ID = '" + id + "'))";
        var query = "SELECT C.*, NM.NUMBEROFMESSAGES " +
                    "  FROM CHANNEL C INNER JOIN TEAM T ON C.TEAMID = T.ID " +
                    "                 INNER JOIN TEAMMEMBER TM ON T.ID = TM.TEAMID " +
                    "                 INNER JOIN (SELECT CHANNELID, COUNT(*) AS NUMBEROFMESSAGES FROM MESSAGE WHERE STATUS = 'A' GROUP BY CHANNELID) NM ON C.ID = NM.CHANNELID " +
                    " WHERE C.TYPE = 'P' " +
                    "   AND C.STATUS = 'A' " +
                    "   AND T.STATUS = 'A' " +
                    "   AND TM.STATUS = 'A' " +
                    "   AND TM.USERID = '" + id + "' " +
                    "ORDER BY C.ID";

        var channels = [];
        var channel;
        db.each(query,
            function(err, row) {
                channel = { id: row.ID, channelname: row.CHANNELNAME, teamid: row.TEAMID, description: row.DESCRIPTION, type: row.TYPE, numberofmessages:  row.NUMBEROFMESSAGES };
                channels.push(channel);
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    if(channels === undefined){
                        resolve(JSON.stringify(0));
                    }
                    else{
                        resolve(JSON.stringify(channels));
                    }
                }
        });
    });
}

exports.getChannelsByUserName = getChannelsByUserName;
function getChannelsByUserName(db, name) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM CHANNEL WHERE STATUS = 'A' AND TEAMID IN (SELECT TEAMID FROM TEAMMEMBER WHERE STATUS = 'A' AND USERID IN (SELECT ID FROM USER WHERE STATUS = 'A' AND USERNAME = '" + name + "'))";
        var channels = [];
        var channel;
        db.each(query,
            function(err, row) {
                channel = { id: row.ID, channelname: row.CHANNELNAME, teamid: row.TEAMID, description: row.DESCRIPTION };
                channels.push(channel);
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    if(channels === undefined){
                        resolve(JSON.stringify(0));
                    }
                    else{
                        resolve(JSON.stringify(channels));
                    }
                }
        });
    });
}

exports.createTeamMember = createTeamMember;
function createTeamMember(db, userId, teamId) {
    return new Promise((resolve, reject) => {
        var sql = "INSERT INTO TEAMMEMBER(USERID, TEAMID) VALUES (?, ?)";
        db.run(sql, userId, teamId, function(err) {
            if(err) {
                reject(err);
                throw err;
            }
            else {
                resolve(this.lastID);
            }
        });
    });
}

exports.createMessage = createMessage;
function createMessage(db, message, userId, channelId, date) {
    return new Promise((resolve, reject) => {
        var sql = "INSERT INTO MESSAGE(MESSAGE, USERID, CHANNELID, DATE) VALUES (?, ?, ?, ?)";
        db.run(sql, message, userId, channelId, date, function(err) {
            if(err) {
                reject(err);
                throw err;
            }
            else {
                //resolve(this.lastID);
                resolve(getMessageById(db, this.lastID));
            }
        });
    });
}

exports.getMessageById = getMessageById;
function getMessageById(db, id) {
    return new Promise((resolve, reject) => {
        //var query = "SELECT * FROM MESSAGE WHERE ID = '" + id + "'";
        var query = "SELECT ID, MESSAGE, (SELECT USERNAME FROM USER WHERE STATUS = 'A' AND ID = USERID) as USERNAME, CHANNELID, DATE FROM MESSAGE WHERE STATUS = 'A' AND ID = '" + id + "' ORDER BY DATE DESC";
        var message;
        db.each(query,
            function(err, row) {
                //message = { id: row.ID, message:  row.MESSAGE, userid: row.USERID, channelid: row.CHANNELID, date:  row.DATE };
                message = { id: row.ID, message:  row.MESSAGE, username: row.USERNAME, channelid: row.CHANNELID, date:  row.DATE };
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    if(message === undefined){
                        resolve(JSON.stringify(0));
                    }
                    else{
                        resolve(JSON.stringify(message));
                    }
                }
        });
    });
}

exports.getMessages = getMessages;
function getMessages(db) {
    return new Promise((resolve, reject) => {
        //var query = "SELECT * FROM MESSAGE ORDER BY DATE DESC";
        var query = "SELECT ID, MESSAGE, (SELECT USERNAME FROM USER WHERE STATUS = 'A' AND ID = USERID) as USERNAME, CHANNELID, DATE FROM MESSAGE WHERE STATUS = 'A' ORDER BY DATE DESC";
        var messages = [];
        var message;
        db.each(query,
            function(err, row) {
                //message = { id: row.ID, message:  row.MESSAGE, userid: row.USERID, channelid: row.CHANNELID, date:  row.DATE };
                message = { id: row.ID, message:  row.MESSAGE, username: row.USERNAME, channelid: row.CHANNELID, date:  row.DATE };
                messages.push(message);
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    if(messages === undefined){
                        resolve(JSON.stringify(0));
                    }
                    else{
                        resolve(JSON.stringify(messages));
                    }
                }
        });
    });
}

exports.getMessagesByChannelId = getMessagesByChannelId;
function getMessagesByChannelId(db, channelId) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM MESSAGE WHERE STATUS = 'A' AND CHANNELID = '" + channelId + "' ORDER BY DATE DESC";
        var messages = [];
        var message;
        db.each(query,
            function(err, row) {
                message= { id: row.ID, message:  row.MESSAGE, userid: row.USERID, channelid: row.CHANNELID, date:  row.DATE };
                messages.push(message);
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    if(messages === undefined){
                        resolve(JSON.stringify(0));
                    }
                    else{
                        resolve(JSON.stringify(messages));
                    }
                }
        });
    });
}

exports.getMessagesByChannelName = getMessagesByChannelName;
function getMessagesByChannelName(db, channelName) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM MESSAGE WHERE STATUS = 'A' AND CHANNELID = (SELECT ID FROM CHANNEL WHERE STATUS = 'A' AND CHANNELNAME = '" + channelName + "') ORDER BY DATE DESC";
        var messages = [];
        var message;
        db.each(query,
            function(err, row) {
                message = { id: row.ID, message:  row.MESSAGE, userid: row.USERID, channelid: row.CHANNELID, date:  row.DATE };
                messages.push(message);
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    if(messages === undefined){
                        resolve(JSON.stringify(0));
                    }
                    else{
                        resolve(JSON.stringify(messages));
                    }
                }
        });
    });
}

exports.validateUser = validateUser;
function validateUser(db, username, password) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM USER WHERE STATUS = 'A' AND USERNAME = '" + username + "' AND PASSWORD = '" + password + "'";
        var user;
        db.each(query,
            function(err, row) {
                user = { id: row.ID, username: row.USERNAME, name: row.NAME, email: row.EMAIL, password: row.PASSWORD };
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    if(user === undefined){
                        resolve(JSON.stringify(0));
                    }
                    else{
                        resolve(JSON.stringify(user));
                    }
                }
        });
    });
}

exports.getMessagesByUserId = getMessagesByUserId;
function getMessagesByUserId(db, userId) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM MESSAGE WHERE STATUS = 'A' AND USERID = '" + userId + "' ORDER BY DATE DESC";
        var messages = [];
        var message;
        db.each(query,
            function(err, row) {
                message= { id: row.ID, message:  row.MESSAGE, userid: row.USERID, channelid: row.CHANNELID, date:  row.DATE };
                messages.push(message);
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    if(messages === undefined){
                        resolve(JSON.stringify(0));
                    }
                    else{
                        resolve(JSON.stringify(messages));
                    }
                }
        });
    });
}

exports.getMessagesByUserName = getMessagesByUserName;
function getMessagesByUserName(db, userName) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM MESSAGE WHERE STATUS = 'A' AND USERID = (SELECT ID FROM USER WHERE STATUS = 'A' AND USERNAME = '" + userName + "') ORDER BY DATE DESC";
        var messages = [];
        var message;
        db.each(query,
            function(err, row) {
                message= { id: row.ID, message:  row.MESSAGE, userid: row.USERID, channelid: row.CHANNELID, date:  row.DATE };
                messages.push(message);
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    if(messages === undefined){
                        resolve(JSON.stringify(0));
                    }
                    else{
                        resolve(JSON.stringify(messages));
                    }
                }
        });
    });
}

exports.deactivateMessage = deactivateMessage;
function deactivateMessage(db, id) {
    return new Promise((resolve, reject) => {
        var query = "UPDATE MESSAGE SET STATUS = 'D' WHERE ID = '" + id + "'";
        //console.log("Deactivate Message Query:  ", query); 
        db.run(query,
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    //console.log(getMessageById(db, id));
                    resolve(getDeactivatedMessageById(db, id));
                }
        });
    });
}

exports.getDeactivatedMessageById = getDeactivatedMessageById;
function getDeactivatedMessageById(db, id) {
    return new Promise((resolve, reject) => {
        //var query = "SELECT * FROM MESSAGE WHERE ID = '" + id + "'";
        var query = "SELECT ID, MESSAGE, (SELECT USERNAME FROM USER WHERE STATUS = 'A' AND ID = USERID) as USERNAME, CHANNELID, DATE, STATUS FROM MESSAGE WHERE STATUS = 'D' AND ID = '" + id + "' ORDER BY DATE DESC";
        var message;
        db.each(query,
            function(err, row) {
                //message = { id: row.ID, message:  row.MESSAGE, userid: row.USERID, channelid: row.CHANNELID, date:  row.DATE };
                message = { id: row.ID, message:  row.MESSAGE, username: row.USERNAME, channelid: row.CHANNELID, date:  row.DATE, status:  row.STATUS };
            },
            function(err) {
                if(err) {
                    reject(err);
                    throw err;
                }
                else {
                    if(message === undefined){
                        resolve(JSON.stringify(0));
                    }
                    else{
                        //console.log(message);
                        resolve(JSON.stringify(message));
                    }
                }
        });
    });
}

//exports.getMessagesByTeamId = getMessagesByTeamId;
// exports.getMessagesByTeamName = getMessagesByTeamName;
