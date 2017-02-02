/**
 * Created by lucasdiniz on 18/01/17.
 */


angular.module('modalService', [])
    .service('_modalService', ['$rootScope', '$mdDialog', function ($rootScope, $mdDialog) {

        return {

            changeTitleModal : function(ev) {
                var confirm = $mdDialog.prompt()
                    .title('Defina o novo título')
                    .placeholder('Digite o título...')
                    .ariaLabel('')
                    .initialValue('TODO List')
                    .targetEvent(ev)
                    .ok('Confirmar')
                    .cancel('Cancelar');

                var promise = $mdDialog.show(confirm);
                return promise;
             },

            addTaskModal : function(ev) {
                var confirm = $mdDialog.prompt()
                    .title('Defina a nova Task')
                    .placeholder('Lavar o carro...')
                    .ariaLabel('')
                    .initialValue('New Todo')
                    .targetEvent(ev)
                    .ok('Confirmar')
                    .cancel('Cancelar');

                var promise = $mdDialog.show(confirm);
                return promise;
            },
        }

}]);
