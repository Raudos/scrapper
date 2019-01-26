class BackendError {
  constructor(type, status = 500, errBody) {
    this.type = type;
    this.status = status;
    this.errBody = errBody;
  }
}

module.exports = BackendError;
