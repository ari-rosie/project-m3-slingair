const request = require('request-promise');


//returns an array of current reservations
const reservations = async () => {
  const reqObj = {
    headers: {Accept:'application/json'},
    uri: 'https://journeyedu.herokuapp.com/slingair/users',
    json: true
  }

  try {
    const users = await request(reqObj);
    return users;
  } catch (err) {
    console.log(err);
  }
};

//returns an object  of a specific user (with id or email)
const user = async (id) => {
  const reqObj = {
    headers: {Accept:'application/json'},
    uri: `https://journeyedu.herokuapp.com/slingair/users/${id}`,
    json: true
  }
  try {
      const data = await request(reqObj);
      return data.data;
  } catch (err) {
      console.log(err);
  }
};


module.exports = { reservations, user };
