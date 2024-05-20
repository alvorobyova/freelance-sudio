import {HttpUtils} from "../../utils/http-utils";
import {config} from "../../config/config";
import {CommonUtils} from "../../utils/common-utils";

export class OrdersView {
  constructor(openNewRoute) {
    this.openNewRoute = openNewRoute;

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if(!id) {
      return this.openNewRoute('/');
    }

    document.getElementById('edit-link').href = '/orders/edit?id=' + id;
    document.getElementById('delete-link').href = '/orders/delete?id=' + id;

    this.getOrder(id).then();
  }

  async getOrder(id) {
    const result = await HttpUtils.request('/orders/' + id);

    if (result.redirect) {
      return this.openNewRoute(result.redirect);
    }

    if (result.error || !result.response || (result.response && result.response.error)) {
      console.log(result.response.message);
      return alert('Возникла ошибка при запросе данных о заказе. Обратитесь в поддержку');
    }

    this.showOrder(result.response);
  }

  showOrder(order) {
    const statusInfo = CommonUtils.getOrderStatus(order.status);

    document.getElementById('order-status').classList.add('bg-'+ statusInfo.color);
    document.getElementById('order-status-icon').classList.add('fa-'+ statusInfo.icon);
    document.getElementById('order-status-value').innerText = statusInfo.value.toUpperCase();

    if(order.scheduledDate) {
      const date = new Date(order.scheduledDate);
      document.getElementById('scheduledDate').innerText = date.toLocaleDateString('ru-RU');
    }

    document.getElementById('completeDate').innerText = order.completeDate ? (new Date(order.completeDate)).toLocaleDateString('ru-RU') : 'Не задано';

    if(order.deadlineDate) {
      const date = new Date(order.deadlineDate);
      document.getElementById('deadlineDate').innerText = date.toLocaleDateString('ru-RU');
    }

    document.getElementById('order-number').innerText = order.number;
    document.getElementById('description').innerText = order.description;
    document.getElementById('owner').innerText = order.owner.name + ' ' + order.owner.lastName;
    document.getElementById('amount').innerText = order.amount;
    document.getElementById('created').innerText = order.createdAt ? (new Date(order.createdAt)).toLocaleString('ru-RU') : '';

    // данные о фрилансере

    if(order.freelancer.avatar) {
      document.getElementById('freelancer-avatar').src = config.host + order.freelancer.avatar;
    }
    document.getElementById('freelancer-name').innerHTML = '<a href="/freelancers/view?id=' + order.freelancer.id + '">' + order.freelancer.name + ' ' + order.freelancer.lastName + '</a>';

  }
}