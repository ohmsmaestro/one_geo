import moment, { utc } from "moment";

export const asyncLocalStorage = {
  setItem: function (key, value) {
    return Promise.resolve().then(function () {
      localStorage.setItem(key, value);
    });
  },
  getItem: function (key) {
    return Promise.resolve().then(function () {
      return localStorage.getItem(key);
    });
  },
  clear: function (key) {
    return Promise.resolve().then(function () {
      return localStorage.clear();
    });
  },
};

export const asyncSessionStorage = {
  setItem: function (key, value) {
    return Promise.resolve().then(function () {
      sessionStorage.setItem(key, value);
    });
  },
  getItem: function (key) {
    return Promise.resolve().then(function () {
      return sessionStorage.getItem(key);
    });
  },
  clear: function (key) {
    return Promise.resolve().then(function () {
      return sessionStorage.clear();
    });
  },
};

export const hash = (value) => {
  if (value) {
    let h = 0;
    let l = value.length;
    let i = 0;
    if (l > 0) while (i < l) h = ((h << 5) - h + value.charCodeAt(i++)) | 0;
    return Math.abs(h);
  } else {
    return value;
  }
};

export const timeConverter = (value) => {
  // converts seconds to MM:SS format
  if (value) {
    let hr = value && Math.floor((value / 3600) << 0);
    let min = value && Math.floor((value / 60) << 0);
    let sec = value && Math.floor(value % 60);
    let duration = `${min}:${sec}`;
    if (hr > 0) {
      min = min % (hr * 60);
      duration = `${hr}:${min}:${sec}`;
    }
    return duration;
  } else return value;
};

export const getInputSelection = (el) => {
  var start = 0,
    end = 0,
    normalizedValue,
    range,
    textInputRange,
    len,
    endRange;

  if (
    typeof el.selectionStart == "number" &&
    typeof el.selectionEnd == "number"
  ) {
    start = el.selectionStart;
    end = el.selectionEnd;
  } else {
    range = document.selection.createRange();

    if (range && range.parentElement() === el) {
      len = el.value.length;
      normalizedValue = el.value.replace(/\r\n/g, "\n");

      // Create a working TextRange that lives only in the input
      textInputRange = el.createTextRange();
      textInputRange.moveToBookmark(range.getBookmark());

      // Check if the start and end of the selection are at the very end
      // of the input, since moveStart/moveEnd doesn't return what we want
      // in those cases
      endRange = el.createTextRange();
      endRange.collapse(false);

      if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
        start = end = len;
      } else {
        start = -textInputRange.moveStart("character", -len);
        start += normalizedValue.slice(0, start).split("\n").length - 1;

        if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
          end = len;
        } else {
          end = -textInputRange.moveEnd("character", -len);
          end += normalizedValue.slice(0, end).split("\n").length - 1;
        }
      }
    }
  }

  return {
    start: start,
    end: end,
  };
};

export const calcViewMode = () => {
  let viewWidth = window.innerWidth;
  if (600 > viewWidth) {
    return "mobile";
  } else if (900 > viewWidth) {
    return "tablet";
  } else {
    return "desktop";
  }
};

export const getYear = (time) => {
  let year = moment().format("YYYY");
  if (time) {
    let year = moment(time, "DD/MM/YYYY HH:mm:ss").format("YYYY");
  }
  return year;
};

export const timeElapsed = (thenProps, nowProps, endText) => {
  let then = thenProps
    ? moment(thenProps, "DD/MM/YYYY HH:mm:ss")
    : moment().utc();
  let now = nowProps ? moment(nowProps, "DD/MM/YYYY HH:mm:ss") : moment().utc();
  let thenString = then.format("DD/MM/YYYY HH:mm:ss");
  let nowString = now.format("DD/MM/YYYY HH:mm:ss");

  now = moment(nowString, "DD/MM/YYYY HH:mm:ss");
  then = moment(thenString, "DD/MM/YYYY HH:mm:ss");

  thenString = then.format("DD/MM/YYYY HH:mm:ss");
  nowString = now.format("DD/MM/YYYY HH:mm:ss");

  const elapsedTime = moment(now - then).utc();
  const months = elapsedTime.format("M") - 1;
  const days = elapsedTime.format("D") - 1;
  const hours = elapsedTime.format("HH");
  const minutes = elapsedTime.format("mm");
  const seconds = elapsedTime.format("ss");

  const statement = (value, type) => {
    return `${Number(value)} ${type}${value > 1 ? "s" : " "} ${
      endText ? endText : "ago"
    }`;
  };

  if (then > now) {
    return statement(0, "second");
  }

  if (months > 0) {
    return statement(months, "month");
  }

  if (days > 0) {
    return statement(days, "day");
  }

  if (hours > 0) {
    return statement(hours, "hour");
  }

  if (minutes > 0) {
    return statement(minutes, "min");
  }

  if (seconds > 0) {
    return statement(seconds, "second");
  }
};

export const formatCurrency = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatDate = (date) =>
  moment(date, "DD-MM-YYYY").format("DD MMM YYYY");

export const truncateText = (text, limit, limitExtension) => {
  let extension = limitExtension ? limitExtension : "...";
  let extensionPlus = limitExtension ? limitExtension.length : 3;
  let extensionLimit = limit ? limit : 17;

  if (text) {
    let value =
      text.length > extensionLimit
        ? `${text.slice(0, extensionLimit + extensionPlus)}${extension}`
        : text;
    return value;
  } else {
    return text;
  }
};

export const removeDuplicate = (arr, key) => {
  let data = [];
  arr &&
    arr.forEach((item) => {
      let index = data.findIndex((list) => list[key] === item[key]);
      if (index === -1) {
        data.push(item);
      } else {
        return null;
      }
    });
  return data;
};

export const sortTime = (arr, key) => {
  let data = arr.sort(
    (a, b) =>
      (a ? moment(a[key], "DD/MM/YYYY HH:mm:ss") : "") -
      (b ? moment(b[key], "DD/MM/YYYY HH:mm:ss") : "")
  );
  return data;
};

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

export const formatCount = (value) => {
  if (1000 > value) return `${value}`;
  if (1000000 > value) return `${round(value / 1000, 1)}k`;
  if (1000000000 > value) return `${round(value / 1000000, 1)}M`;
  return value;
};
