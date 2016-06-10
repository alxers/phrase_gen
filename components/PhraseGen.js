class PhraseGen extends React.Component {

  constructor() {
    super();

    this.fileName = 'words_example.json';
    this.state = { data: [] };
  }

  loadJSON(callback) {   
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.overrideMimeType("application/json");
    xmlhttp.open('GET', this.fileName, true);
    xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4 && xmlhttp.status == "200") {
        callback(xmlhttp.responseText);
      }
    };
    xmlhttp.send(null);  
  }

  getData() {
   this.loadJSON((response) => {
      this.setState({ data: [JSON.parse(response)] });
   });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <Generator data={ this.state.data } />
    );
  }
}

class Generator extends PhraseGen {
  constructor() {
    super();
    
    this.personName = '%username%';
    this.personalMessage = 'you are';
    this.imagesNum = 16;

    this.adj = [];
    this.nouns = [];

  }

  randNumFromArray(len) {
    return parseInt(Math.random() * len);
  }

  render() {
    let content = this.props.data.map((words) => {
      return words;
    });

    let adj = content['adjectives'];
    let nouns = content['nouns'];

    return (
      <div className="center">
        <p id="content"><span>{ `${this.personName} ${this.personalMessage} 
                                 ${adj[this.randNumFromArray(adj.length)]} ${adj[this.randNumFromArray(adj.length)]}
                                 ${nouns[this.randNumFromArray(nouns.length)]}` }</span></p>
        <button id="generator">Create</button>
      </div>
    );
  }
}

window.App.PhraseGen = PhraseGen;