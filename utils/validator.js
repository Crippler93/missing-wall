module.exports = {
  isValid(value) {
    if (value === null || value === undefined) {
      return false;
    }
    const val = String(value);
    if (val.trim() === '') {
      return false;
    }
    return true;
  },

  isValidDate(date) {
    if (date === null) {
      return false;
    }
    const d = new Date(date);
    if (Number.isNaN(d.valueOf())) {
      return false;
    }
    return true;
  },
};
