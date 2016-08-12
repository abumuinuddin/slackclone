var sqlite3 = require('sqlite3').verbose();
var filename = 'slackcloneTest.db';
var dbexists = false;
try {
    fs.accessSync(filename);
    dbexists = true;
} catch (ex) {
    dbexists = false;
}

var db = new sqlite3.Database('slackcloneTest.db');

if (!dbexists) {
    db.serialize(function() {

        var createUserTableSql = "CREATE TABLE IF NOT EXISTS USER " +
                       "(USERID         CHAR(25)    PRIMARY KEY     NOT NULL," +
                       "NAME            CHAR(50)                    NOT NULL," + 
                       "PASSWORD        CHAR(50)                    NOT NULL," + 
                       "EMAIL           CHAR(50)                    NOT NULL," +
                       "PHONE           CHAR(50)                    NOT NULL" + 
                       ")"; 

        var createTeamTableSql = "CREATE TABLE IF NOT EXISTS TEAM " +
                    "(TEAMID            CHAR(25)    PRIMARY KEY  NOT NULL," +
                    " NAME              CHAR(140)                NOT NULL" + 
                    ")"; 

        var createTeamUserTableSql = "CREATE TABLE IF NOT EXISTS TEAMUSER " +
                    "(TEAMUSERID        CHAR(25)    PRIMARY KEY  NOT NULL," + 
                    " TEAMID            CHAR(25)                 NOT NULL," +
                    " USERID            CHAR(25)                 NOT NULL" +
                    ")"; 

        var createChannelTableSql = "CREATE TABLE IF NOT EXISTS CHANNEL " +
                    "(" +
                    " CHANNELID         CHAR(25)    PRIMARY KEY  NOT NULL," + 
                    " TEAMID            CHAR(25)                 NOT NULL," +
                    " TYPE              CHAR(25)                 NOT NULL" +
                    ")"; ;

        var createMessagesTableSql = "CREATE TABLE IF NOT EXISTS FOLLOWER " +
                    "(MESSAGEID         CHAR(25)    PRIMARY KEY     NOT NULL," +
                    "USERID             CHAR(25)                    NOT NULL," +
                    "CHANNELID          CHAR(25)                    NOT NULL," +
                    "CONTENT            CHAR(140)                   NOT NULL," +
                    "DATE               TEXT                        NOT NULL)"; 

        db.run(createUserTableSql);
        db.run(createTeamTableSql);
        db.run(createTeamUserTableSql);
        db.run(createChannelTableSql);
        db.run(createMessagesTableSql);

        var insertUserSql = "INSERT INTO USER (USERID, NAME, PASSWORD, EMAIL, PHONE) " +
            "VALUES ('shuvo',   'Shuvo Ahmed',      'shuvopassword',     'shuvo@yahoo.com',       '410-253-7965')," +
                   "('abu',     'Abu Muinuddin',    'abupassword',       'abu@yahoo.com',         '703-854-6753')," +
                   "('charles', 'Charles Walsek',   'charlespassword',   'charles@yahoo.com',     '347-234-3456')," +
                   "('beiying', 'Beiying Chen',     'beiyingpassword',   'beiying@yahoo.com',     '610-345-7890')," +
                   "('syl',     'Sylvesta Harvey',  'sylpassword',      'syl@yahoo.com',         '870-225-0245')," +
                   "('swarup',  'Swarup Khatri',    'swarup',            'swarup@yahoo.com',      '718-890-0765');"; 

        var insertTeamSql = "INSERT INTO TEAM (TEAMID, NAME) " +
           "VALUES ('ssa4Java', 'SSA 4 Week Java Team')," +
                  "('ssa4nodejs', 'SSA 4 Week Node js Team')," +
                  "('ssa4ruby', 'SSA 4 Week Ruby Team')," +
                  "('ssa4python', 'SSA 4 Week Python Team');";


        var insertTeamUserSql = "INSERT INTO TEAM (TEAMUSERID, TEAMID, USERID) " +
           "VALUES ('ssa4Java', 'abu')," +
                  "('ssa4Java', 'swarup')," +
                  "('ssa4nodejs', 'charles')," +
                  "('ssa4nodejs', 'shuvo');";
        
        /*                
        var insertTweetSql = "INSERT INTO TWEET (USERID, TWEET, DATE) " +
             "VALUES ('shuvo',      'Welcome to Tweeter Clone',                     '2016-08-05 12:45:00'), " +
                    "('abu',        'Tweet by Abu',                                 '2016-08-05 12:46:00'), " +
                    "('abu',        'Lets do Node.js',                              '2016-08-08 12:46:00'), " +
                    "('abu',        'Lunch Time!',                                  '2016-08-08 12:30:00'), " +
                    "('abu',        'We are in 2-nd week of boot camp training!',   '2016-08-08 08:30:00'), " +
                    "('shuvo',      'SQLite is easy configuration!',                '2016-08-05 09:30:00'), " +
                    "('shuvo',      'Rio Olympic!',                                 '2016-08-05 09:30:00'), " +
                    "('shuvo',      'Welcome to 2nd week of boot camp...',          '2016-08-08 08:30:00'), " +
                    "('charles',    'SQLite is cool!',                              '2016-08-05 11:30:00'), " +
                    "('charles',    'Not bad for a Mainframe developer...',         '2016-08-08 09:30:00'), " +
                    "('charles',    'Having fun with HTML / CSS!',                  '2016-08-05 11:30:00'), " +
                    "('charles',    'Github!',                                      '2016-08-05 11:30:00'), " +
                    "('beiying',    'Twitter - Cloned!',                            '2016-08-08 13:30:00'), " +
                    "('swarup',     'Tweet, tweet!',                                '2016-08-05 11:30:00'), " +
                    "('shuvo',      'First week of boot camp complete!',            '2016-08-05 16:47:00');"; 
        */

        //db.run(insertUserSql);
        //db.run(insertFollowerSql);
        //db.run(insertTweetSql);

        db.each("SELECT * FROM USER WHERE USERID='abu'", function(err, row) {
            console.log(JSON.stringify(row));
            //console.log(row.USERID + ": " + row.TWEET);
        });
    });
}
