function updateClock() {
  const d = new Date();
  const h = d.getHours();
  const m = d.getMinutes();
  const s = d.getSeconds();

  const hRotation = 30 * h + m / 2;
  const mRotation = 6 * m;
  const sRotation = 6 * s;

  document.getElementById('hour').style.transform = `rotate(${hRotation}deg)`;
  document.getElementById('minute').style.transform = `rotate(${mRotation}deg)`;
  document.getElementById('second').style.transform = `rotate(${sRotation}deg)`;

  const hours12 = h % 12 === 0 ? 12 : h % 12;
  const ampm = h >= 12 ? "PM" : "AM";
  document.getElementById('digitalTime').textContent = `${padZero(hours12)}:${padZero(m)}:${padZero(s)} ${ampm}`;

  const day = d.getDate();
  const month = d.toLocaleString('default', { month: 'short' });
  const year = d.getFullYear();
  document.getElementById('dateDisplay').textContent = `${padZero(day)} ${month} ${year}`;

  if (soundEnabled) {
    const tick = document.getElementById('tickSound');
    tick.currentTime = 0;
    tick.play();
  }

  checkAlarm();
}

function padZero(num) {
  return num < 10 ? `0${num}` : num;
}

let soundEnabled = false;
let alarmTime = null;

function setAlarm() {
  const input = document.getElementById('alarmTime').value;
  if (!input) return;
  alarmTime = input;
  document.getElementById('alarmStatus').textContent = `Alarm set for ${alarmTime}`;
}

function checkAlarm() {
  if (!alarmTime) return;
  const now = new Date();
  const current = `${padZero(now.getHours())}:${padZero(now.getMinutes())}`;
  if (current === alarmTime) {
    const sound = document.getElementById('alarmSound');
    sound.play();
    document.getElementById('alarmStatus').textContent = "Alarm ringing!";
    alarmTime = null;
  }
}

function fetchWeather() {
  // Replace with your real API key and city or use a mock
  const API_KEY = 'YOUR_API_KEY';
  const CITY = 'New York';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const temp = data.main.temp;
      const weather = data.weather[0].main;
      document.getElementById('weatherDisplay').textContent = `${CITY}: ${temp}°C, ${weather}`;
    })
    .catch(() => {
      document.getElementById('weatherDisplay').textContent = "Unable to fetch weather.";
    });
}

const themeSwitch = document.getElementById('themeSwitch');
themeSwitch.addEventListener('change', () => {
  document.body.classList.toggle('light-mode');
  document.getElementById('themeLabel').textContent =
    document.body.classList.contains('light-mode') ? 'Light Mode' : 'Dark Mode';
});

setInterval(updateClock, 1000);
updateClock();
fetchWeather();
