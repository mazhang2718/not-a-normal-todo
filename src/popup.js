
document.getElementById("confirm").addEventListener("click", function(){


  var id1 = document.getElementById("t1").checked;
  var id2 = document.getElementById("t2").checked;
  var id3 = document.getElementById("t3").checked;
  var id4 = document.getElementById("t4").checked;
  var id5 = document.getElementById("t5").checked;

  if (id1 || id2 || id3 || id4 || id5){
    document.getElementById("t1").checked = false;
    document.getElementById("t2").checked = false;
    document.getElementById("t3").checked = false;
    document.getElementById("t4").checked = false;
    document.getElementById("t5").checked = false;

    document.getElementById('positive').style.display = "inline";
    document.getElementById('negative').style.display = "none";
    document.getElementById('outOfTime').style.display = "none";

    chrome.storage.sync.set({'block': false});

    var futureTime = Date.now() + 24*60*60*(1000);
    chrome.storage.sync.set({'futureTime': futureTime});

    chrome.alarms.create("test", {'when': (futureTime)});

  }
  else{
    document.getElementById('outOfTime').style.display = "none";
    document.getElementById('positive').style.display = "none";
    document.getElementById('negative').style.display = "inline";
    //chrome.storage.sync.set({'block': true});
    console.log('failure');
  }


});

setInterval(function(){
  chrome.storage.sync.get('futureTime',
    function(object){
      console.log(object);
      var difference = (object.futureTime - Date.now())/(60*1000);

      if (difference < 0){
        document.getElementById('outOfTime').style.display = "inline";
        document.getElementById('positive').style.display = "none";
        document.getElementById('negative').style.display = "none";
      }
      else{
        document.getElementById('outOfTime').style.display = "none";
        document.getElementById('positive').style.display = "inline";
        document.getElementById('negative').style.display = "none";
        document.getElementById('minutes').innerHTML = parseInt(difference);
      }
    })
}, 1000)