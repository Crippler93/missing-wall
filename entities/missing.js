module.exports = function createMakeMissing(validator) {
  return class Missing {
    constructor({ name, description, missingDate }) {
      if (validator.isValid(name)) {
        this.name = name;
      } else {
        throw new Error(`Invalid name: ${name}`);
      }
      if (validator.isValid(description)) {
        this.description = description;
      } else {
        throw new Error(`Invalid description: ${description}`);
      }
      if (validator.isValidDate(missingDate)) {
        this.missingDate = missingDate;
      } else {
        throw new Error(`Missing date must be a valid date: ${missingDate}`);
      }
    }
  };
};
