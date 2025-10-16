const rooms = document.querySelectorAll('.room');
const doors = document.querySelectorAll('.door');
const elevators = document.querySelectorAll('.elevator');
const stairs = document.querySelectorAll('.stair');
const infoBox = document.getElementById('room-info');

// الغرف
rooms.forEach(room => {
  room.addEventListener('click', () => {
    if (room.classList.contains('booked')) {
      infoBox.innerHTML = `<span class="info-booked">❌ الغرفة ${room.id} مشغولة.</span>`;
      return;
    }
    rooms.forEach(r => r.classList.remove('selected'));
    room.classList.add('selected');
    infoBox.innerHTML = `<span class="info-room">✅ لقد اخترت الغرفة: ${room.id} وهي متاحة.</span>`;
  });
});

// الأبواب
doors.forEach(door => {
  door.addEventListener('click', () => {
    infoBox.innerHTML = `<span class="info-door">🚪 هذا باب مرتبط بـ ${door.id.replace('door-', '')}</span>`;
  });
});

// المصاعد
elevators.forEach(elevator => {
  elevator.addEventListener('click', () => {
    infoBox.innerHTML = `<span class="info-elevator">🛗 هذا هو ${elevator.id} (مصعد).</span>`;
  });
});

// السلالم
stairs.forEach(stair => {
  stair.addEventListener('click', () => {
    infoBox.innerHTML = `<span class="info-stair">🪜 هذا هو ${stair.id} (سلم).</span>`;
  });
});
