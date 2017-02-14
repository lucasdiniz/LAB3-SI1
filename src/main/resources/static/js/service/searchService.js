/**
 * Created by lucasdiniz on 06/02/17.
 */

angular.module("myApp")
    .service("searchService", [function () {

        var self = this;

        self.filteredTodos = [];
        self.searchCriteria = {};

        self.check = function (real, expected) {
            if(Array.isArray(real)){
                return real.indexOf(expected) != -1;
            } //else eh uma string
            return real == expected;
        };

        return {

            filter : function (todos) {
                self.filteredTodos = todos.filter(function (todo) {

                    var result = true;

                    for(attribute in self.searchCriteria){

                        if(self.searchCriteria.hasOwnProperty(attribute)) {
                            var expectedValue = self.searchCriteria[attribute];

                            if (todo.hasOwnProperty(attribute)) {
                                result = self.check(todo[attribute], expectedValue);
                            }
                        }
                    }
                    return result;
                });

                return self.filteredTodos;
            },

            addSearchCriteria : function (attribute, expectedValue) {
                self.searchCriteria[attribute] = expectedValue;
            },

            hasAnyFilters : function () {
                return $.isEmptyObject(self.searchCriteria);
            },

            clearSearchCriteria : function () {
                self.searchCriteria = {};
            }

        }

    }]);