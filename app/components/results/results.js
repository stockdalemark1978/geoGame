// 'use strict'

import resultsComponent from './results.component';

let resultsModule = angular.module('results', [])
.component('results', resultsComponent);

export default resultsModule;