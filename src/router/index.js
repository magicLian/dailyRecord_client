import Vue from 'vue';
import Router from 'vue-router';
import MainPage from '@/components/main';
import SearchFood from '@/components/main/searchFood';
import Home from '@/components/main/home';
import login from '@/components/login';
import periodHelper from '@/components/main/periodHelper';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [{
		path : '/',
		redirect: '/login',
	},{
		path : '/login',
		component: login,
	},{
		path : '/index',
		redirect: '/index/home',
		name: 'mainPage',
		component: MainPage,
		children:[{
			path: '/index/home',
			name:'Home',
			component:Home,
		},{
			path: '/index/project/periodHelper',
			name:'periodHelper',
			component:periodHelper,
		},{
			path: '/index/project/searchFood',
			name:'searchFood',
			component:SearchFood
		},{
			path: '/index/project/todolist',
			name:'todolist',
			component:SearchFood
		}]
	}]
})
