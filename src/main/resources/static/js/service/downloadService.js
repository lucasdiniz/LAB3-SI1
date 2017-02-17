/**
 * Created by lucasdiniz on 16/02/17.
 */

angular.module('myApp')
    .service('downloadService', [function () {

        var self = this;

        self.formatJson = function (todo) {
            var formattedData = "Titulo: ";
            formattedData += todo.title + "\n";
            formattedData += "Prioridade: " + todo.priority + "\n";
            formattedData += "Descricao:\n\t" + todo.description + "\n";
            formattedData += "Sub-tarefas:\n";

            todo.tasks.forEach(function(task) {
                formattedData += "\t*" + task.name + "   ";
                if(task.done) formattedData += "Feita\n";
                else formattedData += "Nao feita\n";
            });

            formattedData += "tags:\n";

            todo.tags.forEach(function (tag) {
                formattedData += "\t*" + tag + "\n";
            });

            return formattedData;
        };

        return {

            download: function (filename, data) {
                data = self.formatJson(data);
                var blob = new Blob([data], {type: 'text/plain'});
                if(window.navigator.msSaveOrOpenBlob) {
                    window.navigator.msSaveBlob(blob, filename);
                }
                else{
                    var elem = window.document.createElement('a');
                    elem.href = window.URL.createObjectURL(blob);
                    elem.download = filename;
                    document.body.appendChild(elem);
                    elem.click();
                    document.body.removeChild(elem);
                }
            }


        }


    }]);