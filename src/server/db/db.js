const pgp = require('pg-promise')();

const db = pgp(process.env.ELEPHANT_SQL);

module.exports = {
  insertUser: async (...args) => {
    // six parameters must be passed
    if (args.length < 6) throw new Error('Must pass full name, email, location, type, password, and phone number')
    // column names in database
    const columns = ['name', 'email', 'location', 'type', 'password', 'number'];
    // SQL command to insert a new row into the "Users" table
    const text = `INSERT INTO "Users" (${columns.join(',')}) VALUES('${args.join("','")}') RETURNING *`;
    // invoke SQL command
    return await db.query(text);
  },

  getUser: async (email) => {
    if (typeof email !== 'string') throw new Error('Email must be string');
    return await db.query(`SELECT * FROM "Users" WHERE email='${email}'`);
  },

  insertEvent: async (...args) => {
    // eight parameters must be passed
    if (args.length < 8) throw new Error('Must pass host, title, service, location, date, fee, description, status');
    // column names in database
    const columns = ['host', 'title', 'service', 'location', 'date', 'fee', 'description', 'status'];
    // invoke SQL command
    return await db.query(`INSERT INTO "Events" (${columns.join(',')}) VALUES('${args.join("','")}') RETURNING *`);
  },

  getEvent: async (eventId) => {
      // eventId must be number
      if (typeof eventId !== 'number') throw new Error('Must pass number');
      return await db.query(`SELECT * FROM "Events" WHERE "Id"=${eventId}`);
  },

  cancelEvent: async (eventId) => {
      // eventId must be number
      if (typeof eventId !== 'number') throw new Error('Must pass a number');
      return await db.query(`UPDATE "Events" SET status='cancelled' WHERE "Id"=${eventId}`);
  },

  insertRSVPS: async (...args) => {
      // two parameters must be passed
      if (args.length < 2) throw new Error('Must pass event id and user id');
      // column names in database
      const columns = ['event', 'attendee'];
      // invoke SQL command
      return await db.query(`INSERT INTO "RSVPS" (${columns.join(',')}) VALUES('${args.join("','")}') RETURNING *`);
  },

  getUsersRSVPList: async (userId) => {
    if (typeof userId !== 'number') throw new Error('Must pass a number');
    return await db.query(`SELECT * FROM "RSVPS" WHERE attendee='${userId}'`);
  },

  getEventsRSVPList: async (eventId) => {
    if (typeof eventId !== 'number') throw new Error('Must pass a number');
    return await db.query(`SELECT name, email, number FROM "RSVPS" LEFT JOIN "Users" ON "Users"."Id"="RSVPS".attendee WHERE event='${eventId}'`);
  },

  getHostedEvents: async (hostId) => {
    if (typeof hostId !== 'number') throw new Error('Must pass a number');
    return await db.query(`SELECT * FROM "Events" WHERE host='${hostId}'`);
  },

  getEventByService: async (service) => {
    if (typeof service !== 'string') throw new Error('Must pass a string');
    return await db.query(`SELECT * FROM "Events" WHERE service='${service}'`);
  },

  getEventByLocation: async (location) => {
    if (typeof location !== 'string') throw new Error('Must pass a string');
    return await db.query(`SELECT * FROM "Events" WHERE location='${location}'`);
  }
}