// Get current day and display it at the top of the calendar
let currentDay = moment().format("dddd, MMMM Do YYYY");
document.querySelector("#currentDay").innerHTML = currentDay;

// Create timeblocks for standard business hours
for (let i = 9; i < 18; i++) {
  // Create a new timeblock container
  let timeblock = document.createElement("div");
  timeblock.classList.add("timeblock");

  // Create the time label
  let timeLabel = document.createElement("div");
  timeLabel.classList.add("time-label");
  timeLabel.innerHTML = moment(i, "HH").format("h A");
  timeblock.appendChild(timeLabel);

  // Create the event input field
  let eventInput = document.createElement("input");
  eventInput.classList.add("event-input");
  eventInput.setAttribute("type", "text");
  eventInput.setAttribute("data-time", i);
  timeblock.appendChild(eventInput);

  // Create the save button
  let saveButton = document.createElement("button");
  saveButton.classList.add("save-button");
  saveButton.innerHTML = "<i class='fas fa-save'></i>";
  saveButton.setAttribute("data-time", i);
  saveButton.addEventListener("click", saveEvent);
  timeblock.appendChild(saveButton);

  // Add the timeblock to the container
  document.querySelector(".container").appendChild(timeblock);

  // Check the current time and color-code the timeblock accordingly
  let currentHour = moment().format("H");
  if (i < currentHour) {
    timeblock.classList.add("past");
  } else if (i === currentHour) {
    timeblock.classList.add("present");
  } else {
    timeblock.classList.add("future");
  }

  // Check for saved events in local storage
  let savedEvent = localStorage.getItem(i);
  if (savedEvent) {
    eventInput.value = savedEvent;
  }
}

// Save event function
function saveEvent(event) {
    // Get the time of the event
    let time = event.target.getAttribute("data-time");
  
    // Get the value of the event input field
    let eventValue = event.target.parentElement.querySelector(".event-input").value;
  
    // Save the event in local storage
    localStorage.setItem(time, eventValue);
  }