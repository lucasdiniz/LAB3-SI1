/**
 * Created by lucasdiniz on 18/01/17.
 */


angular.module('myApp')
    .service('modalService', ['$rootScope', '$mdDialog', function ($rootScope, $mdDialog) {

        return {

            changeTitleModal : function(ev) {
                // var promise = $mdDialog.show({
                //     templateUrl: '/modalTemplates/contactModal.tmpl.html',
                //     parent: angular.element(document.body),
                //     targetEvent: ev,
                //     clickOutsideToClose:true
                // });
                // return promise;
                var confirm = $mdDialog.prompt()
                    .title('Defina o Título')
                    .placeholder('Lista de tarefas...')
                    .ariaLabel('title')
                    .targetEvent(ev)
                    .ok('Confirmar')
                    .cancel('Cancelar');

                var promise = $mdDialog.show(confirm);
                return promise;
             },


            addTaskModal : function(ev) {
                var confirm = $mdDialog.prompt()
                    .title('Defina a nova sub-tarefa')
                    .placeholder('Lavar o carro')
                    .ariaLabel('task')
                    .targetEvent(ev)
                    .ok('Confirmar')
                    .cancel('Cancelar');

                var promise = $mdDialog.show(confirm);
                return promise;
            },

            showContactInfoModal : function (ev) {
                var promise = $mdDialog.show({
                    templateUrl: '/modalTemplates/contactModal.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                });
                return promise;
            }
        }

}]);
