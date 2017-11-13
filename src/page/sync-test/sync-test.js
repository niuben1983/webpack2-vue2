"use strict";

import Vue from 'vue';
import App from './app';
import '../../css/base.css';
import '../../css/index.css';
import '../../components/index/time-line.css';
import '../../components/index/end.css';
import '../../components/index/share.css';

new Vue({
    el: '#app',
    components: { App }
})