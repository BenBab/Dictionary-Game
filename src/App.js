import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dictValues: [],
      start: "",
      end: ""
    };
  }

  componentWillMount() {
    let dictionary = ["hit", "dot", "dog", "cog", "hot", "log"];
    this.setState({
      dictValues: dictionary,
      start: dictionary[0],
      end: dictionary[0]
    });
  }

  //function used to increment a letter
  nextChar(letter) {
    return String.fromCharCode(letter.charCodeAt(0) + 1);
  }

  dictionaryGame(start, end, dict) {
    if (dict.length === 0) return 0;

    var wordQueue = [];
    var stepQueue = [];

    wordQueue.push(start);
    stepQueue.push(0);
    //debugger;

    var result = 100;
    while (wordQueue.length !== 0) {
      var currentWord = wordQueue.pop();
      var currentStep = stepQueue.pop();

      if (currentWord === end) {
        result = Math.min(result, currentStep);
      }
      //iterate for the length of the word, split the currentWord into an array and check each letter with a new letter
      for (var i = 0; i < currentWord.length; i++) {
        var currCharArr = currentWord.split("");
        //iterate over the alphabet, nextchar function goes to the next letter
        for (var letter = "a"; letter <= "z"; letter = this.nextChar(letter)) {
          currCharArr[i] = letter;
          var newWord = currCharArr.join("");
          //if the word exists push the word into the wordQueue
          if (dict.indexOf(newWord) !== -1) {
            //the wordQueue and stepQueue get updated, then at the beginning of the while-loop it gets popped and used as the next currentword/ currentStep
            wordQueue.push(newWord);
            stepQueue.push(currentStep + 1);
            //index checks the dict for the word, if it exists, then splice it out of the dict array
            var index = dict.indexOf(newWord);
            if (index > -1) {
              dict.splice(index, 1);
            }
          }
        }
      }
    }
    if (result === 100) {
      return "an undetermined amount of";
    } else {
      return result;
    }
  }

  dictionaryList() {
    return this.state.dictValues.map((word, i) => {
      return (
        <option className="dropdown-content" key={i} value={word}>
          {word}
        </option>
      );
    });
  }

  render() {
    let dictWords = this.state.dictValues.slice(0);
    let dictgame = this.dictionaryGame(
      this.state.start,
      this.state.end,
      dictWords
    );

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the Movivo dictionary game</h1>
        </header>
        <p className="App-intro">
          Select a start word and see how many steps it would take to reach the
          end word by only changing one letter at a time.
        </p>

        <div>
          <form>
            <select
              className="dropdown"
              value={this.state.start}
              onChange={event => this.setState({ start: event.target.value })}
            >
              {this.dictionaryList()}
            </select>
            <select
              className="dropdown"
              value={this.state.end}
              onChange={event => this.setState({ end: event.target.value })}
            >
              {this.dictionaryList()}
            </select>
          </form>
        </div>
        <br />
        <label>
          The word {this.state.start} takes  {dictgame} {" "}
          {dictgame === 1 ? "step" : "steps"} to reach the word {this.state.end}
        </label>
      </div>
    );
  }
}

export default App;
