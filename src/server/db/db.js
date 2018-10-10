const pgp = require('pg-promise')();

const db = pgp(process.env.ELEPHANT_SQL);

module.exports = {
  insertUser: (...args) => {
    return new Promise((resolve, reject) => {
      // six parameters must be passed
      if (args.length < 6) throw new Error('Must pass full name, email, location, type, password, and phone number')
      // column names in database
      const columns = ['name', 'email', 'location', 'type', 'password', 'number'];
      // SQL command to insert a new row into the "Users" table
      const text = `INSERT INTO "Users" (${columns.join(',')}) VALUES('${args.join("','")}') RETURNING *`;
      // invoke SQL command
      db.query(text)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        if (err.constraint === 'Users_email_key') reject('No duplicate emails allowed');
        else reject(err);
      })
    })
  },

  insertEvent: (...args) => {
    return new Promise((resolve, reject) => {
      // eight parameters must be passed
      if (args.length < 8) throw new Error('Must pass host, title, service, location, date, fee, time, description, status');
      // column names in database
      const columns = ['host', 'title', 'service', 'location', 'date', 'fee', 'description', 'status'];
      // SQL command to insert a new row into the "Events" table
      const text = `INSERT INTO "Events" (${columns.join(',')}) VALUES('${args.join("','")}') RETURNING *`;
      // invoke SQL command
      db.query(text)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        if (err.constraint === 'Events_fk0') reject('Foreign key host does not match');
        else reject(err);
      })
    })
  },

  insertRSVPS: (...args) => {
    return new Promise((resolve, reject) => {
      // two parameters must be passed
      if (args.length < 2) throw new Error('Must pass event id and user id');
      // column names in database
      const columns = ['event', 'attendee'];
      // SQL command to insert a new row into the "Events" table
      const text = `INSERT INTO "RSVPS" (${columns.join(',')}) VALUES('${args.join("','")}') RETURNING *`;
      // invoke SQL command
      db.query(text)
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        if (err.constraint === 'RSVPS_fk0') reject("Event doesn't exist");
        else if (err.constraint === 'RSVPS_fk1') reject("User doesn't exist");
        else reject(err);
      })
    })
  },

  getUser: (email) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM "Users" WHERE email='${email}'`)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      })
    })
  },

  getRSVPList: () => {
    return new Promise((resolve, reject) => {
      
    })
  },

  getHostedEvents: (hostId) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM "Events" WHERE host='${hostId}'`)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      })
    })
  },

  getEventByService: (service) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM "Events" WHERE service='${service}'`)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      })
    })
  },

  getEventByLocation: (location) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM "Events" WHERE location='${location}'`)
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      })
    })
  }
}