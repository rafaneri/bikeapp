angular
    .module('woole')
    .factory('MessageService', [function() {
        return {
            error: {
                title: 'Ops...',
                addressNotFound: 'Endereço de {0} não encontrado',
                addressManyResults: 'O endereço {0} retornou muitos resultados, refine a busca'
            },
            concatMessage: function(err, args) {
                args.forEach(function(element, index) {
                    err = err.replace('{' + index + '}', element);
                });
                return err;
            }
        }
    }]);