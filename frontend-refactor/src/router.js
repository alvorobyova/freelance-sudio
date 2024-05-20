import {Dashboard} from "./components/dashboard";
import {Login} from "./components/auth/login";
import {Signup} from "./components/auth/signup";
import {Logout} from "./components/auth/logout";
import {FreelancersList} from "./components/freelancers/freelancers-list";
import {FileUtils} from "./utils/file-utils";
import {FreelancersView} from "./components/freelancers/freelancers-view";
import {FreelancersCreate} from "./components/freelancers/freelancers-create";
import {FreelancersEdit} from "./components/freelancers/freelancers-edit";
import {FreelancersDelete} from "./components/freelancers/freelancers-delete";
import {OrdersList} from "./components/orders/orders-list";
import {OrdersView} from "./components/orders/orders-view";
import {OrdersCreate} from "./components/orders/orders-create";
import {OrdersEdit} from "./components/orders/orders-edit";
import {OrdersDelete} from "./components/orders/orders-delete";
import {AuthUtils} from "./utils/auth-utils";

export class Router {
  constructor() {
    this.titlePageElement = document.getElementById('title');
    this.contentPageElement = document.getElementById('content');
    this.adminLteStyleElement = document.getElementById('adminlte_style');
    this.userName = null;


    this.initEvents();
    this.routes = [
      {
        route: '/',
        title: 'Дашборд',
        filePathTemplate: '/templates/pages/dashboard.html',
        useLayout: '/templates/layout.html',
        load: () => {
          new Dashboard(this.openNewRoute.bind(this));
        },
        styles: ['fullcalendar.css'],
        scripts: ['moment.min.js', 'fullcalendar.js', 'fullcalendar-locale-ru.js']
      },
      {
        route: '/404',
        title: 'Страница не найдена',
        filePathTemplate: '/templates/pages/404.html',
        useLayout: false,
      },
      {
        route: '/login',
        title: 'Авторизация',
        filePathTemplate: '/templates/pages/auth/login.html',
        useLayout: false,
        load: () => {
          document.body.classList.add('login-page');
          document.body.style.height = '100vh';
          new Login(this.openNewRoute.bind(this));
        },
        unload: () => {
          document.body.classList.remove('login-page');
          document.body.style.height = 'auto';
        },
        styles: ['icheck-bootstrap.min.css']
      },
      {
        route: '/signup',
        title: 'Регистрация',
        filePathTemplate: '/templates/pages/auth/signup.html',
        useLayout: false,
        load: () => {
          document.body.classList.add('register-page');
          document.body.style.height = '100vh';
          new Signup(this.openNewRoute.bind(this));
        },
        unload: () => {
          document.body.classList.remove('register-page');
          document.body.style.height = 'auto';
        },
        styles: ['icheck-bootstrap.min.css']
      },
      {
        route: '/logout',
        load: () => {
          new Logout(this.openNewRoute.bind(this));
        },
      },
      {
        route: '/freelancers',
        title: 'Фрилансеры',
        filePathTemplate: '/templates/pages/freelancers/list.html',
        useLayout: '/templates/layout.html',
        load: () => {
          new FreelancersList(this.openNewRoute.bind(this));
        },
        styles: ['dataTables.bootstrap4.min.css'],
        scripts: ['jquery.dataTables.min.js', 'dataTables.bootstrap4.min.js']

      },
      {
        route: '/freelancers/view',
        title: 'Просмотр фрилансера',
        filePathTemplate: '/templates/pages/freelancers/view.html',
        useLayout: '/templates/layout.html',
        load: () => {
          new FreelancersView(this.openNewRoute.bind(this));
        },
      },
      {
        route: '/freelancers/create',
        title: 'Создание фрилансера',
        filePathTemplate: '/templates/pages/freelancers/create.html',
        useLayout: '/templates/layout.html',
        load: () => {
          new FreelancersCreate(this.openNewRoute.bind(this));
        },
        scripts: ['bs-custom-file-input.min.js']

      },
      {
        route: '/freelancers/edit',
        title: 'Редактирование фрилансера',
        filePathTemplate: '/templates/pages/freelancers/edit.html',
        useLayout: '/templates/layout.html',
        load: () => {
          new FreelancersEdit(this.openNewRoute.bind(this));
        },
        scripts: ['bs-custom-file-input.min.js']

      },
      {
        route: '/freelancers/delete',
        load: () => {
          new FreelancersDelete(this.openNewRoute.bind(this));
        },
      },
      {
        route: '/orders',
        title: 'Список заказов',
        filePathTemplate: '/templates/pages/orders/list.html',
        useLayout: '/templates/layout.html',
        load: () => {
          new OrdersList(this.openNewRoute.bind(this));
        },
        styles: ['dataTables.bootstrap4.min.css'],
        scripts: ['jquery.dataTables.min.js', 'dataTables.bootstrap4.min.js']
      },
      {
        route: '/orders/view',
        title: 'Детали заказа',
        filePathTemplate: '/templates/pages/orders/view.html',
        useLayout: '/templates/layout.html',
        load: () => {
          new OrdersView(this.openNewRoute.bind(this));
        },
      },
      {
        route: '/orders/create',
        title: 'Создание заказа',
        filePathTemplate: '/templates/pages/orders/create.html',
        useLayout: '/templates/layout.html',
        load: () => {
          new OrdersCreate(this.openNewRoute.bind(this));
        },
        styles: ['tempusdominus-bootstrap-4.min.css', 'select2.min.css', 'select2-bootstrap4.min.css'],
        scripts: ['moment.min.js', 'ru.js', 'tempusdominus-bootstrap-4.min.js', 'select2.full.min.js']

      },
      {
        route: '/orders/edit',
        title: 'Редактирование заказа',
        filePathTemplate: '/templates/pages/orders/edit.html',
        useLayout: '/templates/layout.html',
        load: () => {
          new OrdersEdit(this.openNewRoute.bind(this));
        },
        styles: ['tempusdominus-bootstrap-4.min.css', 'select2.min.css', 'select2-bootstrap4.min.css'],
        scripts: ['moment.min.js', 'ru.js', 'tempusdominus-bootstrap-4.min.js', 'select2.full.min.js']

      },
      {
        route: '/orders/delete',
        load: () => {
          new OrdersDelete(this.openNewRoute.bind(this));
        },
      },
    ]
  }

  initEvents() {
    window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this)); // функция сработает, когда весь контент будет загружен (когда
    // пользователь перезагрузил страницу либо только запустил приложение)
    // bind нужен для того, чтобы использовался контекст класса Router, иначе будет привязан контекст именного этого события

    window.addEventListener('popstate', this.activateRoute.bind(this)); // вызывается эта функция, когда поменялся url

    // событие по клику на любой элемент
    document.addEventListener('click', this.clickHandler.bind(this));
  }

  async openNewRoute(url) {
    const currentRoute = window.location.pathname;
    history.pushState({}, '', url); // передаем url адрес
    await this.activateRoute(null, currentRoute);
  }

  async clickHandler(event) {

    let element = null;
    if (event.target.nodeName === 'A') {
      element = event.target;
    } else if (event.target.parentNode.nodeName === 'A') {
      element = event.target.parentNode;
    }

    if (element) {
      event.preventDefault();

      const currentRoute = window.location.pathname;

      const url = element.href.replace(window.location.origin, ''); // заменяем в url то, что идет до /, в нашем случае : http://localhost:9000/

      if (!url || (currentRoute === url.replace('#', '')) || url === '#' || url.startsWith('javascript:void(0)')) {
        return;
      }
      await this.openNewRoute(url);
    }
  }

  // активация страницы
  async activateRoute(event, oldRoute = null) {
    if (oldRoute) {
      const currentRoute = this.routes.find(item => item.route === oldRoute); // здесь получаем старый роут, с которого уходим
      // console.log(currentRoute);

      if (currentRoute.styles && currentRoute.styles.length > 0) {
        currentRoute.styles.forEach(style => {
          document.querySelector(`link[href='/css/${style}']`).remove(); // удаляем стили
        });
      }

      if (currentRoute.scripts && currentRoute.scripts.length > 0) {
        currentRoute.scripts.forEach(script => {
          document.querySelector(`script[src='/js/${script}']`).remove(); // удаляем стили
        });
      }

      if (currentRoute.unload && typeof currentRoute.unload === 'function') {
        currentRoute.unload();
      }
    }

    const urlRoute = window.location.pathname;
    const newRoute = this.routes.find(item => item.route === urlRoute); // определяем, на какой странице находимся

    if (newRoute) {
      if (newRoute.styles && newRoute.styles.length > 0) {
        newRoute.styles.forEach(style => {
          FileUtils.loadPageStyle('/css/' + style, this.adminLteStyleElement)
        })
      }

      if (newRoute.scripts && newRoute.scripts.length > 0) {
        for (const script of newRoute.scripts) {
          await FileUtils.loadPageScript('/js/' + script);
        }
      }

      if (newRoute.title) {
        this.titlePageElement.innerText = 'Freelance Studio | ' + newRoute.title;
      }

      if (newRoute.filePathTemplate) {
        let contentBlock = this.contentPageElement;

        if (newRoute.useLayout) {
          this.contentPageElement.innerHTML = await fetch(newRoute.useLayout).then(response => response.text());
          contentBlock = document.getElementById('content-layout');

          document.body.classList.add('sidebar-mini');
          document.body.classList.add('layout-fixed');

          this.profileNameElement = document.getElementById('profile-name');
          if (!this.userName) {
            let userInfo = AuthUtils.getAuthInfo(AuthUtils.userInfoKey);

            if (userInfo) {
              userInfo = JSON.parse(userInfo);
              if (userInfo.name) {
                this.userName = userInfo.name;
              }
            }
          }
          this.profileNameElement.innerText = this.userName;


          this.activateMenuItem(newRoute);
        } else {
          document.body.classList.remove('sidebar-mini');
          document.body.classList.remove('layout-fixed');
        }
        contentBlock.innerHTML = await fetch(newRoute.filePathTemplate).then(response => response.text());
      }

      if (newRoute.load && typeof newRoute.load === 'function') {
        newRoute.load();
      }
    } else {
      console.log('No route found');
      history.pushState({}, '', '/404'); // передаем url адрес
      // window.location = '/404'; // не можем использовать этот вариант, так как будет происходить полная перезагрузка приложения, что нам не нужно
      await this.activateRoute();
    }
  }

  activateMenuItem(route) {
    document.querySelectorAll('.sidebar .nav-link').forEach(item => {
      const href = item.getAttribute('href');
      if ((route.route.includes(href) && href !== '/') || (route.route === '/' && href === '/')) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    })

  }
}