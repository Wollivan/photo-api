import "./App.css";
import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import axios from "axios";
import Photos from "./Photos";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      photos: [],
    };
  }

  // input on page
  // function to handle typing in input to update state
  // function to handle submit using axios

  handleSearchQuery = (event) => {
    this.setState({
      searchQuery: event.target.value,
    });
    console.log(this.state.searchQuery);
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const API = process.env.REACT_APP_API_URL; // http://localhost:3001
      const url = `${API}/photos`; // http://localhost:3001/photos

      const response = await axios.get(url, {
        params: { searchQuery: this.state.searchQuery },
      });
      this.setState({ photos: response.data });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Find Photos About...</Form.Label>
            <Form.Control
              onChange={this.handleSearchQuery}
              type="text"
              placeholder="Enter a search term"
            />
          </Form.Group>
        </Form>

        {this.state.photos && (
          <Photos
            photos={this.state.photos}
            searchQuery={this.state.searchQuery}
          />
        )}
      </>
    );
  }
}

export default App;
