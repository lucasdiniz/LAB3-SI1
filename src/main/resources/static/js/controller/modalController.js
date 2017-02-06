/**
 * Created by lucasdiniz on 05/02/17.
 */

angular.module('myApp')
    .controller('modalController', ['$scope', '$mdDialog','modalService', 'dbInterface', 'todoFactory',
        function ($scope, $mdDialog, modalService, dbInterface, todoFactory) {

        $scope.newTitle = "";

        $scope.close = function () {
            $mdDialog.hide();
        };

        $scope.submit = function () {
            $mdDialog.hide($scope.newTitle);
        };

        $scope.changeTitleModal = function(ev, todo) {

            modalService.changeTitleModal(ev).then(function (_data) {
                todo.title = _data;
                dbInterface.update(todo).then(function (data) {
                    todo = todoFactory.create(data);
                })
            }).catch(function (reason) {

            });

        };

        $scope.addTaskModal = function (ev, todo) {
            modalService.addTaskModal(ev).then(function (data) {

                todo.tasks.push({name: data, done: false});

                dbInterface.update(todo).then(function (_data) {
                    todo = todoFactory.create(_data);
                })
            }).catch(function (reason) {

            });
        };


    }]);