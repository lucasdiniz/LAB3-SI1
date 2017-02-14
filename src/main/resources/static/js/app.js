/**
 * Created by lucasdiniz on 17/01/17.
 */
var app = angular.module('myApp', ['ngMaterial', 'ngMdIcons']);

app.controller('indexController', ['$scope', '$http', '$rootScope', 'dbInterface', 'todoFactory', 'searchService', 'modalService',
    function($scope, $http, $rootScope, dbInterface, todoFactory, searchService, modalService) {

    var self = this;

    $scope.hideSearchBar = true;
    $scope.hideAddTodoBar = true;
    $scope.hideNavMenu = false;
    $scope.itensPerPage = 2;

    $scope.todos = [];


    $rootScope.$on("filter", function (ev, data) {
        $scope.filter();
    });

    $rootScope.$on("resetFilter", function (ev, data) {
        $scope.populate();
    });


    $scope.filter = function () {

        $scope.todos = [];

        dbInterface.getAll().then(function (data) {
            $scope.todos = todoFactory.createFromArray(data);
            $scope.todos = searchService.filter($scope.todos);
            $scope.changeTodosToPage(0);
        });

    };

    $scope.checkAll = function () {

        $scope.todos.forEach(function (todo) {

            if(todo.tasks.length == 0) todo.done = true;

            todo.tasks.forEach(function (task) {
               task.done = true;
            });

            dbInterface.update(todo).then(function (data) {
                var newTodo = todoFactory.create(data);
                todo = newTodo;
            });

        });
    };

    $scope.calcHowManyDone = function () {
        var count = 0;
        $scope.todos.forEach(function (todo) {
            var done = true;
            if(todo.tasks.length == 0 && !todo.done) done = false;
           todo.tasks.forEach(function (task) {
               if(!task.done) done = false;
           });
            if(done) count++;
        });
        return count;
    };

    $scope.getNumberOfTodos = function () {
        return $scope.todos.length;
    };

    $scope.deleteAll = function () {

        dbInterface.removeAll().then(function () {
            $scope.todos = [];
            $scope.numberOfTodos = 0;
        });

    };

    $scope.populate = function () {

        $scope.todos = [];

        dbInterface.getAll().then(function (data) {
            $scope.todos = todoFactory.createFromArray(data);
            $scope.changeTodosToPage(0);
        });

    };

    $scope.removeTodo = function (todo) {
        var index = $scope.todos.indexOf(todo);
        var id = $scope.todos[index].id;

        dbInterface.removeTodo(id).then(function () {
            $scope.todos.splice(index, 1);
        });

    };


    $scope.addTodo = function(event){

        modalService.changeTitleModal(event).then(function (name) {

            var defaultTodo = todoFactory.getDefault(name);

            dbInterface.create(defaultTodo).then(function (data) {
                var newTodo = todoFactory.create(data);
                $scope.todos.push(newTodo);
            });

        }).catch(function (error) {

        });
    };

    $scope.togglePaginationMenu = function () {
        $scope.hideNavMenu = !$scope.hideNavMenu;
    };

    $scope.isPaginationMenuHidden = function () {
        return $scope.hideNavMenu;
    };


    $scope.getPageNumbers = function () {
        var numbers = [];

        for(var i = 0 ; i < $scope.todos.length ; i += $scope.itensPerPage){
            numbers.push(i/$scope.itensPerPage);
        }

        return numbers;
    };

    $scope.changeTodosToPage = function (page) {
        for(var i = 0 ; i < page * $scope.itensPerPage ; i++){
            $scope.todos[i].hidden = false;
        }

        for(var i = page * $scope.itensPerPage ; i < $scope.todos.length; i++){
            $scope.todos[i].hidden = true;
        }
    };

    $scope.isHidden = function (todo) {
        return todo.hidden;
    };

    $scope.showContactInfoModal = function (ev) {
        modalService.showContactInfoModal(ev).then(function () {
            
        });
    };

    $scope.saveInDataBase = function (todo) {

        dbInterface.update(todo).then(function (data) {
            var newTodo = todoFactory.create(data);
            todo = newTodo;
        });

    };


}]).config(function($mdThemingProvider) {
    $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
    $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
    $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
    $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
});