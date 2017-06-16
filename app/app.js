// 'use strict'
import appComponent from './app.component';
import navbarComponent from './components/navbar/navbar.component';
import navbar2Component from './components/navbar2/navbar2.component';
import mapComponent from './components/map/map.component';
import resultsComponent from './components/results/results.component';

angular.module('app', [])
.component('app', appComponent)
.component('navbar', navbarComponent)
.component('navbar2', navbar2Component)
.component('map', mapComponent)
.component('results', resultsComponent)
