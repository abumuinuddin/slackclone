var sqlite3 = require('sqlite3');
var slackservice = require('./slackservice.js');

var usersMapById = new Map();
var usersMapByUsername = new Map();
var allUsers = false;

var teamsMapById = new Map();
var teamsMapByTeamname = new Map();
var allTeams = false;

var channelsMapById = new Map();
var channelsMapByName = new Map();
var allChannels = false;

exports.getUserById = getUserById;
function getUserById(db, id) {
    return new Promise((resolve, reject) => {
        if(usersMapById.get(id) === undefined){
            console.log("User not in Map, Making a DB Call");
            slackservice.getUserById(db, id)
            .then(value => {
                //console.log("Handling success...", JSON.parse(value));
                //console.log(JSON.parse(value));
                //console.log(JSON.parse(value).id);
                // slackService.getChannelsByUserId(db, id)
                // .then(channels => {
                //     console.log("Channels:  ", channels);
                //     //usersMapById.set(JSON.parse(value).id, JSON.parse(value));
                //     //usersMapByUsername.set(JSON.parse(value).username, JSON.parse(value));
                //     //resolve(JSON.stringify(usersMapById.get(id)));
                // })
                // .catch(err => {
                //     console.log("Unable to get user channels");
                // });
                if(JSON.parse(value) === 0){
                    resolve((value));
                }
                else{
                    usersMapById.set(JSON.parse(value).id, JSON.parse(value));
                    usersMapByUsername.set(JSON.parse(value).username, JSON.parse(value));
                    resolve(JSON.stringify(usersMapById.get(id)));
                }
            })
            // .then(slackService.getChannelsByUserId(db, id), channels => {
            //         console.log("Channels:  ", channels);
            //         //usersMapById.set(JSON.parse(value).id, JSON.parse(value));
            //         //usersMapByUsername.set(JSON.parse(value).username, JSON.parse(value));
            //         resolve(JSON.stringify(usersMapById.get(id)));
            // })
            .catch(err => {
                console.log("Unable to get User");
            });
            //resolve(JSON.stringify(usersMap.get(id)));
            //var user = slackservice.getUserById(db, id);
        }
        else {
            console.log("User in cached Map");
            resolve(JSON.stringify(usersMapById.get(id)));
        }
        //resolve(JSON.stringify(usersMap.get(id)));
    });
}

exports.getUserByUsername = getUserByUsername;
function getUserByUsername(db, username) {
    return new Promise((resolve, reject) => {
        if(usersMapByUsername.get(username) === undefined){
            console.log("User not in Map, Making a DB Call");
            slackservice.getUserByUsername(db, username)
            .then(value => {
                usersMapById.set(JSON.parse(value).id, JSON.parse(value));
                usersMapByUsername.set(JSON.parse(value).username, JSON.parse(value));
                resolve(JSON.stringify(usersMapByUsername.get(username)));
            })
            .catch(err => {
                console.log("Unable to get User");
            });
        }
        else {
            console.log("User in cached Map");
            resolve(JSON.stringify(usersMapByUsername.get(username)));
        }
    });
}

exports.getUsers = getUsers;
function getUsers(db) {
    return new Promise((resolve, reject) => {
        if(!allUsers){
            console.log("Retrieving All Users from DB");
            slackservice.getUsers(db)
            .then(values => {
                var jsonValues = JSON.parse(values);
                usersMapById.clear();
                usersMapByUsername.clear();
                for(var value in jsonValues){
                    usersMapById.set(String(jsonValues[value].id), jsonValues[value]);
                    usersMapByUsername.set(String(jsonValues[value].username), jsonValues[value]);
                }
                
                allUsers = true;
                resolve(JSON.stringify(Array.from(usersMapById.values())));
            })
            .catch(err => {
                console.log("Unable to get User");
            });
        }
        else {
            console.log("All Users in cached Map");
            resolve(JSON.stringify(Array.from(usersMapById.values())));
        }
    });
}

exports.createUser = createUser;
function createUser(db, username, name, email, password) {
    return new Promise((resolve, reject) => {
        console.log("Creating user in DB");
        slackservice.createUser(db, username, name, email, password)
        .then(value => {
            var parsedValue = JSON.parse(value);
            //usersMapById.set(String(parsedValue.id), parsedValue);
            //usersMapByUsername.set(String(parsedValue.username), parsedValue);
            allUsers = false;
            resolve(value);
        })
        .catch(err => {
            console.log("Unable to create User");
        });
    });
}

exports.getTeamById = getTeamById;
function getTeamById(db, id) {
    return new Promise((resolve, reject) => {
        if(teamsMapById.get(id) === undefined){
            console.log("Team not in Map, Making a DB Call");
            slackservice.getTeamById(db, id)
            .then(value => {
                if(JSON.parse(value) === 0){
                    resolve((value));
                }
                else{
                    teamsMapById.set(JSON.parse(value).id, JSON.parse(value));
                    teamsMapByTeamname.set(JSON.parse(value).teamname, JSON.parse(value));
                    resolve(JSON.stringify(teamsMapById.get(id)));
                }
            })
            .catch(err => {
                console.log("Unable to get Team");
            });
        }
        else {
            console.log("Team in cached Map");
            resolve(JSON.stringify(teamsMapById.get(id)));
        }
    });
}

exports.getTeamByName = getTeamByName;
function getTeamByName(db, name) {
    return new Promise((resolve, reject) => {
        if(teamsMapByTeamname.get(name) === undefined){
            console.log("Team not in Map, Making a DB Call");
            slackservice.getTeamByName(db, name)
            .then(value => {
                teamsMapById.set(JSON.parse(value).id, JSON.parse(value));
                teamsMapByTeamname.set(JSON.parse(value).teamname, JSON.parse(value));
                resolve(JSON.stringify(teamsMapByTeamname.get(name)));
            })
            .catch(err => {
                console.log("Unable to get Team");
            });
        }
        else {
            console.log("Team in cached Map");
            resolve(JSON.stringify(teamsMapByTeamname.get(name)));
        }
    });
}

exports.createTeam = createTeam;
function createTeam(db, teamname) {
    return new Promise((resolve, reject) => {
        console.log("Creating team in DB");
        slackservice.createTeam(db, teamname)
        .then(value => {
            var parsedValue = JSON.parse(value);
            //usersMapById.set(String(parsedValue.id), parsedValue);
            //usersMapByUsername.set(String(parsedValue.username), parsedValue);
            allTeams = false;
            resolve(value);
        })
        .catch(err => {
            console.log("Unable to create Team");
        });
    });
}

exports.getTeams = getTeams;
function getTeams(db) {
    return new Promise((resolve, reject) => {
        if(!allTeams){
            console.log("Retrieving All Teams from DB");
            slackservice.getTeams(db)
            .then(values => {
                var jsonValues = JSON.parse(values);
                teamsMapById.clear();
                teamsMapByTeamname.clear();
                for(var value in jsonValues){
                    teamsMapById.set(String(jsonValues[value].id), jsonValues[value]);
                    teamsMapByTeamname.set(String(jsonValues[value].teamname), jsonValues[value]);
                }
                
                allTeams = true;
                resolve(JSON.stringify(Array.from(teamsMapById.values())));
            })
            .catch(err => {
                console.log("Unable to get all Teams");
            });
        }
        else {
            console.log("All Teams in cached Map");
            resolve(JSON.stringify(Array.from(teamsMapById.values())));
        }
    });
}

exports.getChannelById = getChannelById;
function getChannelById(db, id) {
    return new Promise((resolve, reject) => {
        if(channelsMapById.get(id) === undefined){
            console.log("Channel not in Map, Making a DB Call");
            slackservice.getChannelById(db, id)
            .then(value => {
                if(JSON.parse(value) === 0){
                    resolve((value));
                }
                else{
                    channelsMapById.set(JSON.parse(value).id, JSON.parse(value));
                    channelsMapByName.set(JSON.parse(value).channelname, JSON.parse(value));
                    resolve(JSON.stringify(channelsMapById.get(id)));
                }
            })
            .catch(err => {
                console.log("Unable to get Channel");
            });
        }
        else {
            console.log("Channel in cached Map");
            resolve(JSON.stringify(channelsMapById.get(id)));
        }
    });
}

exports.getChannelByName = getChannelByName;
function getChannelByName(db, name) {
    return new Promise((resolve, reject) => {
        if(channelsMapByName.get(name) === undefined){
            console.log("Channel not in Map, Making a DB Call");
            slackservice.getChannelByName(db, name)
            .then(value => {
                channelsMapById.set(JSON.parse(value).id, JSON.parse(value));
                channelsMapByName.set(JSON.parse(value).channelname, JSON.parse(value));
                resolve(JSON.stringify(channelsMapByName.get(name)));
            })
            .catch(err => {
                console.log("Unable to get Channel");
            });
        }
        else {
            console.log("Channel in cached Map");
            resolve(JSON.stringify(channelsMapByName.get(name)));
        }
    });
}

exports.createChannel = createChannel;
function createChannel(db, channelName, teamId, description, type) {
    return new Promise((resolve, reject) => {
        console.log("Creating Channel in DB");
        slackservice.createChannel(db, channelName, teamId, description, type)
        .then(value => {
            var parsedValue = JSON.parse(value);
            //usersMapById.set(String(parsedValue.id), parsedValue);
            //usersMapByUsername.set(String(parsedValue.username), parsedValue);
            allChannels = false;
            resolve(value);
        })
        .catch(err => {
            console.log("Unable to create Channel");
        });
    });
}

exports.getChannels = getChannels;
function getChannels(db) {
    return new Promise((resolve, reject) => {
        if(!allChannels){
            console.log("Retrieving All Channels from DB");
            slackservice.getChannels(db)
            .then(values => {
                var jsonValues = JSON.parse(values);
                channelsMapById.clear();
                channelsMapByName.clear();
                for(var value in jsonValues){
                    channelsMapById.set(String(jsonValues[value].id), jsonValues[value]);
                    channelsMapByName.set(String(jsonValues[value].channelname), jsonValues[value]);
                }
                
                allChannels = true;
                resolve(JSON.stringify(Array.from(channelsMapById.values())));
            })
            .catch(err => {
                console.log("Unable to get all Channels");
            });
        }
        else {
            console.log("All Channels in cached Map");
            resolve(JSON.stringify(Array.from(channelsMapById.values())));
        }
    });
}

// exports.getChannelsByTeamId = getChannelsByTeamId;
// function getChannelsByTeamId(db, id) {
//     return new Promise((resolve, reject) => {
//         var query = "SELECT * FROM CHANNEL WHERE TEAMID = '" + id + "'";
//         var channels = [];
//         var channel;
//         db.each(query,
//             function(err, row) {
//                 channel = { id: row.ID, channelname: row.CHANNELNAME, teamid: row.TEAMID, description: row.DESCRIPTION };
//                 channels.push(channel);
//             },
//             function(err) {
//                 if(err) {
//                     reject(err);
//                     throw err;
//                 }
//                 else {
//                     if(channels === undefined){
//                         resolve(JSON.stringify(0));
//                     }
//                     else{
//                         resolve(JSON.stringify(channels));
//                     }
//                 }
//         });
//     });
// }

// exports.getChannelsByTeamName = getChannelsByTeamName;
// function getChannelsByTeamName(db, name) {
//     return new Promise((resolve, reject) => {
//         var query = "SELECT * FROM CHANNEL WHERE TEAMID IN (SELECT ID FROM TEAM WHERE TEAMNAME = '" + name + "')";
//         var channels = [];
//         var channel;
//         db.each(query,
//             function(err, row) {
//                 channel = { id: row.ID, channelname: row.CHANNELNAME, teamid: row.TEAMID, description: row.DESCRIPTION };
//                 channels.push(channel);
//             },
//             function(err) {
//                 if(err) {
//                     reject(err);
//                     throw err;
//                 }
//                 else {
//                     if(channels === undefined){
//                         resolve(JSON.stringify(0));
//                     }
//                     else{
//                         resolve(JSON.stringify(channels));
//                     }
//                 }
//         });
//     });
// }

// exports.getTeamByChannelId = getTeamByChannelId;
// function getTeamByChannelId(db, id) {
//     return new Promise((resolve, reject) => {
//         var query = "SELECT * FROM TEAM WHERE ID IN (SELECT TEAMID FROM CHANNEL WHERE ID = '" + id + "')";
//         var teams = [];
//         var team;
//         db.each(query,
//             function(err, row) {
//                 team = { id: row.ID, teamname: row.TEAMNAME };
//                 teams.push(team);
//             },
//             function(err) {
//                 if(err) {
//                     reject(err);
//                     throw err;
//                 }
//                 else {
//                     if(teams === undefined){
//                         resolve(JSON.stringify(0));
//                     }
//                     else{
//                         resolve(JSON.stringify(teams));
//                     }
//                 }
//         });
//     });
// }

// exports.getTeamByChannelName = getTeamByChannelName;
// function getTeamByChannelName(db, name) {
//     return new Promise((resolve, reject) => {
//         var query = "SELECT * FROM TEAM WHERE ID IN (SELECT TEAMID FROM CHANNEL WHERE CHANNELNAME = '" + name + "')";
//         var teams = [];
//         var team;
//         db.each(query,
//             function(err, row) {
//                 team = { id: row.ID, teamname: row.TEAMNAME };
//                 teams.push(team);
//             },
//             function(err) {
//                 if(err) {
//                     reject(err);
//                     throw err;
//                 }
//                 else {
//                     if(teams === undefined){
//                         resolve(JSON.stringify(0));
//                     }
//                     else{
//                         resolve(JSON.stringify(teams));
//                     }
//                 }
//         });
//     });
// }

// exports.getUsersByTeamId = getUsersByTeamId;
// function getUsersByTeamId(db, id) {
//     return new Promise((resolve, reject) => {
//         var query = "SELECT * FROM USER WHERE ID IN (SELECT USERID FROM TEAMMEMBER WHERE TEAMID = '" + id + "')";
//         var users = [];
//         var user;
//         db.each(query,
//             function(err, row) {
//                 user = { id: row.ID, username: row.USERNAME, name: row.NAME, email: row.EMAIL, password: row.PASSWORD };
//                 users.push(user);
//             },
//             function(err) {
//                 if(err) {
//                     reject(err);
//                     throw err;
//                 }
//                 else {
//                     if(users === undefined){
//                         resolve(JSON.stringify(0));
//                     }
//                     else{
//                         resolve(JSON.stringify(users));
//                     }
//                 }
//         });
//     });
// }

// exports.getUsersByTeamName = getUsersByTeamName;
// function getUsersByTeamName(db, teamName) {
//     return new Promise((resolve, reject) => {
//         var query = "SELECT * FROM USER WHERE ID IN (SELECT USERID FROM TEAMMEMBER WHERE TEAMID IN (SELECT ID FROM TEAM WHERE TEAMNAME = '" + teamName + "'))";
//         var users = [];
//         var user;
//         db.each(query,
//             function(err, row) {
//                 user = { id: row.ID, username: row.USERNAME, name: row.NAME, email: row.EMAIL, password: row.PASSWORD };
//                 users.push(user);
//             },
//             function(err) {
//                 if(err) {
//                     reject(err);
//                     throw err;
//                 }
//                 else {
//                     if(users === undefined){
//                         resolve(JSON.stringify(0));
//                     }
//                     else{
//                         resolve(JSON.stringify(users));
//                     }
//                 }
//         });
//     });
// }

// exports.getUsersByChannelId = getUsersByChannelId;
// function getUsersByChannelId(db, id) {
//     return new Promise((resolve, reject) => {
//         var query = "SELECT * FROM USER WHERE ID IN (SELECT USERID FROM TEAMMEMBER WHERE TEAMID IN (SELECT TEAMID FROM CHANNEL WHERE ID = '" + id + "'))";
//         var users = [];
//         var user;
//         db.each(query,
//             function(err, row) {
//                 user = { id: row.ID, username: row.USERNAME, name: row.NAME, email: row.EMAIL, password: row.PASSWORD };
//                 users.push(user);
//             },
//             function(err) {
//                 if(err) {
//                     reject(err);
//                     throw err;
//                 }
//                 else {
//                     if(users === undefined){
//                         resolve(JSON.stringify(0));
//                     }
//                     else{
//                         resolve(JSON.stringify(users));
//                     }
//                 }
//         });
//     });
// }

// exports.getUsersByChannelName = getUsersByChannelName;
// function getUsersByChannelName(db, name) {
//     return new Promise((resolve, reject) => {
//         var query = "SELECT * FROM USER WHERE ID IN (SELECT USERID FROM TEAMMEMBER WHERE TEAMID IN (SELECT TEAMID FROM CHANNEL WHERE CHANNELNAME = '" + name + "'))";
//         var users = [];
//         var user;
//         db.each(query,
//             function(err, row) {
//                 user = { id: row.ID, username: row.USERNAME, name: row.NAME, email: row.EMAIL, password: row.PASSWORD };
//                 users.push(user);
//             },
//             function(err) {
//                 if(err) {
//                     reject(err);
//                     throw err;
//                 }
//                 else {
//                     if(users === undefined){
//                         resolve(JSON.stringify(0));
//                     }
//                     else{
//                         resolve(JSON.stringify(users));
//                     }
//                 }
//         });
//     });
// }

// exports.getTeamsByUserId = getTeamsByUserId;
// function getTeamsByUserId(db, id) {
//     return new Promise((resolve, reject) => {
//         var query = "SELECT * FROM TEAM WHERE ID IN (SELECT TEAMID FROM TEAMMEMBER WHERE USERID = '" + id + "')";
//         var teams = [];
//         var team;
//         db.each(query,
//             function(err, row) {
//                 team = { id: row.ID, teamname: row.TEAMNAME };
//                 teams.push(team);
//             },
//             function(err) {
//                 if(err) {
//                     reject(err);
//                     throw err;
//                 }
//                 else {
//                     if(teams === undefined){
//                         resolve(JSON.stringify(0));
//                     }
//                     else{
//                         resolve(JSON.stringify(teams));
//                     }
//                 }
//         });
//     });
// }

// exports.getTeamsByUserName = getTeamsByUserName;
// function getTeamsByUserName(db, name) {
//     return new Promise((resolve, reject) => {
//         var query = "SELECT * FROM TEAM WHERE ID IN (SELECT TEAMID FROM TEAMMEMBER WHERE USERID IN (SELECT ID FROM USER WHERE USERNAME = '" + name + "'))";
//         var teams = [];
//         var team;
//         db.each(query,
//             function(err, row) {
//                 team = { id: row.ID, teamname: row.TEAMNAME };
//                 teams.push(team);
//             },
//             function(err) {
//                 if(err) {
//                     reject(err);
//                     throw err;
//                 }
//                 else {
//                     if(teams === undefined){
//                         resolve(JSON.stringify(0));
//                     }
//                     else{
//                         resolve(JSON.stringify(teams));
//                     }
//                 }
//         });
//     });
// }

// exports.getChannelsByUserId = getChannelsByUserId;
// function getChannelsByUserId(db, id) {
//     return new Promise((resolve, reject) => {
//         var query = "SELECT * FROM CHANNEL WHERE TEAMID IN (SELECT TEAMID FROM TEAMMEMBER WHERE USERID IN (SELECT ID FROM USER WHERE ID = '" + id + "'))";
//         var channels = [];
//         var channel;
//         db.each(query,
//             function(err, row) {
//                 channel = { id: row.ID, channelname: row.CHANNELNAME, teamid: row.TEAMID, description: row.DESCRIPTION };
//                 channels.push(channel);
//             },
//             function(err) {
//                 if(err) {
//                     reject(err);
//                     throw err;
//                 }
//                 else {
//                     if(channels === undefined){
//                         resolve(JSON.stringify(0));
//                     }
//                     else{
//                         resolve(JSON.stringify(channels));
//                     }
//                 }
//         });
//     });
// }

// exports.getChannelsByUserName = getChannelsByUserName;
// function getChannelsByUserName(db, name) {
//     return new Promise((resolve, reject) => {
//         var query = "SELECT * FROM CHANNEL WHERE TEAMID IN (SELECT TEAMID FROM TEAMMEMBER WHERE USERID IN (SELECT ID FROM USER WHERE USERNAME = '" + name + "'))";
//         var channels = [];
//         var channel;
//         db.each(query,
//             function(err, row) {
//                 channel = { id: row.ID, channelname: row.CHANNELNAME, teamid: row.TEAMID, description: row.DESCRIPTION };
//                 channels.push(channel);
//             },
//             function(err) {
//                 if(err) {
//                     reject(err);
//                     throw err;
//                 }
//                 else {
//                     if(channels === undefined){
//                         resolve(JSON.stringify(0));
//                     }
//                     else{
//                         resolve(JSON.stringify(channels));
//                     }
//                 }
//         });
//     });
// }

// exports.createTeamMember = createTeamMember;
// function createTeamMember(db, userId, teamId) {
//     return new Promise((resolve, reject) => {
//         var sql = "INSERT INTO TEAMMEMBER(USERID, TEAMID) VALUES (?, ?)";
//         db.run(sql, userId, teamId, function(err) {
//             if(err) {
//                 reject(err);
//                 throw err;
//             }
//             else {
//                 resolve(this.lastID);
//             }
//         });
//     });
// }

// exports.createMessage = createMessage;
// function createMessage(db, message, userId, channelId, date) {
//     return new Promise((resolve, reject) => {
//         var sql = "INSERT INTO MESSAGE(MESSAGE, USERID, CHANNELID, DATE) VALUES (?, ?, ?, ?)";
//         db.run(sql, message, userId, channelId, date, function(err) {
//             if(err) {
//                 reject(err);
//                 throw err;
//             }
//             else {
//                 //resolve(this.lastID);
//                 resolve(getMessageById(db, this.lastID));
//             }
//         });
//     });
// }

// exports.getMessageById = getMessageById;
// function getMessageById(db, id) {
//     return new Promise((resolve, reject) => {
//         //var query = "SELECT * FROM MESSAGE WHERE ID = '" + id + "'";
//         var query = "SELECT ID, MESSAGE, (SELECT USERNAME FROM USER WHERE ID = USERID) as USERNAME, CHANNELID, DATE FROM MESSAGE WHERE ID = '" + id + "' ORDER BY DATE DESC";
//         var message;
//         db.each(query,
//             function(err, row) {
//                 //message = { id: row.ID, message:  row.MESSAGE, userid: row.USERID, channelid: row.CHANNELID, date:  row.DATE };
//                 message = { id: row.ID, message:  row.MESSAGE, username: row.USERNAME, channelid: row.CHANNELID, date:  row.DATE };
//             },
//             function(err) {
//                 if(err) {
//                     reject(err);
//                     throw err;
//                 }
//                 else {
//                     if(message === undefined){
//                         resolve(JSON.stringify(0));
//                     }
//                     else{
//                         resolve(JSON.stringify(message));
//                     }
//                 }
//         });
//     });
// }

// exports.getMessages = getMessages;
// function getMessages(db) {
//     return new Promise((resolve, reject) => {
//         //var query = "SELECT * FROM MESSAGE ORDER BY DATE DESC";
//         var query = "SELECT ID, MESSAGE, (SELECT USERNAME FROM USER WHERE ID = USERID) as USERNAME, CHANNELID, DATE FROM MESSAGE ORDER BY DATE DESC";
//         var messages = [];
//         var message;
//         db.each(query,
//             function(err, row) {
//                 //message = { id: row.ID, message:  row.MESSAGE, userid: row.USERID, channelid: row.CHANNELID, date:  row.DATE };
//                 message = { id: row.ID, message:  row.MESSAGE, username: row.USERNAME, channelid: row.CHANNELID, date:  row.DATE };
//                 messages.push(message);
//             },
//             function(err) {
//                 if(err) {
//                     reject(err);
//                     throw err;
//                 }
//                 else {
//                     if(messages === undefined){
//                         resolve(JSON.stringify(0));
//                     }
//                     else{
//                         resolve(JSON.stringify(messages));
//                     }
//                 }
//         });
//     });
// }

// exports.getMessagesByChannelId = getMessagesByChannelId;
// function getMessagesByChannelId(db, channelId) {
//     return new Promise((resolve, reject) => {
//         var query = "SELECT * FROM MESSAGE WHERE CHANNELID = '" + channelId + "' ORDER BY DATE DESC";
//         var messages = [];
//         var message;
//         db.each(query,
//             function(err, row) {
//                 message= { id: row.ID, message:  row.MESSAGE, userid: row.USERID, channelid: row.CHANNELID, date:  row.DATE };
//                 messages.push(message);
//             },
//             function(err) {
//                 if(err) {
//                     reject(err);
//                     throw err;
//                 }
//                 else {
//                     if(messages === undefined){
//                         resolve(JSON.stringify(0));
//                     }
//                     else{
//                         resolve(JSON.stringify(messages));
//                     }
//                 }
//         });
//     });
// }

// exports.getMessagesByChannelName = getMessagesByChannelName;
// function getMessagesByChannelName(db, channelName) {
//     return new Promise((resolve, reject) => {
//         var query = "SELECT * FROM MESSAGE WHERE CHANNELID = (SELECT ID FROM CHANNEL WHERE CHANNELNAME = '" + channelName + "') ORDER BY DATE DESC";
//         var messages = [];
//         var message;
//         db.each(query,
//             function(err, row) {
//                 message = { id: row.ID, message:  row.MESSAGE, userid: row.USERID, channelid: row.CHANNELID, date:  row.DATE };
//                 messages.push(message);
//             },
//             function(err) {
//                 if(err) {
//                     reject(err);
//                     throw err;
//                 }
//                 else {
//                     if(messages === undefined){
//                         resolve(JSON.stringify(0));
//                     }
//                     else{
//                         resolve(JSON.stringify(messages));
//                     }
//                 }
//         });
//     });
// }

// exports.validateUser = validateUser;
// function validateUser(db, username, password) {
//     return new Promise((resolve, reject) => {
//         var query = "SELECT * FROM USER WHERE USERNAME = '" + username + "' AND PASSWORD = '" + password + "'";
//         var user;
//         db.each(query,
//             function(err, row) {
//                 user = { id: row.ID, username: row.USERNAME, name: row.NAME, email: row.EMAIL, password: row.PASSWORD };
//             },
//             function(err) {
//                 if(err) {
//                     reject(err);
//                     throw err;
//                 }
//                 else {
//                     if(user === undefined){
//                         resolve(JSON.stringify(0));
//                     }
//                     else{
//                         resolve(JSON.stringify(user));
//                     }
//                 }
//         });
//     });
// }

// exports.getMessagesByUserId = getMessagesByUserId;
// function getMessagesByUserId(db, userId) {
//     return new Promise((resolve, reject) => {
//         var query = "SELECT * FROM MESSAGE WHERE USERID = '" + userId + "' ORDER BY DATE DESC";
//         var messages = [];
//         var message;
//         db.each(query,
//             function(err, row) {
//                 message= { id: row.ID, message:  row.MESSAGE, userid: row.USERID, channelid: row.CHANNELID, date:  row.DATE };
//                 messages.push(message);
//             },
//             function(err) {
//                 if(err) {
//                     reject(err);
//                     throw err;
//                 }
//                 else {
//                     if(messages === undefined){
//                         resolve(JSON.stringify(0));
//                     }
//                     else{
//                         resolve(JSON.stringify(messages));
//                     }
//                 }
//         });
//     });
// }

// exports.getMessagesByUserName = getMessagesByUserName;
// function getMessagesByUserName(db, userName) {
//     return new Promise((resolve, reject) => {
//         var query = "SELECT * FROM MESSAGE WHERE USERID = (SELECT ID FROM USER WHERE USERNAME = '" + userName + "') ORDER BY DATE DESC";
//         var messages = [];
//         var message;
//         db.each(query,
//             function(err, row) {
//                 message= { id: row.ID, message:  row.MESSAGE, userid: row.USERID, channelid: row.CHANNELID, date:  row.DATE };
//                 messages.push(message);
//             },
//             function(err) {
//                 if(err) {
//                     reject(err);
//                     throw err;
//                 }
//                 else {
//                     if(messages === undefined){
//                         resolve(JSON.stringify(0));
//                     }
//                     else{
//                         resolve(JSON.stringify(messages));
//                     }
//                 }
//         });
//     });
// }

// //exports.getMessagesByTeamId = getMessagesByTeamId;
// // exports.getMessagesByTeamName = getMessagesByTeamName;
