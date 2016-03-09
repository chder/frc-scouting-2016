
/*
* localStorage values:
*
* lastTeam = 
*
* 
* 
*/

var sectionNames = ["finish-mode", "init-views", "setup-mode", "match-mode", "prototype"];
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

var scoreTap = { "goalhigh" : [24, 93, 101, 214]};

var defenseDiv = document.getElementById("defenses");

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
  console.log(imgs);

  for (i = 0; i < imgs.length; i++) {
    var img = imgs[i];
    img.addEventListener("click", scoreHandler);
  }
}

var scoutName;
var scoutQuote;
var scoutID;

function loadSettings() {
  var sn = localStorage.getItem("scoutName");
  if (sn.length > 0) scoutName = sn;


}


function pageLoaded() {
  sectionNames.forEach(function (item, index, array) {
  sections.set(item, document.getElementById(item));
  console.log(item + " : " + sections.get(item));
  });

  getTeam();
  addDefenseOptions();
  addLinkifyMatchMode();

  // Toggles to deal with refreshing the page.
  location.hash = "#";
  location.hash = "#" + sectionNames[0];
}

function getTeam() {
  var teamNum = localStorage.getItem("lastTeam");
  if (teamNum === null) teamNum = 635;
  document.getElementById("teamNum").value = teamNum;
}

function setTeam() {
  var thatP = document.getElementById("stuff");
  var teamNum = document.getElementById("teamNum").value;
  localStorage.setItem("lastTeam",teamNum);
  thatP.innerHTML = "And the magic number is: " + teamNum + " at " + Date.now();
}

function prepMatch() {

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
}