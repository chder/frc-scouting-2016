// Chris Derichs 2016
/*
* localStorage values:
*
* lastTeam = 
*
* 
* 
*/

var sectionNames = ["finish-mode", "init-views", "setup-mode", "match-mode", "prototype", "debug"];
var sections = new Map();

var defenses = [
  "def-a-Cheval-de-Frise", 
  "def-a-Portcullis",
  "def-b-Moat",
  "def-b-Ramparts",
  "def-c-Drawbridge",
  "def-c-Sally-Port",
  "def-d-Rock-Wall",
  "def-d-Rough-Terrain",
];

var scoutName;
var scoutQuote;
var scoutID = -1;

var matchNum = -1;

var trackableEvents = new Map();
var rowEntry = {timestamp:{},event:{}};
var matchRecord = {matchNumber:-1, teamNum:-1, data:[]};

var mastersettings = { 
  scoutName:"Uncredited Scout",
  scoutQuote:"I have nothing yet to say.",
  scoutID:-1,
  uploadedMatches:[],
  pendingMatches:[] 
};

var scoreTap = { "goalhigh" : [24, 93, 101, 214]};

var defenseDiv = document.getElementById("defenses");

var eventlog;

function switchSection(section) {
  sections.forEach(function (value, key) {
  var visiblity;
    if (key == section) {
      visiblity = "block";
    }else{
      visiblity = "none";
    }
    value.style.display = visiblity;
  });
}

function hashChangeHandler() {
  // Handles the left navigation bar.
  var section = location.hash.slice(1);
  if (sections.has(section)) {
    switchSection(section);
  }

  saveSettings();
}

function updateDefImage() {
  // Handles the defense selectors on the setup screen.
  var img = document.getElementById("img" + this.id.slice(6));
  var src = document.getElementById(this.value);
  img.src = src.src;
}

var defenseSelectNames = ["select-def1", "select-def2", "select-def3", "select-def4", "select-def5" ];

function addDefenseOptions() {

  defenseSelectNames.forEach(function (defenseSelect, index, array) {
    var d = document.getElementById(defenseSelect);

    if (d.id != "select-def1") {
      defenses.forEach(function (defenseName, index, array) {
        opt = document.createElement("option");
        opt.value = defenseName;
        opt.innerHTML = defenseName.slice(6);
        d.appendChild(opt);
      });
    }

    d.addEventListener("change", updateDefImage);

  });
}

function addLinkifyMatchMode() {
  var imgs = document.getElementsByClassName("def");
  
  for (i = 0; i < imgs.length; i++) {
    var img = imgs[i];
    img.addEventListener("click", scoreHandler);
    trackableEvents[img.id] = 0;
  }
}



function loadSettings() {
  console.log(mastersettings);
  tmp = JSON.parse(localStorage.getItem("MasterSettings"));
  if (tmp === null)
    tmp = mastersettings;

  mastersettings = tmp;
  console.log(mastersettings);
  scoutName.value = mastersettings.scoutName;
}

function saveSettings() {
  setTeam();
  mastersettings.scoutName = scoutName.value;
  localStorage.setItem("MasterSettings", JSON.stringify(mastersettings));
}

function logSomething(something) {
  var hmm = {timestamp:Date.now(), entry:something};
  matchRecord.data.push(hmm);
  eventlog.value = eventlog.value.concat(Date.now() + ", " + something + "\n");
}

function submitIfYouCan() {
  eventlog.value = JSON.stringify(matchRecord);


/*
  // Trying to pop out some CSV but it's late and I can't iterate.
  
  matchRecord.data.forEach(function (data, index, array) {
    trackableEvents[data.entry] = trackableEvents[data.entry] + 1;
  });
  
  var reportL1 = "Line1, matchNum, teamNum, scoutID";
  var reportL2 = "Line2, " + matchNum + ", " + teamNum + ", " + scoutID;

  trackableEvents.forEach(function (value, key, map) {
    reportL1 = reportL1 + ", " + key;
    reportL2 = reportL2 + ", " + value;
  });

  console.log(reportL1);
  console.log(reportL2);
*/

}

function pageLoaded() {
    sectionNames.forEach(function (item, index, array) {
    sections.set(item, document.getElementById(item));
  });

  eventlog = document.getElementById("eventlog");
  scoutName = document.getElementById("scoutName");
  scoutQuote = document.getElementById("scouterComment");

  getTeam();
  addDefenseOptions();
  addLinkifyMatchMode();

  loadSettings();
  if (mastersettings.scoutID < 0) {
    // Something probably unique. Doesn't matter that it won't be secret or guarenteed to be unique. I'm willing to risk collisions.'
    mastersettings.scoutID = Date.now() + "-" + Math.floor((Math.random() * 256 * 256));
  }

  // Toggles to deal with refreshing the page.
  location.hash = "#";
  location.hash = "#" + sectionNames[0];
  logSomething("Begin Report");
}

function getTeam() {
  var teamNum = localStorage.getItem("lastTeam");
  if (teamNum === null) teamNum = 635;
  document.getElementById("teamNum").value = teamNum;
}

function setTeam() {
  var teamNum = document.getElementById("teamNum").value;
  localStorage.setItem("lastTeam",teamNum);
}

function prepMatch() {
  var matchSettings = { alliance:"red", teamNum:"12345", scoutName:scoutName};
  matchNum = document.getElementById("matchNum").value;
  
  logSomething( JSON.stringify(matchSettings) );

}

function setLeftAlliance(team) {
  var thatP = document.getElementById("leftAlliance");
  if (team == 1) {
  thatP.innerHTML = "Blue on left."
  }
  if (team == 2) {
  thatP.innerHTML = "Red on left."
  }
  document.getElementById("leftAllianceSelection").style.display = "none";
  thatP.style.display = "block";
}

function scoreHandler() {
  console.log("[scoreHandler] " + this.id);
  logSomething(this.id);
}