'use strict';

let errors = [];

class ValidationContract {
  constructor() {
    errors = [];
  }

  isRequired(value, message) {
    if (!value || value.length <= 0) errors.push({ message: message });
  }

  hasMinLen(value, min, message) {
    if (!value || value.length < min) errors.push({ message: message });
  }

  hasMaxLen(value, max, message) {
    if (!value || value.length > max) errors.push({ message: message });
  }

  isFixedLen(value, min, message) {
    if (value.length != len) errors.push({ message: message });
  }

  isEmail(value, message) {
    var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value)) errors.push({ message: message });
  }

  errors() {
    return errors;
  }

  clear() {
    errors = [];
  }

  isValid() {
    return errors.length == 0;
  }
}

module.exports = ValidationContract;
