'use strict';

const formatElapsedTime = elapsedTime => {
  if (elapsedTime < 1000) {
    return `${elapsedTime}ms`;
  } else if (elapsedTime < 60000) {
    return `${(elapsedTime / 1000).toFixed(2)}s`;
  } else if (elapsedTime < 3600000) {
    return `${(elapsedTime / 60000).toFixed(2)}min`;
  } else {
    return `${(elapsedTime / 3600000).toFixed(2)}h`;
  }
};

module.exports = {
  formatElapsedTime,
};
