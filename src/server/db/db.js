const pgp = require('pg-promise')();

const db = pgp(process.env.ELEPHANT_SQL);

module.exports = {
  // =====>Users<===== \\
  addUser: async (...args) => {
    // six parameters must be passed
    if (args.length < 3) throw new Error('Must pass name, email, and password');
    // column names in database
    const columns = ['name', 'email', 'password'];
    // invoke SQL command
    return await db.query(`INSERT INTO "Users" (${columns.join(',')}) VALUES('${args.join("','")}') RETURNING *`);
  },

  getUser: async (email, password) => {
    // need to ENCRYPT and check password here
    if (typeof email !== 'string' && typeof password !== 'string') throw new Error('Invalid argument types');
    return await db.query(`SELECT * FROM "Users" WHERE email='${email}'`);
  },

  changeName: async (email, name) => {
    if (typeof name !== 'string' && typeof email !== 'string') throw new Error('Invalid argument types');
    return await db.query(`UPDATE "Users" SET name='${name}' WHERE email='${email}' RETURNING *`);
  },

  changePassword: async (email, origPass, newPass) => {
    // must check old password and ENCRYPT new password
    if (typeof origPass !== 'string' && typeof email !== 'string') throw new Error('Invalid argument types');
    return await db.query(`UPDATE "Users" SET password='${newPass}' WHERE email='${email}' AND password='${origPass}'`);
  },





  // =====>Threads<===== \\
  addThread: async (...args) => {
    // two parameters must be passed
    if (args.length < 2) throw new Error('Must pass creator and password');
    // column names in database
    const columns = ['creator', 'password'];
    // invoke SQL command
    return await db.query(`INSERT INTO "Threads" (${columns.join(',')}) VALUES((SELECT id FROM "Users" WHERE email='${args[0]}'), '${args[1]}') RETURNING *`);
  },

  getThread: async (threadId, password) => {
    // needs ENCRYPTing
    if (typeof threadId !== 'number' && typeof password !== 'string') throw new Error('Invalid argument types');
    return await db.query(`SELECT * FROM "Threads" WHERE id='${threadId}' AND password='${password}'`);
  },

  deleteThread: async (threadId, password) => {
    if (typeof threadId !== 'number' && typeof password !== 'string') throw new Error('Invalid argument types');
    // return await db.query(`UPDATE "Events" SET status='cancelled' WHERE "Id"=${eventId}`);
    // delete all memberships
    // delete all messages
    return await db.query(`DELETE FROM "Threads" WHERE id='${threadId}'`);
  },





  // =====>Memberships<===== \\
  joinThread: async (threadId, threadPassword, userId) => {
    // column names in database
    const columns = ['thread', 'member'];
    // invoke SQL command
    // NEED TO ADD TITLE TO CHATS and PASSword checking?
    return await db.query(`INSERT INTO "Memberships" (${columns.join(',')}) 
      VALUES((SELECT id FROM "Threads" WHERE password='${threadPassword}'), '${userId}') RETURNING *`);
  },

  getThreadMembers: async (threadId) => {
    if (typeof threadId !== 'number') throw new Error('Invalid argument types');
    return await db.query(`SELECT name FROM "Memberships" 
      LEFT JOIN "Users" ON "Memberships".member="Users".id
      WHERE thread='${threadId}'`);
  },

  leaveThread: async (threadId, userId) => {
    if (typeof threadId !== 'number' && typeof userId !== 'number') throw new Error('Invalid argument types');
    // delete one person from a thread
    return await db.query(`DELETE FROM "Memberships" WHERE thread='${threadId}' AND member='${userId}'`);
  },

  deleteAllThreadMemberships: async (threadId) => {
    if (typeof threadId !== 'number') throw new Error('Invalid argument types');
    // delete all memberships to one thread
    return await db.query(`DELETE FROM "Memberships" WHERE thread='${threadId}'`);
  },





  // =====>Messages<===== \\
  writeMessage: async (...args) => {
    // six parameters must be passed
    if (args.length < 4) throw new Error('Must pass author, thread, time, and text');
    // column names in database
    const columns = ['author', 'thread', 'time', 'text'];
    // invoke SQL command
    return await db.query(`INSERT INTO "Messages" (${columns.join(',')}) VALUES('${args.join("','")}') RETURNING *`);
  },

  deleteAllThreadMessages: async (threadId) => {
    if (typeof threadId !== 'number') throw new Error('Invalid argument types');
    // delete all messages in one thread
  },

  getAThreadsMessages: async (threadId, password) => {
    if (typeof threadId !== 'number' && typeof password !== 'number') throw new Error('Invalid argument types');
    // check password and get messages
  }

  // getEventsRSVPList: async (eventId) => {
  //   if (typeof eventId !== 'number') throw new Error('Must pass a number');
  //   return await db.query(`SELECT name, email, number FROM "RSVPS" LEFT JOIN "Users" ON "Users"."Id"="RSVPS".attendee WHERE event='${eventId}'`);
  // },
}