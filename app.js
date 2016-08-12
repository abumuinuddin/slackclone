
var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');
var app = express();

var filename = 'slackclone.db';
var dbexists = false;
try {
    fs.accessSync(filename);
    dbexists = true;
} catch (ex) {
    dbexists = false;
}

var db = new sqlite3.Database('slackclone.db');

 
 // function(err, jsonString) {}
function getFollowersJSON(userId, callBack) {
    var query = "SELECT USERID, FOLLOWERID FROM FOLLOWER "
         + "  WHERE USERID = '" + userId + "'";
    var followers = [];
    db.serialize(function() {
        db.each(
            query, 
            function(err, row) {
                followers.push(row.FOLLOWERID);
            },
            function (err) {
                callBack(err, JSON.stringify(followers)); //JSON.stringify(followers)
            }
        );
    });
}

// getFollowersJSON('abu', function (err, jsonString) {
//       if (err) {

//       }
//       console.log("jsonString" + jsonString);
// });

function getFollowerTweetsJSON(userId, callBack) {
	      
    var query = "SELECT USERID, TWEET, DATE FROM TWEET "
            + "  WHERE USERID = (" 
            + "    SELECT FOLLOWERID from FOLLOWER "	    		  
            + "      WHERE USERID = '" + userId + "')" ;       
    var followersTweet = [];
    db.serialize(function() {
        db.each(
            query, 
            function(err, row) {
                followersTweet.push(row);
                //followersTweet.push(row.TWEET);
                //followersTweet.push(row.DATE);
            },
            function (err) {
                callBack(err, JSON.stringify(followersTweet)); //JSON.stringify(followers)
            }
        );
    });
}

// function getUserTweetsJSON(userId) {
//     // TODO
// }

// function getUserJSON(userId) {
//     // TODO
// }


app.get('/views/*', function (req, res) {
        //res.send('Hello World!');
});
app.use(express.static('views'));

app.get('/getFollowerTweets/:id/', function (req, res) {
    console.log("/getFollowerTweets..." + req.params.id);

    getFollowerTweetsJSON(req.params.id, function (err, jsonString) {
        if (err) {
            console.log("Error...", err);
        }
        console.log("Fllowers Tweet : " + jsonString);
        res.send(jsonString);
        
    });


});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

//db.close();

