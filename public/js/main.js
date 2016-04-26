// (function () {

  // Preload images
  // Use ES6
  // Use React?

function loadJSON(callback) {   

  var xobj = new XMLHttpRequest();
      xobj.overrideMimeType("application/json");
  xobj.open('GET', 'words.json', true);
  xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
          // Required use of an anonymous callback as .open will NOT return a value but simply
          // returns undefined in asynchronous mode
          callback(xobj.responseText);
        }
  };
  xobj.send(null);  
}

var words;
var adj_len,
    noun_len;

var ADJ,
    NOUNS;

function init() {
 loadJSON(function(response) {
  // Parse JSON string into object
    words = JSON.parse(response);
    ADJ = words['adjectives'];
    NOUNS = words['nouns'];

    adj_len = words['adjectives'].length;
    noun_len = words['nouns'].length;
 });
}

init();


  var BGCHANGELIMIT = 11;
  var IMAGESNUM = 21;

  var bgs = createBg('bg', IMAGESNUM, 'png');
  var bgs_len = bgs.length;

  var btnClicks = 0;

  var doc = document,
      body = doc.getElementsByTagName('body')[0],
      content = doc.getElementById('content'),
      generator = doc.getElementById('generator'),
      preloadEl = doc.getElementById('preload');

  // Functions

  function generate(){
    btnClicks += 1;
    content.textContent = 'Лолита, ты - ' + ' ' +
                          ADJ[randNumFromArray(adj_len)] + ' ' +
                          ADJ[randNumFromArray(adj_len)] + ' ' +
                          NOUNS[randNumFromArray(noun_len)];
    if (btnClicks === BGCHANGELIMIT) {
      btnClicks = 0;
      randBgImage();
    }
  }

  function createBg(name, num, ext) {
    var arr = Array.apply(null, Array(num));
    return arr.map(function (x, i) {
      return name + (i + 1) + '.' + ext;
    });
  }

  function preload() {
    var images = new Array()
        for (i = 0; i < preload.arguments[0].length; i++) {
          images[i] = new Image()
          images[i].src = 'img/' + preload.arguments[0][i];
        }
      }

      preload(bgs);

  function randNumFromArray(len) {
    return parseInt(Math.random() * len);
  }

  function randBgImage() {
    var imageUrl = 'img/' + bgs[randNumFromArray(bgs_len)];
    body.style.backgroundImage = 'url(' + imageUrl + ')';
  }

  // Event listeners

  generator.addEventListener("click", generate, false);

  // Start
  // preloadBg();
  // randBgImage();

// })()
