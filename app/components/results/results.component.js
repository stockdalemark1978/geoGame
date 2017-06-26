import template from './results.html';
import controller from './results.controller';

let resultsComponent = {
    bindings: {},
    template,
    controller: ['$rootScope', '$interval', '$timeout', controller],
    controllerAs: '$ctrl'
};

export default resultsComponent;