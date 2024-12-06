import { Low, JSONFile } from 'lowdb';

const adapter = new JSONFile('users.json');
const db = new Low(adapter);
// En servidor
await db.read();
export const User = db;
//hacer test
// async function initializeDB() {
//   await db.read(); 

//   if (!db.data) {
//     db.data = { users: [] };
//   } else if (!db.data.users) {
//     db.data.users = [];
//   }

//   return db;
// }

// export const User = initializeDB();
