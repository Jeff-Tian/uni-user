import assert from 'assert';
import R from 'ramda';
import { sleep } from '@jeff-tian/sleep';
import { cacheForSeconds } from '../src/helpers/debounce';

let count = 0;
const factorial = cacheForSeconds(2, n => {
  count += 1;
  return R.product(R.range(1, n + 1));
});

describe('features', () => {
  it('debounce', async () => {
    const res = factorial(5);
    assert(res === 120);
    assert(count === 1);

    factorial(5);
    assert(count === 1);

    await sleep(3);
    factorial(5);
    assert(count === 2);
  });

  const add = async (x, y, z) => {
    await sleep(1);
    return x + y + z;
  };

  const add10 = async (x, y) => {
    return await add(10, x, y);
  };

  const anotherAdd10 = R.curry(add)(10);

  it('curry', async () => {
    assert((await add10(1, 2)) === 13);

    assert((await anotherAdd10(1, 2)) === 13);
  });
});
