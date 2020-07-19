const { flights } = require('../test-data/flightSeating');
const { reservations } = require('../test-data/reservations');
const func = require('./handlers-utilities');


const handleFlightNum = async (req, res) => {
    const n = req.params.number;
    if (flights[n]){
        try {
            const seating = await flights[n];
            res.status(200).json({status: 200, data: seating});
        } catch (err) {
            console.log(err);
        }
    } else
        res.status(404).json({status: 404, data: "wrong flight number!"});
};

const handleReservation = async (req, res) => {
    try {
        const reservation = await func.createReservation(req.body, reservations);
        if (reservation){
            func.bookSeat(reservation.seat, flights, reservation.flight);
            res.status(200).json({status: 200, data: reservation});
        } else
            res.status(400).json('Reservation already exists');
    } catch (err) {
        console.log(err);
    }
};

const handleConfirmation = (req, res) => {
    res.status(200).json('Flight confirmed!');
};

const handleFlightInput = (req, res) => {
    res.status(200).render('pages/flight', {title: 'Seat selection'});
};

module.exports = { handleFlightNum, handleReservation, handleConfirmation, handleFlightInput };