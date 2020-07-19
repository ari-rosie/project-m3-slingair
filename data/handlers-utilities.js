// if the reservation is valid, the function adds it to the reservation database and returns true to the server's handlers
const createReservation = (obj, database) => {
    if(checkReservation(obj, database)){
        database.push(obj);
        return obj;
    } else {
        return undefined;
    }
};

// if the email or the fullname does not already exists, the reservation is considered valid
const checkReservation = (obj, database) => {
    let flag = true;
    database.forEach(data => {
        if (data.email === obj.email) {
            flag = false;
            return;
        }
        if (data.surname === obj.surname && data.givenName === obj.givenName) {
            flag = false;
            return;
        }

    });
    return flag;
};

const bookSeat = (seat, database, flight) => {
    const book = database[flight].find(s => s.id === seat);
    book.isAvailable = false;
};

module.exports = { createReservation, bookSeat };