const { getFlightNumbers, getFlightInfo } = require('../test-data/flightSeating');
const { user, reservations } = require('../test-data/reservations');

// const func = require('./handlers-utilities');
// THIS WAS USED ON FIRST PART OF THE ASSIGNMENT, BUT NO LONGER USEFULL WITH THE USE OF THE API
// const handleReservation = async (req, res) => {
//     try {
//         const reservation = await func.createReservation(req.body, reservations);
//         if (reservation){
//             func.bookSeat(reservation.seat, flights, reservation.flight);
//             res.status(200).json({status: 200, data: reservation});
//         } else
//             res.status(400).json({status: 400, data: 'Reservation already exists'});
//     } catch (err) {
//         console.log(err);
//     }
// };

const handleAdmin = async (req, res) => {
    const data = await reservations();
    console.log(data);
    res.status(200).render('pages/view-reservation', {title: 'Admin', data: data});
};

//when user picks a flight, this will check if the flight exists and send back its seating map to the FE
const handleFlightNum = async (req, res) => {
    const n = req.params.number;
    const flightArr = await getFlightNumbers();
    console.log(flightArr);
    if (flightArr.includes(n)){
        try {
            const seating = await getFlightInfo(n);
            res.status(200).json({status: 200, data: seating, flight: n});
        } catch (err) {
            console.log(err);
        }
    } else
        res.status(404).json({status: 404, data: "wrong flight number!"});
};

// when user sends reservation, the server will send a confirmation page
const handleConfirmation = async (req, res) => {
    const data = await user(req.params.id);
    res.status(200).render('pages/confirmed', {title: 'Confirmation', data: data});
};

// first page of the reservation, will give  list of flights to pick from
const handleFlightInput = async (req, res) => {
    const data = await getFlightNumbers();
    res.status(200).render('pages/flight', {title: 'Seat selection', data: data});
};

module.exports = { handleFlightNum, handleConfirmation, handleFlightInput, handleAdmin };