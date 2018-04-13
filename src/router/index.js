import Vue from 'vue';
import Router from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import MainPage from '@/components//Main';

Vue.use(Router);
Vue.use(ElementUI);

export default new Router({
	routes: [{
		path: '/',
		name: 'mainPage',
		component: MainPage
	}]
})
