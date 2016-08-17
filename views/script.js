// create the module and name it slackCloneApp
	var slackCloneApp = angular.module('slackCloneApp', ['ngRoute']);

	// configure our routes
	slackCloneApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
			.when('/', {
				templateUrl : './channels.html',
				controller  : 'mainController'
			})

			// route for the about page
			.when('/channels', {
				templateUrl : './channels.html',
				controller  : 'channelsController'
			})
			// route for the contact page
			.when('/:channelId', {
				templateUrl : './messages.html',
				controller  : 'messagesController'
			});
	});

    slackCloneApp.factory('dataservice', function($http){

        function getChannelData(callback){
          $http({
            method: 'GET',
            url: 'http://localhost:3000/getChannels/javachannel/',
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


        return {
            listchannels: getChannelData,
            listMessages: getMessagelData,

            findMessages: function(channelId, callback){
                console.log("channel id : " + channelId);
                getMessagelData(function(data) {
                    var messages = data.filter(function(entry){
                    return entry.CHANNELID === channelId;
                    });
                    callback(messages);
                });
            }
        };
        
    });

    // create the controller and inject Angular's $scope
	slackCloneApp.controller('mainController', function($scope, dataservice) {
        dataservice.listchannels(function(channels) {
          $scope.channels = channels;
          //console.log("Channels Inside channelsController : " + channels);
        });
	});

	slackCloneApp.controller('channelsController', function($scope, dataservice) { //, categories

        dataservice.listchannels(function(channels) {
          $scope.channels = channels;
          //console.log("Channels Inside channelsController : " + channels);
        });

	});
    /*
	slackCloneApp.controller('messagesController', function($scope, dataservice) {

        dataservice.listMessages(function(messages) {
          $scope.messages = messages;
          //console.log("Channels Inside channelsController : " + channels);
        });
	});
    */

	slackCloneApp.controller('messagesController', function($scope, $routeParams, dataservice) {
        dataservice.findMessages($routeParams.channelId, function(messages) {
          $scope.messages = messages;
          console.log("Messages Inside messagesController : " + messages);
        });
	});
