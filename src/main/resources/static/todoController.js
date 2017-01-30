/**
 * Created by lucasdiniz on 18/01/17.
 */

app.controller('todoController', function($scope, $rootScope, $http){

    var self = this;

    self.taskObj = function (name) {
        this.name = name;
        this.done = false;
    };

    $scope.save = function(todo) {

        $http({
            method: 'POST',
            url: '/todos/save',
            data: todo
        }).then(function (data) {
            console.log("foi!");
        });

    };

    $scope.saveAll = function(todos) {

        $http({
            method: 'POST',
            url: '/todos/saveAll',
            data: todos
        }).then(function (data) {
            console.log("foi!");
        });

    };

    $rootScope.$on("saveAll", function (event, data) {
        $scope.saveAll(data._todos);
    });


    $rootScope.$on("save", function (event, data) {
        $scope.save(data._todo);
    });
    

    $rootScope.$on("AddTask", function (event, data) {
        data._todo.tasks.push(new self.taskObj(data._taskName));
        console.log('new task added to ' + data._todo.title);
        $scope.save(data._todo);
    });

    $scope.allChecked = function(todo) {
        var allDone = true;
        todo.tasks.forEach(function (task) {
           if(!task.done) allDone = false;
        });

        $scope.save(todo);
        return allDone;
    };

    $scope.isChecked = function (task) {
        return task.done;
    };

    $scope.removeTask = function (todo, task) {
        var index = todo.tasks.indexOf(task);
        todo.tasks.splice(index, 1);
        $scope.save(todo);
    };


    $scope.toggle = function (task) {
        task.done = !task.done;
        $scope.save(todo);
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

        $scope.save(todo);
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




});//.config(function($mdThemingProvider) {
//     $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
//     $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
//     $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
//     $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
// });