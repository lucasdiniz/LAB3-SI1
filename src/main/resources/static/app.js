/**
 * Created by lucasdiniz on 17/01/17.
 */
var app = angular.module('myApp', ['ngMaterial', 'ngMdIcons']);

app.controller('indexController', function($scope, $http){

    var self = this;

    $scope.hideSearchBar = true;
    $scope.hideAddTodoBar = true;

    $scope.todos = [];

    $scope.populate = function () {
        $http({
            method: 'GET',
            url: '/todos/all'
        }).then(function (_data) {
            
            if(_data.data.length != 0) {
                todos = _data;
            }

            console.log("foi! " + JSON.stringify(_data));
        });
    };

    $scope.removeTodo = function (todo) {
        var index = $scope.todos.indexOf(todo);
        $scope.todos.splice(index, 1);

        $rootScope.$broadcast("saveAll", {
            _todo: todo
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

        $scope.todos.push(new self.todoObj(name));
        $scope.hideAddTodoBar = true;
        self.clearInput();
        $rootScope.$broadcast("saveAll", {
            _todos: todos
        });

    };


    self.clearInput = function () {
        $scope.newTodo = "";
    };


    self.todoObj = function (name) {
        this.title = "TODO List " + $scope.todos.length;
        this.tasks = [new self.taskObj(name)];
    };

    self.taskObj = function (name) {
        this.name = name;
        this.done = false;
    };

    self.clear = function (array) {
        while(array.length > 0){
            array.pop();
        }
    };

}).config(function($mdThemingProvider) {
    $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
    $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
    $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
    $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
});