/**
 * Created by lucasdiniz on 02/02/17.
 */

angular.module('todoFactory', [])
    .factory('_todoFactory', function() {

        var todoModel = function (title, tasks, uniqueId) {
            this.title = title;
            this.tasks = tasks;
            this.id = uniqueId;
        };

        var taskModel = function (name) {
            this.name = name;
            this.done = false;
        };


        return {

            create : function (todoObject, uniqueId) {
                var newTodo = new todoModel(todoObject.title, todoObject.tasks, uniqueId);
                return newTodo;
            },

            getDefault : function (name) {
                var newTodo = new todoModel(name, [], 0);
                return newTodo;
            },

        }
    });

