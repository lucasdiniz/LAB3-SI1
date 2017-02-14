/**
 * Created by lucasdiniz on 02/02/17.
 */

angular.module('myApp')
    .factory('todoFactory', function() {

        var todoModel = function (title, tasks, uniqueId, tags, priority, description, done, hidden) {
            this.title = title;
            this.tasks = tasks;
            this.id = uniqueId;
            this.tags = tags;
            this.priority = priority; //Alta, baixa ou normal
            this.description = description;
            this.done = done;
            this.hidden = hidden;
        };

        var taskModel = function (name) {
            this.name = name;
            this.done = false;
        };

        var convert = function (data) {
            return JSON.parse(data.data.data)
        };

        var getIdFromData = function (data) {
          return data.data.id;
        };

        var extractJson = function (data) {
            var json = JSON.parse(data.data);
            var id = data.id;
            return new todoModel(json.title, json.tasks, id, json.tags, json.priority, json.description, json.done);
        };


        return {

            create : function (data) {
                var todoObject = convert(data);
                var uniqueId = getIdFromData(data);
                var newTodo = new todoModel(todoObject.title, todoObject.tasks, uniqueId, todoObject.tags, todoObject.priority, todoObject.description, todoObject.done, todoObject.hidden);
                return newTodo;
            },

            getDefault : function (name) {
                var newTodo = new todoModel(name, [], 0, [], "", "", false, true);
                return newTodo;
            },

            createFromArray : function (data) {
                var todos = [];
                for (var i = 0; i < data.data.length; i++) {
                    var newTodo = extractJson(data.data[i]);
                    todos.push(newTodo);
                }
                return todos;
            }

        }
    });

