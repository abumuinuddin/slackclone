// create the module and name it slackCloneApp
	var slackCloneApp = angular.module('slackCloneApp', ['ngRoute']);

	// configure our routes
	slackCloneApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
            .when ('/', {
				templateUrl : './logon.html',
				controller  : 'logonController'
            })
			.when('/messages/:channelid', {
				templateUrl : './home.html',
				controller  : 'mainController'
			}).otherwise({
                redirect: './logon.html'
            });

	});

    slackCloneApp.factory('dataservice', function($http){

        function getChannelData(callback){
          $http({
            method: 'GET',
            url: 'http://localhost:3000/getChannels/slackChannel/',
            cache: true
          }).success(callback);
        }

        function getMessagelData(callback){
          $http({
            method: 'GET',
            url: 'http://localhost:3000/getMessages',
            cache: true
          }).success(callback);
        }
        
        function findUser(data, callback){
          $http({
            method: 'GET',
            url: 'http://localhost:3000/findUser',
            cache: true
          }).success(callback);
        }

        function insertMessage(message, callback){
          $http({
            method: 'POST',
            url: '/insertMessage',
            data: message
          }).success(callback);
        }

        return {
            listchannels: getChannelData,
            listMessages: getMessagelData,
            findMessages: function(channelid, callback){
                //console.log("channel id : " + channelid);
                getMessagelData(function(data) {
                    var messages = data.filter(function(entry){
                    return parseInt(entry.channelid) === parseInt(channelid);
                    });
                    callback(messages);
                });
            },
            insertMessage: insertMessage,
            findUser: findUser
            
        };
        
    });

    // create the controller and inject Angular's $scope
	slackCloneApp.controller('mainController', function($scope, dataservice, $routeParams) {
  
        //console.log("Get Path...", $location.search().channel);
        //console.log("$routeParams.channelid...", $routeParams.channelid)
        var cachedMessages = [];
        dataservice.listchannels(function(channels) {
          $scope.channels = channels;
          //console.log("function(channels)...", JSON.stringify(channels));
        });
        
        dataservice.listMessages(function(messages) {
          $scope.messages = messages;
          //console.log("Channels Inside channelsController : " + channels);
          //console.log("function(messages)...");
        });

        dataservice.findMessages($routeParams.channelid, function(messages) {
            //console.log("function(messages)...begin ..", $routeParams.channelid);
            $scope.messages = messages;
            cachedMessages=messages;
            console.log( "dataservice.findMessages ...", JSON.stringify(messages));
        });

        $scope.showAddError = false;
        $scope.enteredMessage = '';
        $scope.addName = function() {
            console.log("input message -", $scope.enteredMessage);

            if ($scope.enteredMessage.trim() === "") {
                 $scope.showAddError = true;
                return;
            }
            $scope.showAddError = false;
            
            message = {"message":$scope.enteredMessage,"userid":6,"channelid":1,"date": new Date()};

            dataservice.insertMessage(message, function(val, err){
                //console.log("dataservice.createMessage .. :", +$scope.enteredMessage + ":" + new Date());
                if (err){
                    console.log("err", err);
                }
                if(val) {
                    console.log("Inserted values..", val );
                    cachedMessages.push(val);
                }
            })

            //message = {"id":2,"message":"Mocha testing....","userid":3,"channelid":2,"date":"2016-08-05 12:46:00"};
            
            //$scope.messages.push(cachedMessages);
            $scope.messages = cachedMessages;
            console.log("Messages..:.", JSON.stringify($scope.messages));

        };

        /*
        $scope.getMessagesByChannelId=function(channelId){
            console.log("function(messages)...");
            dataservice.findMessages(channelId, function(messages) {
                $scope.messages = messages;
                //console.log("Messages Inside messagesController : " + messages);
                console.log("...Inner function(messages)...");
            });
        }*/
  
	});

	slackCloneApp.controller('logonController', function($scope, dataservice, $location) { //, categories

        $scope.loginModule = function() {
            console.log("userid : " + $scope.username, ":password:" + $scope.password);
            $location.url("/messages/2");
            //console.log("hello I am in the logon controller ...");
        }
	});

    /*
	slackCloneApp.controller('channelsController', function($scope, dataservice) { //, categories

        dataservice.listchannels(function(channels) {
          $scope.channels = channels;
        });

	});*/

    /*
	slackCloneApp.controller('messagesController', function($scope, dataservice) {

        dataservice.listMessages(function(messages) {
          $scope.messages = messages;
          //console.log("Channels Inside channelsController : " + channels);
        });
	});
    */

	slackCloneApp.controller('messagesController', function($scope, $routeParams, dataservice) {
        dataservice.findMessages($routeParams.channelname, function(messages) {
          $scope.messages = messages;
          console.log("Messages Inside messagesController : " + messages);
        });
	});
