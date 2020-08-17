/**
 * @file vueInit.js
 */

import Vue from 'vue';
import TestComponents from './components/test';

/**
 * TestComponentsの呼び出し
 */
const vm = new Vue({
  components: { TestComponents },
  template: '<TestComponents/>'
});

if (document.getElementById('js-vue-test')) {
  vm.$mount('#js-vue-test');
}
