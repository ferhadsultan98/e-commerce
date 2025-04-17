// firebase-realtime.js
import app from './firebase-config';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const realtimeDB = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {
  realtimeDB,
  auth,
  storage
};
