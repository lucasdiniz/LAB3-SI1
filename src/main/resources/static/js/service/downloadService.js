/**
 * Created by lucasdiniz on 16/02/17.
 */

angular.module('myApp')
    .service('downloadService', [function () {

        var self = this;

        self.formatJson = function (data) {
            return data;
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