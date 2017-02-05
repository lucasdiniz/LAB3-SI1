/**
 * Created by lucasdiniz on 18/01/17.
 */

app.controller('todoController', ['$scope', '$rootScope', '$http', 'dbInterface', '_todoFactory', '_modalService',
    function($scope, $rootScope, $http, dbInterface, _todoFactory, _modalService){

    var self = this;

    self.taskObj = function (name) {
        this.name = name;
        this.done = false;
    };


    $scope.allChecked = function(todo) {
        var allDone = true;
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
            todo = _todoFactory.create(JSON.parse(data.data.data), todo.id);
        });
    };


    $scope.toggle = function (todo, task) {
        task.done = !task.done;
        dbInterface.update(todo).then(function (data) {
            todo = _todoFactory.create(JSON.parse(data.data.data), todo.id);
        });
    };
    
    $scope.isIndeterminated = function (todo) {
        var doneTasks = self.howManyDone(todo);
        if(doneTasks === 0) return false;
        return todo.tasks.length !== doneTasks;
    };

    $scope.toggleAll = function (todo) {

        var newValue = true;

        if($scope.allChecked(todo)) newValue = false;
        else newValue = true;

        todo.tasks.forEach(function (task) {
           task.done = newValue;
        });

        dbInterface.update(todo).then(function (data) {
            todo = _todoFactory.create(JSON.parse(data.data.data), todo.id);
        });
    };

    $scope.changeTitleModal = function(ev, todo) {

        _modalService.changeTitleModal(ev).then(function (_data) {
            todo.title = _data;
            dbInterface.update(todo).then(function (data) {
                todo = _todoFactory.create(JSON.parse(data.data.data), todo.id);
            })
        });

    };

    $scope.addTaskModal = function (ev, todo) {
        console.log(JSON.stringify(todo));
        _modalService.addTaskModal(ev).then(function (data) {
            todo.tasks.push({name: data, done: false});
            dbInterface.update(todo).then(function (data) {
                todo = _todoFactory.create(JSON.parse(data.data.data), todo.id);
            })
        });
    };


    $scope.percentageDone = function (todo) {
        var done = self.howManyDone(todo);
        if(todo.tasks.length === 0) return 100;
        return (done * 100)/todo.tasks.length;

    };

    self.howManyDone = function(todo) {
        var count = 0;
        todo.tasks.forEach(function (task) {
           if(task.done) count += 1;
        });
        return count;
    };




}]);