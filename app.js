
var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');
var app = express();
var dbservice = require('./db.js');

var filename = 'slackclone.db';
var dbexists = false;
try {
    fs.accessSync(filename);
    dbexists = true;
} catch (ex) {
    dbexists = false;
}

var db = new sqlite3.Database(filename);

/*
var pUser = dbservice.getUsersJSON(db, 'abu');
pUser.then(
    (val) => {
        console.log("Users ....: "+ val);
    },
    (err) => {
        console.log('oh no!', err);
    }
);

var pChannel = dbservice.getChannels(db, 'rubychannel');
pChannel.then(
    (val) => {
        console.log("Channels ....: "+ val);
    },
    (err) => {
        console.log('oh no!', err);
    }
);

var pMessage = dbservice.getMessages(db, 'rubychannel');
pMessage.then(
    (val) => {
        console.log("Messages ....: "+ val);
    },
    (err) => {
        console.log('oh no!', err);
    }
);*/

app.use('/views', express.static(__dirname + '/views'));

app.get('/getChannels/:id/', function (req, res) {
    //console.log("/getChannels/req.params.id..." + req.params.id);

    var pChannel = dbservice.getChannels(db, req.params.id); //'rubychannel'
    pChannel.then(
        (val) => {
            //console.log("getChannels in appjs ....: "+ val);
            res.send(val);
        },
        (err) => {
            console.log('oh no!', err);
        }
    );

});

app.get('/getMessages', function (req, res) {
    //console.log("/getMessages/req.params.id..." + req.params.id);

    var pChannel = dbservice.getMessages(db, req.params.id); //'rubychannel'
    pChannel.then(
        (val) => {
           // console.log("getMessages in appjs ....: "+ val);
            res.send(val);
        },
        (err) => {
            console.log('oh no!', err);
        }
    );

});


app.listen(3000, function () {
     console.log('Example app listening on port 3000!');
});



//db.close();





//  // function(err, jsonString) {}
// function getFollowersJSON(userId, callBack) {
//     var query = "SELECT USERID, FOLLOWERID FROM FOLLOWER "
//          + "  WHERE USERID = '" + userId + "'";
//     var followers = [];
//     db.serialize(function() {
//         db.each(
//             query, 
//             function(err, row) {
//                 followers.push(row.FOLLOWERID);
//             },
//             function (err) {
//                 callBack(err, JSON.stringify(followers)); //JSON.stringify(followers)
//             }
//         );
//     });
// }

// getFollowersJSON('abu', function (err, jsonString) {
//       if (err) {

//       }
//       console.log("jsonString" + jsonString);
// });

// function getFollowerTweetsJSON(userId, callBack) {
	      
//     var query = "SELECT USERID, TWEET, DATE FROM TWEET "
//             + "  WHERE USERID = (" 
//             + "    SELECT FOLLOWERID from FOLLOWER "	    		  
//             + "      WHERE USERID = '" + userId + "')" ;       
//     var followersTweet = [];
//     db.serialize(function() {
//         db.each(
//             query, 
//             function(err, row) {
//                 followersTweet.push(row);
//                 //followersTweet.push(row.TWEET);
//                 //followersTweet.push(row.DATE);
//             },
//             function (err) {
//                 callBack(err, JSON.stringify(followersTweet)); //JSON.stringify(followers)
//             }
//         );
//     });
// }

// function getUserTweetsJSON(userId) {
//     // TODO
// }

// function getUserJSON(userId) {
//     // TODO
// }


// app.get('/views/*', function (req, res) {
//     //res.send('Hello World!');
// });
//app.use("/views", express.static('views'));

// app.get('/*', function (req, res) {
//     //res.send('Hello World!');
// });
//app.use("", express.static(''));
//app.use('/static', express.static(__dirname + '/public'));


// app.get('/getFollowerTweets/:id/', function (req, res) {
//     console.log("/getFollowerTweets..." + req.params.id);

//     getFollowerTweetsJSON(req.params.id, function (err, jsonString) {
//         if (err) {
//             console.log("Error...", err);
//         }
//         console.log("Fllowers Tweet : " + jsonString);
//         res.send(jsonString);
        
//     });


// });