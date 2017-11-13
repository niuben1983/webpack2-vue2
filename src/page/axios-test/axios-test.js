"use strict";

import Vue from 'vue';
import Promise from 'promise-polyfill';
window.Promise = Promise;
import App from './app';

new Vue({
    el: '#app',
    components: { App }
})