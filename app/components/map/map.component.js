import template from './map.html';
import controller from './map.controller';

let mapComponent = {
    bindings: {},
    template,
    controller: ['$rootScope', '$interval', '$timeout', controller],
    controllerAs: '$ctrl'
};

export default mapComponent;