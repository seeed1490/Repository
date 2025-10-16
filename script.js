const svg = document.getElementById('floor-plan');
const infoBox = document.getElementById('room-info');
const select = document.getElementById('element-select');

// توليد الغرف F1–F71 في شبكة 10×8
let count = 1;
for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 10; col++) {
    if (count > 71) break;
    const id = `F${count}`;
    const x = 50 + col * 110;
    const y = 100 + row * 80;

    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("id", id);
    rect.setAttribute("class", "room available");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", 100);
    rect.setAttribute("height", 60);
    svg.appendChild(rect);

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", x + 50);
    label.setAttribute("y", y + 35);
    label.setAttribute("class", "label");
    label.textContent = localStorage.getItem(`label-${id}`) || id;
    svg.appendChild(label);

    const option = document.createElement("option");
    option.value = id;
    option.textContent = id;
    select.appendChild(option);

    count++;
  }
}

// العناصر الخاصة ومسمياتها الأصلية
const specialLabels = {
  "masjid": "🕌 مسجد",
  "toilet": "🚻 دورة مياه",
  "elevator-main": "🛗 مصعد",
  "stair-main": "🪜 سلم"
};

// استرجاع المسميات المعدلة للعناصر الخاصة عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
  Object.keys(specialLabels).forEach(id => {
    const saved = localStorage.getItem(`label-${id}`);
    if (saved) {
      document.querySelectorAll('text').forEach(text => {
        if (text.textContent === specialLabels[id]) {
          text.textContent = saved;
        }
      });
    }
  });
});

// التفاعل مع الغرف
document.querySelectorAll('.room').forEach(room => {
  room.addEventListener('click', () => {
    const label = localStorage.getItem(`label-${room.id}`) || room.id;
    if (room.classList.contains('booked')) {
      infoBox.innerHTML = `<span class="info-booked">❌ ${label} مشغولة.</span>`;
      return;
    }
    document.querySelectorAll('.room').forEach(r => r.classList.remove('selected'));
    room.classList.add('selected');
    infoBox.innerHTML = `<span class="info-room">✅ لقد اخترت: ${label} وهي متاحة.</span>`;
  });
});

// تعديل المسميات لأي عنصر
document.getElementById('apply-label').addEventListener('click', () => {
  const id = select.value;
  const newLabel = document.getElementById('new-label').value.trim();
  if (!newLabel) return;

  localStorage.setItem(`label-${id}`, newLabel);

  document.querySelectorAll('text').forEach(text => {
    if (
      text.textContent === id ||
      text.textContent.includes(id) ||
      text.textContent === specialLabels[id]
    ) {
      text.textContent = newLabel;
    }
  });

  const selected = document.getElementById(id);
  if (selected && selected.classList.contains('selected')) {
    infoBox.innerHTML = `<span class="info-room">✅ لقد اخترت: ${newLabel}</span>`;
  }

  document.getElementById('new-label').value = '';
});

// إعادة تعيين المسميات
document.getElementById('reset-labels').addEventListener('click', () => {
  const options = document.querySelectorAll('#element-select option');
  options.forEach(opt => {
    localStorage.removeItem(`label-${opt.value}`);
  });

  document.querySelectorAll('text').forEach(text => {
    const originalId = getOriginalId(text.textContent);
    text.textContent = specialLabels[originalId] || originalId;
  });

  infoBox.innerHTML = `<span>✅ تم إعادة تعيين جميع المسميات.</span>`;
});

// زر الطباعة
document.getElementById('print-plan').addEventListener('click', () => {
  window.print();
});

// استخراج المعرف الأصلي من النص
function getOriginalId(text) {
  const options = document.querySelectorAll('#element-select option');
  for (let opt of options) {
    if (text === opt.value || text.includes(opt.value)) {
      return opt.value;
    }
  }
  for (let key in specialLabels) {
    if (text === specialLabels[key]) return key;
  }
  return text;
}
