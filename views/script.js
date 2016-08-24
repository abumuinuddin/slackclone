    //document.location.reload(2,true);
    // create the module and name it slackCloneApp
	var slackCloneApp = angular.module('slackCloneApp', ['ngRoute', 'ngStorage']);
    //var slackCloneApp = angular.module('slackCloneApp', ['ngStorage']);
	// configure our routes
	slackCloneApp.config(function($routeProvider) {
		$routeProvider

			// route for the home page
            .when ('/', {
				templateUrl : './logon.html',
				controller  : 'logonController'
            })
			.when('/messages/:channelid/:channelname', {
				templateUrl : './home.html',
				controller  : 'mainController'
			}).when('/logout', {
				templateUrl : './logon.html',
				controller  : 'logoutController'
            }).
            otherwise({
                redirect: '/'
            });

	});

    slackCloneApp.factory('dataservice', function($http){

        function getChannelsByUserId(user, channelid, callback) {
            $http({
                method: 'POST',
                url: '/getChannelsByUserId',
                data:user,
                cache: true, // - you can cache the response
            }).then(callback, function(res){
                //Error handler
                console.log("Error getChannelsByUserId (): ", res);
            });

        }

        function getPrivateChannelsByUserId (user, callback) {
            $http({
                method: 'POST',
                url: '/getPrivateChannelsByUserId',
                data:user,
                cache: true, // - you can cache the response
            }).then(callback, function(res){
                //Error handler
                console.log("Error getPrivateChannelsByUserId (): ", res);
            });

        }

        function getMessagelData(callback){
          $http({
            method: 'GET',
            url: '/getMessages',
            cache: false
          }).success(callback); //deprecated
        }
        
        function getUser(user,  callback){


          $http({
            method: 'POST',
            url: '/getUser',
            data:user
            //cache: true - you can cache the response
          }).then(callback, function(res){
              //Error handler
              console.log("Error retrieving responses ... res :: ", res);
          });
        }

        function insertMessage(message, callback){
          $http({
            method: 'POST',
            url: '/insertMessage',
            data: message
          }).success(callback);
        }

        return {
            //listchannels: getChannelData,
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
            getUser: getUser,
            getChannelsByUserId: getChannelsByUserId,
            getPrivateChannelsByUserId: getPrivateChannelsByUserId
            
        };
        
    });

    // create the controller and inject Angular's $scope
	slackCloneApp.controller('mainController', function($scope, dataservice, $routeParams, $sessionStorage, $location, $filter, $interval) {
  
        var userData;
        var cachedMessages = [];
        var channelid;
        var channelname;
        $scope.today = new Date();
        
        $scope.user = $sessionStorage.user;

        $scope.logoutModule = function() {
            
            //console.log( " $sessionStorage.user ", $sessionStorage.user);
            $sessionStorage.user= null;
            cachedMessages=null;
            channelid=null;
            
            //console.log( " $sessionStorage.user ", $sessionStorage.user);
            $location.url("/"); // + /$sessionStorage.user.id);
            return;
        }

        if ($sessionStorage.user!==undefined ){
            userData = {"userid": $sessionStorage.user.id};
        }

        // channel id
        // messages

        //console.log("JSON.stringify(userData) .." + JSON.stringify(userData));

        if ($routeParams.channelid!==undefined && $routeParams.channelid!==0) {
            channelid = $routeParams.channelid;
            $scope.channelname=$routeParams.channelname;
        }
        //console.log('$routeParams.channelid : ' + $routeParams.channelid);
        /*
        dataservice.getChannelsByUserId(userData, channelid, function(response) {
            $scope.channels = response.data; // server send data property in the response object for a promise .. then
            //console.log('getChannelsByUserId() channelid : ' + channelid);
            if (channelid == 0) {
                channelid = response.data[0].id;
            }
            dataservice.findMessages(channelid, function(messages) {
                //console.log('channelid : ' + channelid);
                $scope.messages = messages;
                cachedMessages=messages;
            });
            //console.log( "callback channel id: ", response.data[0].id);
        });
        */

        function getUserChannels(userData, channelid) {
           dataservice.getChannelsByUserId(userData, channelid, function(response) {
                $scope.channels = response.data; // server send data property in the response object for a promise .. then
                console.log('getChannelsByUserId() channelid : ' + channelid);
                if (channelid == 0) {
                    channelid = response.data[0].id;
                    $scope.channelname=response.data[0].channelname;
                }
                dataservice.findMessages(channelid, function(messages) {
                    console.log('channelid : ' + channelid);
                    $scope.messages = messages;
                    cachedMessages=messages;
                });
                //console.log( "callback channel id: ", response.data[0].id);
            });

            dataservice.getPrivateChannelsByUserId (userData, function(response) {
                //console.log( "getPrivateChannelsByUserId ...response: ", JSON.stringify(response));
                $scope.pChannels=response.data;
            });

        }
        
        getUserChannels(userData, channelid);

        var timer = $interval(function(){
            getUserChannels(userData, channelid);
        },5000);

       $scope.$on('destroy', function (event) {
            $interval.cancel(timer);
        });

        dataservice.listMessages(function(messages) {
          //console.log('list messages');
          $scope.messages = messages;
        });

       
        //console.log("channelid : " + channelid);

        // given user id, we can get a default channel id

        $scope.showAddError = false;
        $scope.enteredMessage = '';
        $scope.addName = function() {
            //console.log("input message -", $scope.enteredMessage);

            if ($scope.enteredMessage.trim() === "") {
                 $scope.showAddError = true;
                return;
            }
            $scope.showAddError = false;

            //message = {"message":$scope.enteredMessage,"userid":$sessionStorage.user.id,"channelid":channelid,"date": new Date()};
            message = {"message":$scope.enteredMessage,"userid":$sessionStorage.user.id,"channelid":channelid,"date": $filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ss.sssZ')};

            dataservice.insertMessage(message, function(val, err){
                if (err){
                    console.log("err", err);
                }
                if(val) {
                    //console.log("Inserted values..", val );
                    cachedMessages.push(val);
                }
            })
            $scope.messages = cachedMessages;
            //console.log("Messages..:.", JSON.stringify($scope.messages));

        };
  
	});

	slackCloneApp.controller('logonController', function($scope, dataservice, $location, $sessionStorage) { //, categories, , $sessionStorage, $sessionStorage

        $scope.loginModule = function() {
            
            var user = {"username":$scope.username,"password":$scope.password};

            dataservice.getUser(user, function(response) {
 
                $scope.user = response.data; // server send data property in the response object for a promise .. 
                //console.log( " dataservice.getUser(user, function(user): ", JSON.stringify(response.data));
                if (response.data==="0"){
                    $location.url("/")
                    return;
                }
                //console.log( " dataservice.getUser(user, function(user): ", JSON.stringify(response.data));
                $sessionStorage.user= response.data;
                
                $location.url("/messages/0/none"); // + /$sessionStorage.user.id);

            });
        }
	});

/*
	slackCloneApp.controller('logoutController', function($scope, dataservice, $location, $sessionStorage) { //, categories, , $sessionStorage, $sessionStorage

        $scope.logoutModule = function() {
            
            console.log( " $sessionStorage.user ", $sessionStorage.user);
            $sessionStorage.user= null;
            console.log( " $sessionStorage.user ", $sessionStorage.user);
            $location.url("/"); // + /$sessionStorage.user.id);
        }
	});

	slackCloneApp.controller('messagesController', function($scope, $routeParams, dataservice) {
        dataservice.findMessages($routeParams.channelname, function(messages) {
          $scope.messages = messages;
          console.log("Messages Inside messagesController : " + messages);
        });
	});
*/