const db = require('../db/db.js');

module.exports = {
  addEvent: (req, res, next) => {
    // const practiceEvent = ['1', 'Cuts', 'hair cuts', 'here', '2008-11-11 13:23:44', '0', 'a place to cut hair', 'pending'];
    // db.insertEvent(...practiceEvent);
  },
  getUsersEvents: (req, res, next) => {

  },
  getHostsEvents: (req, res, next) => {

  },
  getEventByLocation: (req, res, next) => {
    // db.getEventByLocation('');
  },
  getEventByService: (req, res, next) => {
    // db.getEventByService('');
  },
  addRSVP: (req, res, next) => {
    // db.insertRSVPS(4, 25);
  },
  cancelRSVP: (req, res, next) => {

  },
  getRSVPList: (req, res, next) => {
  }
}