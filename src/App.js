import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    listItems: [],
    search: '',
    };
  }
  onChange = (event) => {
    this.setState({search: event.target.value});
  };
  buttonPressed = () => {
    console.log("testi");
    fetch("https://api.github.com/search/repositories?q="+ this.state.search )
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        listItems: responseData.items,
      });
    })
  } 

  render() {
    const itemRows = this.state.listItems.map((items, i) =>
    <tr key={items.id}>
      <td>{items.full_name}</td>
      <td>{items.owner.url}</td>
    </tr>
  )
    return (
      <div>
        <h2>Repositories</h2>
          <input type="text" onChange={this.onChange} value={this.state.search}/>
          <button onClick={this.buttonPressed}>Search</button>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>URL</th>
            </tr>
              {itemRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
