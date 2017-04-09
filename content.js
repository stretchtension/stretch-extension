//content.js
/* this will create pop ups on any web page 
*/
var isWorking=true;
function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}
var timeinterval;
function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  //var daysSpan = clock.querySelector('.days');
  //var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);


    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    console.log("t total: "+ t.total);
    if (t.total <= 0) {
      clearInterval(timeinterval);
      if(isWorking){
      	document.getElementById("clockdiv").style.display = "none";

      	document.getElementById("breakdiv").style.display = "block";

      	isWorking=false;
      }
      else{
      	document.getElementById("breakdiv").style.display = "none";
      	document.getElementById("clockdiv").style.display = "block";

      	isWorking=true;
      }
    }
  }

  updateClock();
  timeinterval = setInterval(updateClock, 1000);
}
function setMainClock(){
  var deadline = new Date(Date.parse(new Date()) + 15 * 1000);
  //clearInterval(timeinterval);
  initializeClock('clockdiv', deadline);

}

function setSmallClock(){
  //clearInterval(timeinterval);
    var deadline = new Date(Date.parse(new Date()) + 10 * 1000);
  initializeClock('breakdiv', deadline);

}
document.getElementById("resetTime").onclick = setMainClock;
document.getElementById("resetSmallTime").onclick = setSmallClock;
//setMainClock();