'use strict'

{

  const WORDS_FILE_NAME = 'words_example.json';
  const PERSON_NAME = '%username%';
  const PERSONAL_MESSAGE = 'you are';
  const IMAGES_NUM = 16;

  let words;
  let adj;
  let nouns;
  let adj_len;
  let noun_len;

  let loadedImgs = [];

  let bodyEl = document.getElementsByTagName('body')[0];
  let contentEl = document.getElementById('content');
  let generatorEl = document.getElementById('generator');
  let preloadEl = document.getElementById('preload');

  let bgs = createBg('bg', IMAGES_NUM, 'png');

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

  // Functions

  function generate() {
    contentEl.textContent = `${PERSON_NAME} ${PERSONAL_MESSAGE} ${adj[randNumFromArray(adj_len)]}
                           ${adj[randNumFromArray(adj_len)]} ${nouns[randNumFromArray(noun_len)]}`;
  }

  function createBg(name, num, ext) {
    let arr = Array.apply(null, Array(num));
    return arr.map(function (x, i) {
      return name + (i + 1) + '.' + ext;
    });
  }

  function loadImg(src, callback) {
      let img = new Image();
      img.onload = callback;
      img.src = src;
  }

  function preloadImgs(imgs) {
    for (let i = 0; i < imgs.length; i++) {
      let imgSrc = 'img/' + imgs[i];
      loadImg(imgSrc, function() {
        console.log('done ', imgSrc);
        return loadedImgs.push(imgSrc);
      });
    }
  }


  preloadImgs(bgs);

  function prepareImages(img) {
    let imgs = imgs ? imgs : [];
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
    let imageUrl = 'img/' + bgs[randNumFromArray(bgs.length)];
    bodyEl.style.backgroundImage = 'url(' + imageUrl + ')';
  }

  // Event listeners

  generatorEl.addEventListener("click", generate, false);

}
