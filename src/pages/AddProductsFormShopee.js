import React, { Component, Fragment } from 'react';
import Select from 'react-select'
import { Alert, Container, Col, Row, Form, FormGroup, Input, Button } from 'reactstrap'
import axios from 'axios';



export default class AddProductsFormShopee extends Component {
  state = {
    tree: null,
    attributeFields: null,
    selectedAttribute1: null,
    selectedAttribute2: null,
    selectedAttribute3: null,
    options1: [],
    options2: null,
    options3: null,
    selectedOption1: null,
    selectedOption2: null,
    selectedOption3: null,
    name: "",
    description: null,
    price: null,
    quantity: null,
    packageWeight: null,
    file: null
  }

  componentDidMount = () => {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:5000/api/v1/products/shopee/tree',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${localStorage.jwt}`
      },
    })
      .then(response => {
        const { data } = response;
        const { tree } = data
        const options1 = tree.filter((category) => (!category.parent_id))
        this.setState({ tree, options1 })
      })
      .catch(error => {
        console.log(error)
      });
  }

  getOptions2 = (selectedOption1) => {
    let firstChildren = this.state.tree.filter((c) => (c.parent_id === selectedOption1.id))
    if (firstChildren) {
      return firstChildren.map((c2) => ({ 'value': c2.category_name, 'label': c2.category_name, 'id': c2.category_id }))
    }
  }

  getOptions3 = (selectedOption2) => {
    let secondChildren = this.state.tree.filter((c) => (c.parent_id === selectedOption2.id))
    if (secondChildren) {
      return secondChildren.map((c3) => ({ 'value': c3.category_name, 'label': c3.category_name, 'id': c3.category_id }))
    }
  }

  handleChange1 = (selectedOption1) => {
    console.log(`Option selected:`, selectedOption1);
    const options2 = this.getOptions2(selectedOption1)
    this.setState({ selectedOption1, options2, options3: null, selectedOption2: null, selectedOption3: null, attributeFields: null });
  };

  handleChange2 = (selectedOption2) => {
    console.log(`Option2 selected:`, selectedOption2);
    const options3 = this.getOptions3(selectedOption2)
    this.setState({ selectedOption2, options3, attributeFields: null });
  }

  handleChange3 = (selectedOption3) => {
    console.log(`Option3 selected:`, selectedOption3);
    axios({
      method: 'post',
      url: 'http://127.0.0.1:5000/api/v1/products/shopee/attributes',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${localStorage.jwt}`
      },
      data: {
        id: selectedOption3.id,
      }
    })
      .then(response => {
        const { attributes } = response.data;
        const attributeFields = attributes.filter((attribute) => attribute.is_mandatory)
        this.setState({ selectedOption3, attributeFields, selectedAttribute1: null, selectedAttribute2: null, selectedAttribute3: null });
      })
  }


  handleSubmit = (e) => {
    const { selectedOption3, price, quantity, packageWeight, name, description, selectedAttribute1, selectedAttribute2, selectedAttribute3, file } = this.state
    e.preventDefault()
    let formData = new FormData()
    formData.set('id', selectedOption3.id)
    formData.set('attribute1Id', selectedAttribute1 ? selectedAttribute1.id : {})
    formData.set('attribute1Value', selectedAttribute1 ? selectedAttribute1.value : {})
    formData.set('attribute2Id', selectedAttribute2 ? selectedAttribute2.id : {})
    formData.set('attribute2Value', selectedAttribute2 ? selectedAttribute2.value : {})
    formData.set('attribute3Id', selectedAttribute3 ? selectedAttribute3.id : {})
    formData.set('attribute3Value', selectedAttribute3 ? selectedAttribute3.value : {})
    formData.set('name', name)
    formData.set('description', description)
    formData.set('price', price)
    formData.set('quantity', quantity)
    formData.set('package_weight', packageWeight)
    formData.append('image', file)

    debugger
    axios({
      method: 'post',
      url: 'http://127.0.0.1:5000/api/v1/products/shopee/new',
      headers: {
        'content-type': 'multipart/form-data',
        'authorization': `Bearer ${localStorage.jwt}`
      },
      data: formData
    })
      .then(response => {
        const { data } = response;
        this.setState({})
      })
      .catch(error => {
        console.log(error)
      });
  }

  handleInput = (event) => {
    if (event.name) {
      console.log(`attr selected:`, event);
      const field = event.name
      const value = event.value
      if (event.name === 'attribute1') {
        const selectedAttribute1 = event
        this.setState({ [field]: value, selectedAttribute1 })
      }
      if (event.name === 'attribute2') {
        const selectedAttribute2 = event
        this.setState({ [field]: value, selectedAttribute2 })
      }
      if (event.name === 'attribute3') {
        const selectedAttribute3 = event
        this.setState({ [field]: value, selectedAttribute3 })
      }
    } else {
      const field = event.target.name
      const value = event.target.value
      this.setState({
        [field]: value
      })
    }
  }
  getImage = (event) => {
    const file = event.target.files[0]
    this.setState({ file })
  }

  render() {
    return (

      <Container fluid className="h-100">
        <Row className="h-100">
          <Col md="12" className="h-100 d-flex align-items-start flex-column" >
            <Form className="m-auto w-100 p-5" onSubmit={this.handleSubmit}>
              <FormGroup>
                <Select
                  name="category"
                  value={this.state.selectedOption1}
                  onChange={this.handleChange1}
                  options={this.state.options1.map((option) => ({ label: option.category_name, value: option.category_name, id: option.category_id }))}
                  placeholder={'Target Category'}
                  required
                />
                {this.state.options2 ?
                  <>
                    <br />
                    <Select
                      className=""
                      name="sub-category"
                      value={this.state.selectedOption2}
                      onChange={this.handleChange2}
                      options={this.state.options2}
                      placeholder="Sub-Category"
                      required />
                  </> : null}
                {this.state.options3 ?
                  <>
                    <br />
                    <Select
                      className=""
                      name="sub-sub-category"
                      value={this.state.selectedOption3}
                      onChange={this.handleChange3}
                      options={this.state.options3}
                      placeholder="Leaf Category"
                      required />
                  </> : null}
                {this.state.attributeFields ? this.state.attributeFields.map((attributeField, index) =>
                  <Fragment key={index}>
                    <br />
                    <Select
                      className=""
                      name={attributeField.attribute_name}
                      value={index == 0 ? this.state.selectedAttribute1 : index == 1 ? this.state.selectedAttribute2 : this.stateselectedAttribute3}
                      onChange={this.handleInput}
                      options={attributeField.options.map((option) => ({ label: option, value: option, name: `attribute${index + 1}`, id: attributeField.attribute_id }))}
                      placeholder={attributeField.attribute_name}
                      required />
                  </Fragment>) : null}
                <br />
                <Input onInput={this.handleInput}
                  className=""
                  name="name"
                  placeholder="Product Name"
                  required
                />
                <br />
                <Input onInput={this.handleInput}
                  className=""
                  name="description"
                  placeholder="Description"
                  required
                /> {this.state.description && this.state.description.length < 20 ? <span className='text-danger'>must be > 20</span> : null}
                <br />
                <Input onInput={this.handleInput}
                  className=""
                  name="price"
                  type='number'
                  step="0.01"
                  placeholder="Price (MYR)"
                  required
                />
                <br />
                <Input onInput={this.handleInput}
                  className=""
                  name="quantity"
                  type='number'
                  placeholder="Quantity"
                  required
                />
                <br />
                <Input onInput={this.handleInput}
                  className=""
                  name="packageWeight"
                  type='number'
                  step="0.01"
                  placeholder="Package Weight (Kg)"
                  required
                />
                <br />
                <Input
                  className=""
                  name="image"
                  type='file'
                  onChange={this.getImage}
                  placeholder="Upload Image"
                  required
                />
                <div className="d-flex flex-row mt-3">
                  <Button className="btn btn-danger" value="submit" type="submit">
                    Send Product!
                    </Button>
                </div>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}