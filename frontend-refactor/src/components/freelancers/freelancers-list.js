import {HttpUtils} from "../../utils/http-utils";
import {config} from "../../config/config";
import {CommonUtils} from "../../utils/common-utils";

export class FreelancersList {

  constructor(openNewRoute) {

    this.openNewRoute = openNewRoute;
    this.getFreelancers().then();
  }

  async getFreelancers() {

    const result = await HttpUtils.request('/freelancers');
    if (result.redirect) {
      return this.openNewRoute(result.redirect);
    }

    if (result.error || !result.response || (result.response && (result.response.error || !result.response.freelancers))) {
      return alert('Возникла ошибка при запросе фрилансеров. Обратитеть в поддержку');
    }

    this.showRecords(result.response.freelancers);
  }

  showRecords(freelancers) {
    const recordsElement = document.getElementById('records');
    for (let i = 0; i < freelancers.length; i++) {
      const trElement = document.createElement('tr');

      trElement.insertCell().innerText = i + 1;
      trElement.insertCell().innerHTML = freelancers[i].avatar ? '<img class="freelancer-avatar" src="' + config.host + freelancers[i].avatar + '" alt="Фото' +
        ' пользователя">' : '';
      trElement.insertCell().innerText = freelancers[i].name + ' ' + freelancers[i].lastName;
      trElement.insertCell().innerText = freelancers[i].email;
      trElement.insertCell().innerHTML = CommonUtils.getLevelHtml(freelancers[i].level);
      trElement.insertCell().innerText = freelancers[i].education;
      trElement.insertCell().innerText = freelancers[i].location;
      trElement.insertCell().innerText = freelancers[i].skills;
      trElement.insertCell().innerHTML = '<div class="freelancer-tools">' +
        '<a href="/freelancers/view?id=' + freelancers[i].id + '" class="fas fa-eye"></a>' +
        '<a href="/freelancers/edit?id=' + freelancers[i].id + '" class="fas fa-edit"></a>' +
        '<a href="/freelancers/delete?id=' + freelancers[i].id + '" class="fas fa-trash"></a>' + '</div>';

      recordsElement.append(trElement);
    }

    new DataTable('#data-table', {
      language: {
        "lengthMenu":     "Показывать _MENU_ записей на странице",
        "info":           "Страница _PAGE_ из _PAGES_",
        "infoEmpty":      "Нет записей, соответствующих поиску",
        // "infoFiltered":   "(отфильтровано из _MAX_ записей)",
        "infoFiltered":   "",
        "search":         "Поиск:",
        "zeroRecords":    "Записи не найдены",
        "paginate": {
          "next":       "Вперед",
          "previous":   "Назад"
        },
      }
    });
  }

}