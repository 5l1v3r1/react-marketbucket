import React, { Component } from 'react';
import Select from 'react-select'
import { Alert, Container, Col, Row, Form, FormGroup, Input, Button } from 'reactstrap'
import axios from 'axios';

export default class AddProductsForm extends Component {
  state = {
    tree: null,
    options1: [],
    options2: null,
    options3: null,
    selectedOption: {},
    selectedOption2: {},
    selectedOption3: {}
  };

  componentDidMount = () => {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:5000/api/v1/products/lazada/tree',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${localStorage.jwt}`
      },
    })
      .then(response => {
        const { data } = response;
        const { tree } = data
        const options1 = tree.map((category) => (
          { 'value': category.name, 'label': category.name, 'id': category.category_id }
        ))
        this.setState({ tree, options1 })
      })
      .catch(error => {
        console.log(error)
      });
  }

  getOptions2 = (selectedOption) => {
    debugger
    let firstChildren = this.state.tree.map((c) => (c.children))[this.state.options1.indexOf(selectedOption)]
    if (firstChildren) {
      return firstChildren.map((c2) => (c2.name))
    }
  }

  getOptions3 = (selectedOption2) => {
    let firstChildren = this.state.tree.map((c) => (c.children))[this.state.options1.indexOf(this.state.selectedOption.value)]
    let secondChildren = firstChildren.map((c2) => (c2.children))[this.state.options2.indexOf(selectedOption2.value)]
    if (secondChildren) {
      return secondChildren.map((c3) => (c3.name))
    }
  }

  handleChange1 = (selectedOption) => {
    console.log(`Option selected:`, selectedOption);
    const options2 = this.getOptions2(selectedOption)
    this.setState({ selectedOption, options2, options3: null, selectedOption2: null, selectedOption3: null });
  };

  handleChange2 = (selectedOption2) => {
    console.log(`Option2 selected:`, selectedOption2);
    const options3 = this.getOptions3(selectedOption2)
    this.setState({ selectedOption2, options3, selectedOption3: null });
  }

  handleChange3 = (selectedOption3) => {
    console.log(`Option3 selected:`, selectedOption3);
    // const options3 = this.getOptions3(selectedOption2)
    this.setState({ selectedOption3 });
  }

  render() {

    return (
      <Container fluid className="h-100">
        <Row className="h-100">
          <Col md="12" className="h-100 d-flex align-items-start flex-column" >
            <Form className="m-auto w-100 p-5">
              <FormGroup>
                <p>Target Category</p>
                <Select
                  name="form-field-name"
                  value={this.state.selectedOption1}
                  onChange={this.handleChange1}
                  options={this.state.options1.map((c) => ({ value: c.value, label: c.label, id: c.id }))}
                />
                {this.state.options2 ?
                  <>
                    <br />
                    <p>Sub-Category</p>
                    <Select
                      name="form-field-name"
                      value={this.state.selectedOption2}
                      onChange={this.handleChange2}
                      options={this.state.options2.map((c) => ({ value: c, label: c }))} />
                  </> : null}
                {this.state.options3 ?
                  <>
                    <br />
                    <p>Almost there...</p>
                    <Select
                      name="form-field-name"
                      value={this.state.selectedOption3}
                      onChange={this.handleChange3}
                      options={this.state.options3.map((c) => ({ value: c, label: c }))} />
                  </> : null}
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}