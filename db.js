
exports.getChannels = getChannels;
exports.getUsersJSON = getUsersJSON;

function getChannels(conn, username){


}

function getUsersJSON(conn, userId) {
    return new Promise((resolve, reject) => {
        var query = "SELECT USERID, NAME, PASSWORD FROM USER "
         + "  WHERE USERID = '" + userId + "'";
        var users = [];
        conn.serialize(() => {
            conn.each(
                query, 
                function(err, row) {
                    if (err) {
                        reject(err);
                    } else {
                        users.push(row.FOLLOWERID);
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
    });
}

/*
var p = getFollowersJSON('abu');
p.then(
    (val) => {
        console.log(val);
    },
    (err) => {
        console.log('oh no!', err);
    }
);
*/



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