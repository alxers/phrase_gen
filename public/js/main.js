var WORDS_FILE_NAME = 'words_example.json';
var PERSON_NAME = '%username%';
var PERSONAL_MESSAGE = 'you are';

var IMAGES_NUM = 16;

var words;
var adj;
var nouns;
var adjLen;
var nounLen;

var loadedImgs = [];

var bodyEl = document.getElementsByTagName('body')[0];
var contentEl = document.getElementById('content');
var generatorEl = document.getElementById('generator');
var preloadEl = document.getElementById('preload');

var bgs = createBg('bg', IMAGES_NUM, 'jpg');

function loadJSON(callback) {   

  var xmlhttp = new XMLHttpRequest();
      xmlhttp.overrideMimeType("application/json");
  xmlhttp.open('GET', WORDS_FILE_NAME, true);
  xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == "200") {
          callback(xmlhttp.responseText);
        }
  };
  xmlhttp.send(null);  
}

function init() {
 loadJSON(function(response) {
    words = JSON.parse(response);
    adj = words['adjectives'];
    nouns = words['nouns'];

    adjLen = words['adjectives'].length;
    nounLen = words['nouns'].length;
 });
}

init();

// Functions

function generate() {
  contentEl.textContent = `${PERSON_NAME} ${PERSONAL_MESSAGE} ${adj[randNumFromArray(adjLen)]}
                         ${adj[randNumFromArray(adjLen)]} ${nouns[randNumFromArray(nounLen)]}`;
}

function createBg(name, num, ext) {
  var arr = Array.apply(null, Array(num));
  return arr.map(function (x, i) {
    return name + (i + 1) + '.' + ext;
  });
}

function loadImg(src, callback) {
    var img = new Image();
    img.onload = callback;
    img.src = src;
}

function preloadImgs(imgs) {
  for (var i = 0; i < imgs.length; i++) {
    var imgSrc = 'img/' + imgs[i];
    loadImg(imgSrc, function() {
      console.log('done ', imgSrc);
      return loadedImgs.push(imgSrc);
    });
  }
}


preloadImgs(bgs);

function prepareImages(img) {
  var imgs = imgs ? imgs : [];
  console.log('tick', imgs);
  return imgs.push(img);
}

function startSlideShow() {
  setInterval(function() {
    console.log('tick');
    if (loadedImgs.length === bgs.length) {
      randBgImage();
    }
  }, 10000)
}

startSlideShow();

function randNumFromArray(len) {
  return parseInt(Math.random() * len);
}

function randBgImage() {
  var imageUrl = 'img/' + bgs[randNumFromArray(bgs.length)];
  bodyEl.style.backgroundImage = 'url(' + imageUrl + ')';
}

// Event listeners

generatorEl.addEventListener("click", generate, false);
