import Vue from 'vue';
import Router from 'vue-router';
import MainPage from '@/components/main';
import SearchFood from '@/components/main/searchFood';
import Home from '@/components/main/home';
import PrivatePhoto from '@/components/main/privatePhoto';
import login from '@/components/login';

Vue.use(Router);

export default new Router({
	routes: [{
		path : '/login',
		component: login,
	},{
		path : '/index',
		redirect: '/index/home',
		name: 'mainPage',
		component: MainPage,
		children:[{
			path: '/index/project/searchFood',
			name:'SearchFood',
			component:SearchFood
		},{
			path: '/index/home',
			name:'Home',
			component:Home,
		},{
			path: '/index/project/privatePhotos',
			name:'PrivatePhoto',
			component:PrivatePhoto
		}]
	}]
})
