(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*******************************
* Add Dog Form Controller
*
********************************/

module.exports = function(app){

  app.controller('AddDogFormController'['$scope','DawgInService',function($scope,DawgInService){

  }])
}

},{}],2:[function(require,module,exports){
/*******************************
* Dog In Controller
*
********************************/

module.exports = function(app){

  app.controller('DawgInController'['$scope','DawgInService',function($scope,DawgInService){
    
  }])
}

},{}],3:[function(require,module,exports){
/*******************************
* Feed Controller
*
********************************/

module.exports = function(app) {

  app.controller('FeedController', ['$scope', 'DogService', function($scope, DogService){

    /*******************************
    * get dog data from service
    ********************************/
    $scope.dawgz = DogService.getDawgz();


    $scope.deets = function () {
      //1. grab dog details
      //2. redirect to detail view

    }

  }])
}

},{}],4:[function(require,module,exports){
/*******************************
* Nav Controller
*
********************************/

module.exports = function(app) {

  app.controller('NavController', ['$scope', function($scope){

    /*******************************
    * menu collapse
    ********************************/


    $scope.isCollapsed = false;


  }])
}

},{}],5:[function(require,module,exports){
'use strict';

/*******************************
* UpDawwg App
* Date: 7-7-2016
********************************/

(function () {

  var app = angular.module('UpDawwgApp', ['ngRoute', 'ngAnimate']);

  //router
  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'dogIn.html',
      conroller: 'DawgInController'
    }).when('/feed', {
      templateUrl: 'feed.html',
      controller: 'FeedController'
    }).when('/details', {
      templateUrl: '',
      controller: ''
    }).when('/add-dog-form', {
      templateUrl: 'add-dog-form.html',
      controller: 'AddDogFormController'
    }).when('/logout', {
      templateUrl: 'dogIn.html',
      controller: 'DawgInController'
    }).when('/about', {
      templateUrl: 'about.html'
    }).otherwise({
      redirectTo: '/404'
    });
  }]);

  // Services
  require('./services/dog-service')(app);

  // Controllers
  require('./controllers/feed-controller')(app);
  require('./controllers/nav-controller')(app);
  require('./controllers/dawgIn-controller')(app);
  require('./controllers/add-dog-form-controller');app;

  // Filters

  // Directives
})();
},{"./controllers/add-dog-form-controller":1,"./controllers/dawgIn-controller":2,"./controllers/feed-controller":3,"./controllers/nav-controller":4,"./services/dog-service":6}],6:[function(require,module,exports){
/*******************************
* Dog Service
*
********************************/

module.exports = function(app) {

  app.factory('DogService', function($http) {

      let dawgz = [];

      let dog = {
        name: '',
        image: '',
        breed:'',
        age: '',
        description: '',
        ups: '',
      };



      /*******************************
      * return object
      ********************************/
      return {
        getDawgz() {
          return dawgz;
        },

        getDog(name) {
          //filter: find dog by name

        },

        setDog() {


        },

      } //********************************//

  })//end DogService**********************//

  app.factory('DawgInService',function($http){

    let pawthentication = {
      name: '',
      password:'',
    }
  });

}

},{}]},{},[5])