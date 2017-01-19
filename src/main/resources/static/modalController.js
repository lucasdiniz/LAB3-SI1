/**
 * Created by lucasdiniz on 18/01/17.
 */


app.controller('modalController', function ($scope, $mdDialog, $rootScope) {


    $scope.showPrompt = function(ev, todo) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
            .title('Defina o novo título')
            .placeholder('Digite o título...')
            .ariaLabel('')
            .initialValue('TODO List')
            .targetEvent(ev)
            .ok('Confirmar')
            .cancel('Cancelar');

        $mdDialog.show(confirm).then(function(result) {
            todo.title = result;
        }, function() {
            // $scope.status = 'O título não foi alterado';
        });
    };

    $scope.addTodoModal = function(ev, todo) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
            .title('Defina a nova Task')
            .placeholder('Lavar o carro...')
            .ariaLabel('')
            .initialValue('New Todo')
            .targetEvent(ev)
            .ok('Confirmar')
            .cancel('Cancelar');

        $mdDialog.show(confirm).then(function(result) {
            $rootScope.$broadcast("AddTask", {
                _taskName: result,
                _todo: todo
            });
        }, function() {
            // $scope.status = 'O título não foi alterado';
        });
    };


});
