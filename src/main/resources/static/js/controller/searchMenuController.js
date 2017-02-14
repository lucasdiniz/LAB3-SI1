/**
 * Created by lucasdiniz on 06/02/17.
 */

angular.module("myApp")
    .controller("searchMenuController", ["$scope", "$rootScope", "$mdSidenav", "$log", "searchService", function($scope, $rootScope, $mdSidenav, $log, searchService) {

        var sendFilterSignal = function () {
            $rootScope.$broadcast("filter", {});
        };

        var sendResetFilterSignal = function () {
            $rootScope.$broadcast("resetFilter", {});
        };

        $scope.canShowTagSearchBar = false;
        $scope.canShowResult = false;
        $scope.filteredTodos = [];
        $scope.toggleSearchMenu = buildToggler("searchMenu");

        $scope.close = function () {
            $mdSidenav('searchMenu').close().then(function () {

            });
        };

        $scope.searchBy = function(attribute, expectedValue){
            searchService.addSearchCriteria(attribute, expectedValue);
            sendFilterSignal();
            $scope.close();
        };

        $scope.showSearchResult = function (criteria) {

            if (criteria == "searchByTag") {
                $scope.canShowTagSearchBar = true;
            } else {
                $scope.canShowTagSearchBar = false;
                $scope.searchBy("priority", criteria);
            }

        };

        $scope.showSearchIcon = function () {
            return searchService.hasAnyFilters();
        };

        $scope.clearSearchCriteria = function () {
            searchService.clearSearchCriteria();
            sendResetFilterSignal();
        };


        $scope.isSearchMenuOpen = function() {
            return $mdSidenav('searchMenu').isOpen();
        };


        function buildToggler(navID) {
            return function() {
                $mdSidenav(navID).toggle().then(function () {

                });
            }
        }


    }]);