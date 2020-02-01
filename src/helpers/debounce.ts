import * as R from 'ramda';

export const cacheForSeconds = (seconds, fn) => {
  const cleared = {};

  const debounce = (...args) => {
    const key = JSON.stringify(args);
    const clear = () => {
      cleared[key] = true;
    };

    if (cleared[key]) {
      return undefined;
    }

    setTimeout(clear, 1000 * seconds);

    return args;
  };

  return R.memoizeWith(debounce, fn);
};
