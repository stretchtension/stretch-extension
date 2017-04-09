//use persistent background pages 
/*
// Handle requests for passwords
chrome.runtime.onMessage.addListener(function(request) {
    if (request.type === 'request_password') {
        chrome.tabs.create({
            url: chrome.extension.getURL('dialog.html'),
            active: false
        }, function(tab) {
            // After the tab has been created, open a window to inject the tab
            chrome.windows.create({
                tabId: tab.id,
                type: 'popup',
                focused: true
                // incognito, top, left, ...
            });
        });
    }
});
function setPassword(password) {
    // Do something, eg..:
    console.log(password);
};

*/

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
    console.log("1sec");

    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    console.log("t total: "+t.total);
    if (t.total <= 0) {
      if(isWorking){

        clearInterval(timeinterval);

        document.getElementById("clockdiv").style.display = "none";

        document.getElementById("breakdiv").style.display = "block";

        isWorking=false;
      }
      else {
        clearInterval(timeinterval);

        document.getElementById("clockdiv").style.display = "block";

        document.getElementById("breakdiv").style.display = "none";

        isWorking=true;
      }

    }


  }
  updateClock();
  timeinterval = setInterval(updateClock, 1000);


}
function setMainClock(){
  var deadline = new Date(Date.parse(new Date()) + 15 * 1000);

  chrome.storage.local.set({'mainDeadline': deadline.getTime()}, function() {
          // Notify that we saved.
          console.log('saved Maindeadline: '+deadline);
        });
  //clearInterval(timeinterval);
  initializeClock('clockdiv', deadline);

}

function setSmallClock(){
  //clearInterval(timeinterval);
    var deadline = new Date(Date.parse(new Date()) + 10 * 1000);
      chrome.storage.local.set({'breakDeadline': deadline.getTime()}, function() {
          // Notify that we saved.
          console.log('saved breakDeadline: '+deadline);
        });
  initializeClock('breakdiv', deadline);

}
document.getElementById("resetTime").onclick = setMainClock;
document.getElementById("resetSmallTime").onclick = setSmallClock;

chrome.storage.local.get('mainDeadline', function (result) {
        var mainDeadline = new Date(parseInt(result.mainDeadline));
        var breakDeadline = new Date(parseInt(result.breakDeadline));


        console.log("break: " + breakDeadline);
        console.log("main: "+mainDeadline);
      if(getTimeRemaining(mainDeadline).total>0){
        console.log("Loaded mainDeadline: " +mainDeadline);
        initializeClock('clockdiv', mainDeadline);
      }
      else if (getTimeRemaining(breakDeadline).total>0){
        console.log("Loaded mainDeadline: " +breakDeadline);
        initializeClock('breakdiv', breakDeadline);
      }
      else if (mainDeadline>breakDeadline){
        setSmallClock();
      }
      else{
        setMainClock();
      } 
    });

//setMainClock();

