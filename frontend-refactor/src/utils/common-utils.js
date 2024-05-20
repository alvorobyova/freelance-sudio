import {config} from "../config/config";

export class CommonUtils {

  static getLevelHtml(level) {
    let levelHtml = null;

    switch (level) {
      case config.freelancerLevels.junior:
        levelHtml = '<span class="badge badge-info">Junior</span>';
        break;
      case config.freelancerLevels.middle:
        levelHtml = '<span class="badge badge-warning">Middle</span>';
        break;
      case config.freelancerLevels.senior:
        levelHtml = '<span class="badge badge-success">Senior</span>';
        break;
      default:
        levelHtml = '<span class="badge badge-secondary">Unknown</span>';
    }
    return levelHtml;
  }

  static getOrderStatus(status) {
    const statusInfo = {
      value: '',
      color: '',
      icon: ''
    };

    switch (status) {
      case config.orderStatus.new:
        statusInfo.value = 'Новый';
        statusInfo.color = 'secondary';
        statusInfo.icon = 'star';
        break;
      case config.orderStatus.confirmed:
        statusInfo.value = 'Подтвержден';
        statusInfo.color = 'info';
        statusInfo.icon = 'eye';
        break;
      case config.orderStatus.success:
        statusInfo.value = 'Выполнен';
        statusInfo.color = 'success';
        statusInfo.icon = 'check';
        break;
      case config.orderStatus.canceled:
        statusInfo.value = 'Отменен';
        statusInfo.color = 'danger';
        statusInfo.icon = 'times';
        break;
      default:
        statusInfo.value = 'Неизвестен';
        statusInfo.color = 'info';
        statusInfo.icon = 'question';
    }
    return statusInfo;
  }
}