const pgp = require('pg-promise')();

// const db = pgp(process.env.ELEPHANT_SQL);

module.exports = {
  // =====>Users<===== \\

  /**
   * @param {...string} args Name, email, password
   */
  addUser: async (...args) => {
    // six parameters must be passed
    if (args.length < 4) throw new Error('Must pass name, email, password, and publicKey');
    // column names in database
    const columns = ['name', 'email', 'password', 'publicKey'];
    // invoke SQL command
    return await db.query(`INSERT INTO "Users" (${columns.join(',')}) 
    VALUES('${args[0]}', '${args[1]}', crypt('${args[2]}', gen_salt('bf')), '${args[3]}') RETURNING *`);
  },

  /**
   * @param {string} email User email
   * @param {string} password User password
   */
  getUser: async (email, password) => {
    if (typeof email !== 'string' && typeof password !== 'string') throw new Error('Invalid argument types');
    return await db.query(`SELECT * FROM "Users" WHERE email='${email}' AND password=crypt('${password}', password)`);
  },

  /**
   * @param {string} email User email
   * @param {string} name User name
   */
  changeName: async (email, name) => {
    if (typeof name !== 'string' && typeof email !== 'string') throw new Error('Invalid argument types');
    return await db.query(`UPDATE "Users" SET name='${name}' WHERE email='${email}' RETURNING *`);
  },

  /**
   * @param {string} email User email
   * @param {string} origPass Original password
   * @param {string} newPass New password
   */
  changePassword: async (email, origPass, newPass) => {
    if (typeof origPass !== 'string' && typeof email !== 'string') throw new Error('Invalid argument types');
    return await db.query(`UPDATE "Users" SET password=crypt('${newPass}', gen_salt('bf')) WHERE email='${email}' AND password=crypt('${origPass}', password) RETURNING *`);
  },

  // =====>Threads<===== \\

  /**
   * @param {...string} args Creator and password
   */
  addThread: async (...args) => {
    // two parameters must be passed
    if (args.length < 2) throw new Error('Must pass creator and password');
    // column names in database
    const columns = ['creator', 'password'];
    // invoke SQL command
    return await db.query(`INSERT INTO "Threads" (${columns.join(',')}) VALUES((SELECT id FROM "Users" WHERE email='${args[0]}'), crypt('${args[1]}', gen_salt('bf')) ) RETURNING *`);
  },

  /**
   * @param {number} threadId Thread ID
   * @param {string} password Thread password
   */
  getThread: async (threadId, password) => {
    if (typeof threadId !== 'number' && typeof password !== 'string') throw new Error('Invalid argument types');
    return await db.query(`SELECT * FROM "Threads" WHERE id='${threadId}' AND password=crypt('${password}', password)`);
  },

   /**
   * @param {number} threadId Thread ID
   * @param {string} password Thread password
   */
  deleteThread: async (threadId, password) => {
    if (typeof threadId !== 'number' && typeof password !== 'string') throw new Error('Invalid argument types');
    // delete thread... can I delete this first?
    await db.query(`DELETE FROM "Threads" WHERE id='${threadId}' AND password=crypt('${password}', password)`);
    // delete all memberships
    await db.query(`DELETE FROM 'Messages' WHERE thread='${threadId}'`);
    // delete all messages
    return await db.query(`DELETE FROM 'Memberships' WHERE thread='${threadId}'`);
  },

  // =====>Memberships<===== \\

   /**
   * @param {number} threadId Thread ID
   * @param {string} threadPassword Thread password
   * @param {number} userId User ID
   */
  joinThread: async (threadId, threadPassword, userId) => {
    // column names in database
    const columns = ['thread', 'member'];
    // invoke SQL command
    // this one is flawed, needs to be redone
    return await db.query(`INSERT INTO "Memberships" (${columns.join(',')}) 
      VALUES((SELECT id FROM "Threads" WHERE id='${threadId}' AND password=crypt('${threadPassword}', password), '${userId}') RETURNING *`);
  },

  /**
   * @param {number} threadId Thread ID
   */
  getThreadMembers: async (threadId) => {
    if (typeof threadId !== 'number') throw new Error('Invalid argument types');
    return await db.query(`SELECT name FROM "Memberships" 
      LEFT JOIN "Users" ON "Memberships".member="Users".id
      WHERE thread='${threadId}'`);
  },

  /**
   * @param {number} threadId Thread ID
   * @param {number} userId User ID
   */
  leaveThread: async (threadId, userId) => {
    if (typeof threadId !== 'number' && typeof userId !== 'number') throw new Error('Invalid argument types');
    // delete one person from a thread
    return await db.query(`DELETE FROM "Memberships" WHERE thread='${threadId}' AND member='${userId}'`);
  },

  /**
   * @param {number} threadId Thread ID
   */
  deleteAllThreadMemberships: async (threadId) => {
    if (typeof threadId !== 'number') throw new Error('Invalid argument types');
    // delete all memberships to one thread
    return await db.query(`DELETE FROM "Memberships" WHERE thread='${threadId}'`);
  },

  // =====>Messages<===== \\

  /**
   * @param {...any} args Author, thread, time, text
   */
  writeMessage: async (...args) => {
    // six parameters must be passed
    if (args.length < 4) throw new Error('Must pass author, thread, time, text (recipientId optional)');
    // column names in database
    const columns = ['author', 'thread', 'time', 'text', 'recipientId'];
    // invoke SQL command
    return await db.query(`INSERT INTO "Messages" (${columns.join(',')}) VALUES('${args.join("','")}') RETURNING *`);
  },

  /**
   * @param {number} threadId Thread ID
   */
  deleteAllThreadMessages: async (threadId) => {
    if (typeof threadId !== 'number') throw new Error('Invalid argument types');
    // delete all messages in one thread
    return await db.query(`DELETE FROM "Messages" WHERE thread='${threadId}'`);
  },

  /**
   * @param {number} threadId Thread ID
   */
  getAThreadsMessages: async (threadId) => {
    if (typeof threadId !== 'number' && typeof password !== 'number') throw new Error('Invalid argument types');
    // check password and get messages
    return await db.query(`SELECT * FROM "Messages" WHERE thread='${threadId}'`);
  }
}