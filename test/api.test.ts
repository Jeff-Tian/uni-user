import assert = require('assert');
import { getProfile } from '../src/api/api';

describe('getProfile', () => {
  it('throws if 401 met', async () => {
    try {
      await getProfile()
      throw new Error('The above request should fail.');
    } catch (ex) {
      assert(ex.status === 401);
    }
  })
});
