export const validator = {
  length: (data) => {
    if (data == null) {
      return false;
    }
    if (data.length < 5 || /\s/.test(data)) {
      return false;
    }
    return true;
  },
  email: (data) => {
    const regex =
      /^([a-zA-Z0-9_\.\-]{1,5})+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]+[0-9]*){2}$/;
    if (regex.test(data)) {
      return true;
    } else {
      return false;
    }
  },
  password: (data) => {
    const regex =
      /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    if (regex.test(data)) {
      return true;
    } else {
      return false;
    }
  },
  name: (data) => {
    if (data === undefined || data === null) {
      return true;
    } else if (
      data.length < 3 ||
      /\s/.test(data) ||
      !/^[a-zA-Z]*$/.test(data)
    ) {
      return false;
    } else {
      return true;
    }
  },
};
