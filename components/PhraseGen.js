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

    this.state = { phrase: '' };
  }

  randNumFromArray(len) {
    return parseInt(Math.random() * len);
  }

  handleClick(words) {
    let adj = words['adjectives'];
    let nouns = words['nouns'];

    this.setState({ phrase: `${adj[this.randNumFromArray(adj.length)]} ${adj[this.randNumFromArray(adj.length)]}
                             ${nouns[this.randNumFromArray(nouns.length)]}` });
  }

  render() {
    let words = this.props.data.map((words) => {
      return words;
    })[0];

    let content = <div></div>;
    if (words) {
      content = <div>
                  <p className="result">{ `${this.personName} ${this.personalMessage} ${this.state.phrase}` }</p>
                  <button className="generator" onClick={ this.handleClick.bind(this, words) }>Create</button>
                </div>
    }

    return (
      content
    );
  }
}

// class Content extends Generator {
//   constructor() {
//     super();

//     this.state = { phrase: '' };
//   }

//   render() {
//     return (
//       <p id="content">{ this.state.phrase }</p>
//     );
//   }
// }

window.App.PhraseGen = PhraseGen;