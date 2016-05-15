'use strict'

{

  const WORDS_FILE_NAME = 'words_example.json';
  const PERSON_NAME = '%username%';
  const PERSONAL_MESSAGE = 'you are';
  const IMAGES_NUM = 16;

  function loadJSON(callback) {   

    let xmlhttp = new XMLHttpRequest();
        xmlhttp.overrideMimeType("application/json");
    xmlhttp.open('GET', WORDS_FILE_NAME, true);
    xmlhttp.onreadystatechange = function () {
          if (xmlhttp.readyState == 4 && xmlhttp.status == "200") {
            callback(xmlhttp.responseText);
          }
    };
    xmlhttp.send(null);  
  }

  var words;
  var adj_len,
      noun_len;

  var adj,
      nouns;

  var loadedImgs = [];

  function init() {
   loadJSON(function(response) {
      words = JSON.parse(response);
      adj = words['adjectives'];
      nouns = words['nouns'];

      adj_len = words['adjectives'].length;
      noun_len = words['nouns'].length;
   });
  }

  init();

  var bgs = createBg('bg', IMAGES_NUM, 'png');
  var bgs_len = bgs.length;

  var btnClicks = 0;

  var doc = document,
      body = doc.getElementsByTagName('body')[0],
      content = doc.getElementById('content'),
      generator = doc.getElementById('generator'),
      preloadEl = doc.getElementById('preload');

  // Functions

  function generate() {
    content.textContent = `${PERSON_NAME} ${PERSONAL_MESSAGE} ${adj[randNumFromArray(adj_len)]}
                           ${adj[randNumFromArray(adj_len)]} ${nouns[randNumFromArray(noun_len)]}`;
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
    for (let i = 0; i < imgs.length; i++) {
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
    var imageUrl = 'img/' + bgs[randNumFromArray(bgs_len)];
    body.style.backgroundImage = 'url(' + imageUrl + ')';
  }

  // Event listeners

  generator.addEventListener("click", generate, false);

}
