module.exports = class UserDto {
  firstName;
  lastName;
  id;
  firstName;
  lastName;
  email;
  isActivated;

  constructor(model) {
    this.id = model._id;
    this.email = model.email;
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.isActivated = model.isActivated;
    this.authType = model.authType;
  }
};
