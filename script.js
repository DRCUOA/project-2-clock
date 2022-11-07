window.addEventListener('load', () => {
  console.log('client load event heard')

  const clockDisplay = document.querySelector('#my-clock');
  const modalBtn = document.querySelector('#myBtn');
  const modal = document.querySelector('#myModal');
  const createNewClock = document.querySelector('#create-new-clock');
  const selectTimeZoneOption = document.querySelector('#selected');

  modalBtn.addEventListener('click', () => {
    modal.style.display = "block";  
  });

  createNewClock.addEventListener('click', () => {
    createNewClock.style.display = "none";
    clockDisplay.style.display = "block";
    modalBtn.style.display = "none";  
    const clock = setInterval(() => {
    const date = new Date();
    const clockDate = new Clock(date);
    const offsetHrs = parseInt(selectTimeZoneOption.value);
    const utcHrs = parseInt(clockDate.currentHrsUTC);
    console.log(utcHrs, "+", offsetHrs,"=", utcHrs + offsetHrs)
    let selectTimeZoneHrs = 0;
    if((utcHrs + offsetHrs) < 0) {
      selectTimeZoneHrs = 23 + (utcHrs+offsetHrs);
    } else {
      selectTimeZoneHrs = utcHrs + offsetHrs;
    }
    const displayHrs =  selectTimeZoneHrs.toString().padStart(2, '0');
    const displayMins = clockDate.currentMinsUTC.toString().padStart(2, '0');
    const displaySecs = clockDate.currentSecsUTC.toString().padStart(2, '0');
    const displayMillSecs = clockDate.currentMilliSecsUTC.toString().padStart(3, '00');
    clockDisplay.innerHTML = `<h1>${displayHrs}:${displayMins}:${displaySecs}.${displayMillSecs}</h1>`
  }, 1);

  



  });

  fetch("./timeZones.json")
    .then(response => {
      return response.json();
    })
    .then(data => data.forEach(timeZone => {
      const timeZoneSelectOptions = document.querySelector('#selected');
      const newOption = document.createElement('option');
      newOption.setAttribute('value',`${timeZone.offset}`);
      newOption.innerText = `${timeZone.text}`;
      timeZoneSelectOptions.appendChild(newOption);
    }));

  class Clock {
    constructor(currentDate) {
      this.currentHrsUTC = currentDate.getUTCHours();
      this.currentMinsUTC = currentDate.getUTCMinutes();
      this.currentSecsUTC = currentDate.getUTCSeconds();
      this.currentMilliSecsUTC = currentDate.getUTCMilliseconds();
    }
  }

});