const seatingChart = document.querySelector('.seating-chart');
const infoBox = document.getElementById('seat-info');

// المقاعد حسب الصفوف
const rows = {
  F: ['F1', 'F2', 'F3', 'F4', 'F5'],
  G: ['G1', 'G2', 'G3', 'G4', 'G5'],
  H: ['H1', 'H2', 'H3', 'H4', 'H5'],
  D: ['D1', 'D2', 'D3', 'D4', 'D5']
};

// المقاعد المحجوزة
const bookedSeats = ['F2', 'G3', 'H4', 'D1'];

for (const [rowLabel, seats] of Object.entries(rows)) {
  const rowDiv = document.createElement('div');
  rowDiv.classList.add('row');
  rowDiv.setAttribute('data-row', rowLabel);

  seats.forEach(seatId => {
    const seatBtn = document.createElement('button');
    seatBtn.classList.add('seat');
    seatBtn.id = seatId;
    seatBtn.textContent = seatId;

    if (bookedSeats.includes(seatId)) {
      seatBtn.classList.add('booked');
    } else {
      seatBtn.classList.add('available');
      seatBtn.addEventListener('click', () => {
        document.querySelectorAll('.seat').forEach(s => s.classList.remove('selected'));
        seatBtn.classList.add('selected');
        infoBox.textContent = `لقد اخترت المقعد: ${seatId} وهو متاح.`;
      });
    }

    rowDiv.appendChild(seatBtn);
  });

  seatingChart.appendChild(rowDiv);
}
