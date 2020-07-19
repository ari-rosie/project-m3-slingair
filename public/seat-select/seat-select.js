const flightInput = document.getElementById('flight');
const seatsDiv = document.getElementById('seats-section');
const confirmButton = document.getElementById('confirm-button');
const test = 'test';
let selection = '';

const renderSeats = (seatObj) => {
    console.log(seatObj);
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


const toggleFormContent = (event) => {
    const flightNumber = flightInput.value.toUpperCase();
    const flag = flightNumber.startsWith('SA');
    if (flag) {
        fetch(`/flights/${flightNumber}`)
        .then(res => res.json())
        .then(data => {
            if (data.status === 200)
                renderSeats(data.data);
            console.log(data.data);
        })
        
    } else 
        console.log("Flight number starts with 'SA'.")

}

const handleConfirmSeat = async (event) => {
    event.preventDefault();
    const data = await fetch('/reservation', {
        method: 'POST',
        body: JSON.stringify({
            'givenName': document.getElementById('givenName').value,
            'surname': document.getElementById('surname').value,
            'email': document.getElementById('email').value,
            'flight': document.getElementById('flight').value.toUpperCase(),
            'seat': document.querySelector('input[name=seat]:checked').value
        }),
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }
    });
    if (data.status === 400)

    console.log(document.getElementById('givenName').value);


}

flightInput.addEventListener('blur', toggleFormContent);