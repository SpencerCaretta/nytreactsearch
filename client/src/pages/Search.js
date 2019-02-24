import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Search extends Component {
    state = {
      books: [],
      googleSearch: ""
    };
  
    // componentDidMount() {
    //   this.loadBooks();
    // }
  
    // loadBooks = () => {
    //   API.getBooks()
    //     .then(res =>
    //       this.setState({ books: res.data, title: "", author: "", description: "", image: "", link: "" })
    //     )
    //     .catch(err => console.log(err));
    // };
  
    // deleteBook = id => {
    //   API.deleteBook(id)
    //     .then(res => this.loadBooks())
    //     .catch(err => console.log(err));
    // };
  
    handleInputChange = event => {
      const { name, value } = event.target;
      this.setState({
        [name]: value
      });
    };
  
    handleGoogleSubmit = event => {
      event.preventDefault();
      if (this.state.title) {
        API.googleBooks(this.state.googleSearch)
          .then(res => this.setState({ bookResults: res.data.items }))
          .catch(err => console.log(err));
      }
    };
  
    render() {
      return (
        <Container fluid>
          <Row>
            <Col size="md-12">
              <Jumbotron>
              </Jumbotron>
              <form>
                <Input
                  value={this.state.googleSearch}
                  onChange={this.handleInputChange}
                  name="title"
                  placeholder="Title (required)"
                />
                <FormBtn
                  disabled={!(this.state.googleSearch)}
                  onClick={this.handleGoogleSubmit}
                >
                  Search
                </FormBtn>
              </form>
            </Col>
          </Row>
          <Row>
            <Col size="md-12">
              {this.state.books.length ? (
                <List>
                  {this.state.books.map(book => (
                    <ListItem key={book._id}>
                      <Link to={"/books/" + book._id}>
                        <strong>
                          {book.title} by {book.author}
                        </strong>
                      </Link>
                      <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>No Results to Display</h3>
              )}
            </Col>
          </Row>
        </Container>
      );
    }
  }
  
  export default Search;
  