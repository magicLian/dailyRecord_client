import Vue from 'vue';
import Router from 'vue-router';
import MainPage from '@/components/main';
import SearchFood from '@/components/main/searchFood';
import Home from '@/components/main/home';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/index'
		},
		{
			path : '/index',
			redirect: '/index/home',
			name: 'mainPage',
			component: MainPage,
				children:[
				{
					path: '/index/project/searchFood',
					name:'SearchFood',
					component:SearchFood
				},
				{
					path: '/index/home',
					name:'Home',
					component:Home,
				}]
		}
	]
})
