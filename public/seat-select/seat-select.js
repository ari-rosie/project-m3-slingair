const seatsDiv = document.getElementById('seats-section');
const confirmButton = document.getElementById('confirm-button');
const dropMenu = document.querySelector('.droplist_flights');

let flightInput;
let selection = '';

// when a valid flight number is entered, this show the seating map and its availability
const renderSeats = (seatObj, flight) => {
    flightInput = flight;

    document.querySelector('.form-container').style.display = 'block';
    let index = 0;
    const alpha = ['A', 'B', 'C', 'D', 'E', 'F'];
    for (let r = 1; r < 11; r++) {
        const row = document.createElement('ol');
        row.classList.add('row');
        row.classList.add('fuselage');
        seatsDiv.appendChild(row);
        for (let s = 1; s < 7; s++) {
            const seatNumber = `${r}${alpha[s-1]}`;
            const seat = document.createElement('li');

            // Two types of seats to render
            const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`
            const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`        
            
            if (seatObj[index++].isAvailable)
                seat.innerHTML = seatAvailable;
            else
                seat.innerHTML = seatOccupied;
            row.appendChild(seat);
        }
    }
    
    let seatMap = document.forms['seats'].elements['seat'];
    seatMap.forEach(seat => {
        seat.onclick = () => {
            selection = seat.value;
            seatMap.forEach(x => {
                if (x.value !== seat.value) {
                    document.getElementById(x.value).classList.remove('selected');
                }
            })
            document.getElementById(seat.value).classList.add('selected');
            document.getElementById('seat-number').innerText = `(${selection})`;
            confirmButton.disabled = false;
        }
    });
}

// Validates the flight number entered and asks the server for its corresponding seating data
const toggleFormContent = (flight) => {
    dropMenu.style.display = 'none';
    const flightNumber = flight.toUpperCase();
    const flag = flightNumber.startsWith('SA');
    if (flag) {
        fetch(`/flights/${flightNumber}`)
        .then(res => res.json())
        .then(data => {
            if (data.status === 200)
                renderSeats(data.data, data.flight);
        })
        
    } else 
        console.log("Flight number must start with 'SA'.");

};

// when users sends a reservation request this sends the data to the server
const handleConfirmSeat = async (event) => {
    event.preventDefault();
    try {
        let data = await fetch('https://journeyedu.herokuapp.com/slingair/users', {
            method: 'POST',
            body: JSON.stringify({
                'givenName': document.getElementById('givenName').value,
                'surname': document.getElementById('surname').value,
                'email': document.getElementById('email').value,
                'flight': flightInput,
                // 'id': 'testId',
                'seat': document.querySelector('input[name=seat]:checked').value
            }),
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            }
        });
        data = await data.json();
        if (data.status === 201) {
            const {id} = await data.reservation;
            window.location.href = (`/confirmation/${id}`);
        } 
    } catch (err) {
        console.log(err);
    }
};


