/**
 * Created by lucasdiniz on 17/01/17.
 */
var app = angular.module('myApp', ['ngMaterial', 'ngMdIcons', 'serverService', 'todoFactory', 'modalService']);

app.controller('indexController', ['$scope', '$http', '$rootScope', 'dbInterface', '_todoFactory',
    function($scope, $http, $rootScope, dbInterface, _todoFactory) {

    var self = this;

    $scope.hideSearchBar = true;
    $scope.hideAddTodoBar = true;

    $scope.todos = [];

    $scope.populate = function () {

        $scope.todos = [];

        dbInterface.getAll().then(function (_data) {
            for (var i = 0; i < _data.data.length; i++) {
                var newTodo = _todoFactory.create(JSON.parse(_data.data[i].data), _data.data[i].id);
                $scope.todos.push(newTodo);
            }
        });

    };

    $scope.removeTodo = function (todo) {
        var index = $scope.todos.indexOf(todo);
        var id = $scope.todos[index].id;

        dbInterface.removeTodo(id).then(function () {
            $scope.todos.splice(index, 1);
        });

    };

    $scope.toggleSearchBar = function () {
        $scope.hideAddTodoBar = true;
        $scope.hideSearchBar = !$scope.hideSearchBar;
    };

    $scope.toggleAddTodoBar = function () {
        $scope.hideSearchBar = true;
        $scope.hideAddTodoBar = !$scope.hideAddTodoBar;
    };


    $scope.addTodo = function(name){
        var defaultTodo = _todoFactory.getDefault(name);

        dbInterface.create(defaultTodo).then(function (data) {
            var newTodo = _todoFactory.create(JSON.parse(data.data.data), data.data.id);
            $scope.todos.push(newTodo);
            $scope.toggleAddTodoBar();
            self.clearInput();

            console.log(JSON.stringify(newTodo) + " CREATED");
        });
    };


    self.clearInput = function () {
        $scope.newTodo = "";
    };


    self.clear = function (array) {
        while(array.length > 0){
            array.pop();
        }
    };

}]).config(function($mdThemingProvider) {
    $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
    $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
    $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
    $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
});