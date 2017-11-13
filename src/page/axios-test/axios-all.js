"use strict";

import Vue from 'vue';
import Promise from 'promise-polyfill';
window.Promise = Promise;
import App from './app-all';

new Vue({
    el: '#app_all',
    components: { App }
})