const pgp = require('pg-promise')();

const db = pgp(process.env.ELEPHANT_SQL);

module.exports = {
  insertUser: (...args) => {
    // six parameters must be passed
    if (args.length < 6) throw new Error('Must pass full name, email, location, type, password, and phone number')
    // column names in database
    const columns = ['name', 'email', 'location', 'type', 'password', 'number'];
    // SQL command to insert a new row into the "Users" table
    const text = `INSERT INTO "Users" (${columns.join(',')}) VALUES('${args.join("','")}') RETURNING *`;
    // invoke SQL command
    db.query(text)
    .then((data) => {
      console.log('data', data);
    })
    .catch((err) => {
      if (err.constraint === 'Users_email_key') console.log('No duplicate emails allowed');
      else console.log(err);
    })
  },

  insertEvent: (...args) => {
    // eight parameters must be passed
    if (args.length < 8) throw new Error('Must pass host, title, service, location, date, fee, time, description, status');
    // column names in database
    const columns = ['host', 'title', 'service', 'location', 'date', 'fee', 'description', 'status'];
    // SQL command to insert a new row into the "Events" table
    const text = `INSERT INTO "Events" (${columns.join(',')}) VALUES('${args.join("','")}') RETURNING *`;
    // invoke SQL command
    db.query(text)
    .then((data) => {
      console.log('data', data);
    })
    .catch((err) => {
      if (err.constraint === 'Events_fk0') console.log('Foreign key host does not match');
      else console.log(err);
    })
  },

  insertRSVPS: (...args) => {
    // two parameters must be passed
    if (args.length < 2) throw new Error('Must pass event id and user id');
    // column names in database
    const columns = ['event', 'attendee'];
    // SQL command to insert a new row into the "Events" table
    const text = `INSERT INTO "RSVPS" (${columns.join(',')}) VALUES('${args.join("','")}') RETURNING *`;
    // invoke SQL command
    db.query(text)
    .then((data) => {
      console.log('data', data);
    })
    .catch((err) => {
      if (err.constraint === 'RSVPS_fk0') console.log("Event doesn't exist");
      else if (err.constraint === 'RSVPS_fk1') console.log("User doesn't exist");
      else console.log(err);
    })
  },

  getUser: (email) => {
    db.query(`SELECT * FROM "Users" WHERE email='${email}'`)
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    })
  },

  getRSVPList: () => {

  },

  getHostedEvents: () => {

  },

  getEventByService: (service) => {
    db.query(`SELECT * FROM "Events" WHERE service='${service}'`)
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    })
  },

  getEventByLocation: (location) => {
    db.query(`SELECT * FROM "Events" WHERE location='${location}'`)
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    })
  }
}