/**
 * Created by lucasdiniz on 17/01/17.
 */
var app = angular.module('myApp', ['ngMaterial']);

app.controller('indexController', function($scope){

    var self = this;

    $scope.todos = [];

    $scope.addTodo = function(todo){

        $scope.todos.push(new self.todoObj(todo));
        self.clearInput();
    };

    self.clearInput = function () {
        $scope.newTodo = "";
    };


    self.todoObj = function (todo) {
        this.done = false;
        this.name = todo;
    };

    self.clear = function (array) {
        while(array.length > 0){
            array.pop();
        }
    };

    self.chunk = function() {
        var numCols = 3;
        var cont = 0;
        var newArr = [];
        var aux = [];
        for (var i=0; i < $scope.todos.length; i+=1) {

            aux.push($scope.todos);
            cont += 1;

            if(cont === 3 || i === $scope.todos.length - 1){
                newArr.push(aux);
                self.clear(aux);
                cont = 0;
            }

        }
        console.log(newArr);
        return newArr;
    }

    $scope.getChunkedData = function() {
        return self.chunk();
    };



}).config(function($mdThemingProvider) {
    $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
    $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
    $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
    $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
});