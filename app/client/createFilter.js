import Immutable from 'immutable';
import faker from 'faker';
import uniqueId from 'lodash/utility/uniqueId';

export default function createFilter() {
  return Immutable.fromJS({
    title: `${faker.hacker.verb()} ${faker.hacker.adjective()} ${faker.hacker.noun()}`,
    key: uniqueId(),
  });
};
