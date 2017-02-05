/**
 * Created by lucasdiniz on 18/01/17.
 */


angular.module('modalService', ['ngMaterial', 'ngMdIcons'])
    .service('_modalService', ['$rootScope', '$mdDialog', function ($rootScope, $mdDialog) {

        return {

            changeTitleModal : function(ev) {
                var promise = $mdDialog.show({
                    templateUrl: '/modalTemplates/noteModal.tmpl.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true
                });
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

}])
    .controller('modalController', ['$scope', function ($scope) {



    }]);
