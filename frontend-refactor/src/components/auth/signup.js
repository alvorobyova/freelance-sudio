import {AuthUtils} from "../../utils/auth-utils";
import {HttpUtils} from "../../utils/http-utils";

export class Signup {
  constructor(openNewRoute) {
    this.openNewRoute = openNewRoute;
    if (AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
      return this.openNewRoute('/');
    }
    this.nameElement = document.getElementById('name');
    // this.lastnameElement = document.getElementById('lastname');
    this.emailElement = document.getElementById('email');
    this.passwordElement = document.getElementById('password');
    this.passwordRepeatElement = document.getElementById('password-repeat');
    this.agreeElement = document.getElementById('agree');
    this.commonErrorElement = document.getElementById('common-error');
    document.getElementById('processButton').addEventListener('click', this.signup.bind(this))
  }

  validateForm() {
    let isValid = true;

    if (this.nameElement.value) {
      this.nameElement.classList.remove('is-invalid');
    } else {
      this.nameElement.classList.add('is-invalid');
      isValid = false;
    }

    /*if (this.lastnameElement.value) {
      this.lastnameElement.classList.remove('is-invalid');
    } else {
      this.lastnameElement.classList.add('is-invalid');
      isValid = false;
    }*/

    if (this.emailElement.value && this.emailElement.value.match(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)) {
      this.emailElement.classList.remove('is-invalid');
    } else {
      this.emailElement.classList.add('is-invalid');
      isValid = false;
    }

    if (this.passwordElement.value && this.passwordElement.value.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)) {
      this.passwordElement.classList.remove('is-invalid');
    } else {
      this.passwordElement.classList.add('is-invalid');
      isValid = false;
    }

    if (this.passwordRepeatElement.value && this.passwordRepeatElement.value === this.passwordElement.value) {
      this.passwordRepeatElement.classList.remove('is-invalid');
    } else {
      this.passwordRepeatElement.classList.add('is-invalid');
      isValid = false;
    }

    if (this.agreeElement.checked) {
      this.agreeElement.classList.remove('is-invalid');
    } else {
      this.agreeElement.classList.add('is-invalid');
      isValid = false;
    }
    return isValid;
  }

  async signup() {
    this.commonErrorElement.style.display = 'none';

    if (this.validateForm()) {
      const result = await HttpUtils.request('/signup', 'POST', false,{
        name: this.nameElement.value,
        email: this.emailElement.value,
        password: this.passwordElement.value
      })

      if (result.error || !result.response || (result.response && (!result.response.accessToken || !result.response.refreshToken || !result.response.id || !result.response.name))) {
        this.commonErrorElement.style.display = 'block';
        return;
      }

      AuthUtils.setAuthInfo(result.response.accessToken, result.response.refreshToken, {id: result.response.id, name: result.response.name});
      this.openNewRoute('/');
    }
  }
}