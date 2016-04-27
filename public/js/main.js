// (function () {

  // Preload images (setTimeout for slideshow, not by button)
  // Use ES6
  // clean up code
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
  var IMAGESNUM = 22;

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
  }

  function createBg(name, num, ext) {
    var arr = Array.apply(null, Array(num));
    return arr.map(function (x, i) {
      return name + (i + 1) + '.' + ext;
    });
  }

    function loadSprite(src, callback) {
        var sprite = new Image();
        sprite.onload = callback;
        sprite.src = src;
    }

    var loadedImgs = [];
    function preloadImgs(imgs) {
      for (i = 0; i < imgs.length; i++) {
        var imgSrc = 'img/' + imgs[i];
        loadSprite(imgSrc, function() {
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
    var imageUrl = 'img/' + bgs[randNumFromArray(bgs_len)];
    body.style.backgroundImage = 'url(' + imageUrl + ')';
  }

  // Event listeners

  generator.addEventListener("click", generate, false);

  // Start
  // preloadBg();
  // randBgImage();

// })()
