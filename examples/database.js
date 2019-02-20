import Dexie from 'dexie';

const db = new Dexie('wealthscopesdk-testing');

db.version(1).stores({
  formData: 'key, value'
});

export default db;
