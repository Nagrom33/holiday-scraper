const axios = require('axios');
const moment = require('moment');
const fs = require('fs');

// Hooks
const useHolidays = require('./hooks/useHolidays');

// Info
const countries = [
    'NL',
    'DE',
    'BE',
];

const currentYear = moment().format('YYYY');
const tillYear = '2030';
let yearArray = [];

for (let year = currentYear; year <= tillYear; year++) {
  yearArray.push(year.toString());
}

// Functions
const getHolidaysData = async () => {
  const data = {};

  for (const country of countries) {
    data[country] = {};

    for (const year of yearArray) {
      console.log('Getting data:',country,year);
      const holidays = await useHolidays(country, year);
      data[country][year] = holidays;
    }
  }

  return data;
};
// Write to file
getHolidaysData().then(data => {
  fs.writeFile('holidays.json', JSON.stringify(data), err => {
    if (err) throw err;
    console.log('Holidays data saved to holidays.json');
  });
});
