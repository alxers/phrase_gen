class PhraseGen extends React.Component {
  render() {
    return (
      <Generator data="data" />
    );
  }
}

class Generator extends PhraseGen {
  constructor() {
    super();
    
    const WORDS_FILE_NAME = 'words_example.json';
    const PERSON_NAME = '%username%';
    const PERSONAL_MESSAGE = 'you are';
    const IMAGES_NUM = 16;

    let words;
    let adj;
    let nouns;
    let adjLen;
    let nounLen;
  }

  loadJSON(callback) {   
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

  init() {
   loadJSON(function(response) {
      words = JSON.parse(response);
      adj = words['adjectives'];
      nouns = words['nouns'];

      adjLen = words['adjectives'].length;
      nounLen = words['nouns'].length;
   });
  }

  render() {
    return (
      <div className="center">
        <p id="content">{this.props.data}</p>
        <button id="generator">Create</button>
      </div>
    );
  }
}

window.App.PhraseGen = PhraseGen;