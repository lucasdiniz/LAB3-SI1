/**
 * Created by lucasdiniz on 01/02/17.
 */

angular.module('myApp')
    .service('dbInterface',['$http', function($http) {
      return {

          getAll : function () {

              var promise = $http({
                  method: 'GET',
                  url: '/todos/all'
              });

              return promise;
          },


          removeTodo : function (id) {
              var promise = $http({
                  method: 'DELETE',
                  url: '/todos/remove/' + id,
              });
              return promise;
          },

          removeAll : function () {
              var promise = $http({
                  method: 'DELETE',
                  url: '/todos/remove/'
              });
              return promise;
          },

          create : function (todo) {
              var promise = $http({
                  method: 'POST',
                  url: '/todos/save/',
                  data: JSON.stringify(todo)

              });

              return promise;
          },

          update : function(todo) {
              var promise = $http({
                  method: 'PATCH',
                  url: 'todos/save/' + todo.id,
                  data: JSON.stringify(todo)
              });
              return promise;
          }

      }
}]);

