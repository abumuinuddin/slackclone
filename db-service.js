
exports.getUsersJSON = getUsersJSON;
exports.getChannels = getChannels;
exports.getMessages = getMessages;


function getMessages(db, channelId) {

    return new Promise((resolve, reject) => {
    
        var query = "SELECT * FROM MESSAGE ";
         //+ "  WHERE CHANNELID = '" + channelId + "'";
        var messages = [];

            db.each(query, 
                function(err, row) {
                    if (err) {
                        reject(err);
                    } else {
                        messages.push(row);
                    }
                },
                function (err, nRows) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(JSON.stringify(messages));
                    }
                }
        );
    });

}


function getChannels(db, channelId) {

    return new Promise((resolve, reject) => {
    
        var query = "SELECT * FROM CHANNEL ";
         //+ "  WHERE CHANNELID = '" + channelId + "'";
        var channels = [];

            db.each(query, 
                function(err, row) {
                    if (err) {
                        reject(err);
                    } else {
                        channels.push(row);
                    }
                },
                function (err, nRows) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(JSON.stringify(channels));
                    }
                }
        );
    });

}

function getUsersJSON(db, userId) {
    return new Promise((resolve, reject) => {
        var query = "SELECT * FROM USER "
         + "  WHERE USERID = '" + userId + "'";
        var users = [];

            db.each(query, 
                function(err, row) {
                    if (err) {
                        reject(err);
                    } else {
                        users.push(row);
                    }
                },
                function (err, nRows) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(JSON.stringify(users));
                    }
                }
        );
    });
}

//TEAM, TEAMUSER, CHANNEL, MESSAGE


// var p = getUsersJSON(conn, 'abu');
// p.then(
//     (val) => {
//         console.log("val ...."+ val);
//     },
//     (err) => {
//         console.log('oh no!', err);
//     }
// );






/*
function getUsers (conn, username, callBack) {
     conn.serialize(function() {

            conn.each("SELECT * FROM USER WHERE USERID='abu'", function(err, row) {
            console.log(JSON.stringify(row));
            //console.log(row.USERID + ": " + row.TWEET);
            
        }, 
        function (err, nrows) {
            if (err){
                console.log ("err: " , err);
            }

        };

     }

}*/