import template from './navbar2.html';
import controller from './navbar2.controller';

let navbar2Component = {
    bindings: {},
    template,
    controller: ['$rootScope', '$interval', controller],
    controllerAs: '$ctrl'
};

export default navbar2Component;