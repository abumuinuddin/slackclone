var sqlite3 = require('sqlite3').verbose();
var filename = 'slackcloneTest.db';
var dbexists = false;
try {
    fs.accessSync(filename);
    dbexists = true;
} catch (ex) {
    dbexists = false;
}

var db = new sqlite3.Database('slackclone.db');

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
        
        //" TEAMUSERID        CHAR(25)    PRIMARY KEY  NOT NULL," + 
        var createTeamUserTableSql = "CREATE TABLE IF NOT EXISTS TEAMUSER " +
                    "(" +
                    " TEAMID            CHAR(25)                 NOT NULL," +
                    " USERID            CHAR(25)                 NOT NULL" +
                    ")"; 

        var createChannelTableSql = "CREATE TABLE IF NOT EXISTS CHANNEL " +
                    "(" +
                    " CHANNELID         CHAR(25)    PRIMARY KEY  NOT NULL," + 
                    " TEAMID            CHAR(25)                 NOT NULL," +
                    " TYPE              CHAR(25)                 NOT NULL" +
                    ")"; ;

        var createMessagesTableSql = "CREATE TABLE IF NOT EXISTS MESSAGE " +
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
                   "('syl',     'Sylvesta Harvey',  'sylpassword',       'syl@yahoo.com',         '870-654-0245')," +
                   "('kelvin',  'Kelvin Angulo',    'kelvinpassword',    'kelvin@yahoo.com',      '310-892-0245')," +
                   "('zak',     'zak ocasio',       'zakpassword',       'zak@yahoo.com',         '310-892-0245')," +
                   "('mark',    'Mark Agusti',      'markpassword',      'mark@yahoo.com',        '323-302-0245')," +
                   "('swarup',  'Swarup Khatri',    'swarup',            'swarup@yahoo.com',      '718-645-0765');"; 

        var insertTeamSql = "INSERT INTO TEAM (TEAMID, NAME) "      +
           "VALUES ('ssa4Java',     'SSA 4 Week Java Team'),"       +
                  "('ssa4nodejs',   'SSA 4 Week Node js Team'),"    +
                  "('ssa4ruby',     'SSA 4 Week Ruby Team'),"       +
                  "('ssa4python',   'SSA 4 Week Python Team');";


        var insertTeamUserSql = "INSERT INTO TEAMUSER (TEAMID, USERID) " +
           "VALUES ('ssa4Java',      'abu'),"     +
                  "('ssa4Java',     'swarup'),"  +
                  "('ssa4nodejs',   'charles')," +
                  "('ssa4nodejs',   'shuvo'), "  + 
                  "('ssa4ruby',     'beiying')," +
                  "('ssa4ruby',     'mark'),"    +
                  "('ssa4ruby',     'syl');" ;
        
        var insertChannelSql =  "INSERT INTO CHANNEL (CHANNELID, TEAMID, TYPE) " +
                "VALUES ('javachannel',     'ssa4Java',     'public'),"     +
                        "('nodejschannel',  'ssa4nodejs',   'public'),"     +
                        "('rubychannel',    'ssa4ruby',     'public'),"     +
                        "('pythonchannel',  'ssa4python',   'public');" ;

        var insertMessageSql = "INSERT INTO MESSAGE (MESSAGEID, USERID, CHANNELID, CONTENT, DATE) " +
             "VALUES ('1',      'shuvo',      'javachannel',        'Welcome to Tweeter Clone',                     '2016-08-05 12:45:00'), " +
                    "('2',      'abu',        'javachannel',        'Tweet by Abu',                                 '2016-08-05 12:46:00'), " +
                    "('3',      'abu',        'javachannel',        'Lets do Node.js',                              '2016-08-08 12:46:00'), " +
                    "('4',      'abu',        'javachannel',        'Lunch Time!',                                  '2016-08-08 12:30:00'), " +
                    "('5',      'abu',        'javachannel',        'We are in 2-nd week of boot camp training!',   '2016-08-08 08:30:00'), " +
                    "('6',      'shuvo',      'nodejschannel',      'SQLite is easy configuration!',                '2016-08-05 09:30:00'), " +
                    "('7',      'shuvo',      'nodejschannel',      'Rio Olympic!',                                 '2016-08-05 09:30:00'), " +
                    "('8',      'shuvo',      'nodejschannel',      'Welcome to 2nd week of boot camp...',          '2016-08-08 08:30:00'), " +
                    "('9',      'charles',    'pythonchannel',      'SQLite is cool!',                              '2016-08-05 11:30:00'), " +
                    "('10',     'charles',    'pythonchannel',      'Not bad for a Mainframe developer...',         '2016-08-08 09:30:00'), " +
                    "('11',     'charles',    'pythonchannel',      'Having fun with HTML / CSS!',                  '2016-08-05 11:30:00'), " +
                    "('12',     'charles',    'pythonchannel',      'Github!',                                      '2016-08-05 11:30:00'), " +
                    "('13',     'beiying',    'rubychannel',        'Twitter - Cloned!',                            '2016-08-08 13:30:00'), " +
                    "('14',     'mark',       'rubychannel',        'I love Ruby its the best language ever',        '2016-08-05 11:30:00'); ";


        db.run(insertUserSql);
        db.run(insertTeamSql);
        db.run(insertTeamUserSql);
        db.run(insertChannelSql);
        db.run(insertMessageSql);

        db.each("SELECT * FROM USER WHERE USERID='abu'", function(err, row) {

            console.log("USER : " + JSON.stringify(row));
            //console.log(row.USERID + ": " + row.TWEET);
        });
        db.each("SELECT * FROM TEAM WHERE TEAMID='ssa4Java'", function(err, row) {
            console.log("TEAM : " + JSON.stringify(row));
            //console.log(row.USERID + ": " + row.TWEET);
        });
        db.each("SELECT * FROM TEAMUSER WHERE TEAMID='ssa4Java'", function(err, row) {
            console.log("TEAMUSER : " + JSON.stringify(row));
            //console.log(row.USERID + ": " + row.TWEET);
        });
        db.each("SELECT * FROM CHANNEL WHERE CHANNELID='javachannel'", function(err, row) {
            console.log("CHANNEL : " + JSON.stringify(row));
            //console.log(row.USERID + ": " + row.TWEET);
        });

        db.each("SELECT * FROM MESSAGE WHERE CHANNELID='javachannel'", function(err, row) {
            console.log("MESSAGE : " + JSON.stringify(row));
            //console.log(row.USERID + ": " + row.TWEET);
        });
        
    });
}
