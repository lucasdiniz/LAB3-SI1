/**
 * Created by lucasdiniz on 18/01/17.
 */

app.controller('todoController', ['$scope', '$rootScope', '$http', 'dbInterface', 'todoFactory',
    function($scope, $rootScope, $http, dbInterface, todoFactory){

    var self = this;

    self.taskObj = function (name) {
        this.name = name;
        this.done = false;
    };


    $scope.allChecked = function(todo) {
        var allDone = true;

        if(todo.tasks.length == 0){
           return todo.done;
        }

        todo.tasks.forEach(function (task) {
           if(!task.done) allDone = false;
        });

        return allDone;
    };

    $scope.isChecked = function (task) {
        return task.done;
    };

    $scope.removeTask = function (todo, task) {
        var index = todo.tasks.indexOf(task);
        todo.tasks.splice(index, 1);

        dbInterface.update(todo).then(function (data) {
            todo = todoFactory.create(data);
        });
    };


    $scope.toggle = function (todo, task) {
        task.done = !task.done;
        dbInterface.update(todo).then(function (data) {
            todo = todoFactory.create(data);
        });
    };
    
    $scope.isIndeterminated = function (todo) {
        var doneTasks = self.howManyDone(todo);
        if(doneTasks === 0) return false;
        return todo.tasks.length !== doneTasks;
    };

    $scope.toggleAll = function (todo) {

        if(todo.tasks.length == 0){
            todo.done = !todo.done;

        } else {

            var newValue = true;

            if ($scope.allChecked(todo)) newValue = false;
            else newValue = true;

            todo.tasks.forEach(function (task) {
                task.done = newValue;
            });
        }

        dbInterface.update(todo).then(function (data) {
            todo = todoFactory.create(data);
        });
    };



    $scope.percentageDone = function (todo) {

        if(todo.tasks.length == 0){
            if(todo.done) return 100.00;
            else return 0.00;
        }

        var done = self.howManyDone(todo);
        if(todo.tasks.length === 0) return 100;
        var result = (done * 100)/todo.tasks.length;
        return result.toFixed(2);

    };

    self.howManyDone = function(todo) {
        var count = 0;
        todo.tasks.forEach(function (task) {
           if(task.done) count += 1;
        });
        return count;
    };




}]);