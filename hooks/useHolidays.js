const axios = require('axios');

const useHolidays = async (country, year) => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `https://date.nager.at/api/v3/PublicHolidays/${year}/${country}`,
    headers: {}
  };

  try {
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = useHolidays;
