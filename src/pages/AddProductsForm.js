import React, { Component } from 'react';
import Select from 'react-select'
import { Alert, Container, Col, Row, Form, FormGroup, Input, Button } from 'reactstrap'
import axios from 'axios';
import _ from 'underscore'
import ColorOptions from '../containers/colorOptions';


export default class AddProductsForm extends Component {
  state = {
    tree: null,
    brandOptions: [],
    options1: [],
    options2: null,
    options3: null,
    selectedOption1: null,
    selectedOption2: null,
    selectedOption3: null,
    name: "",
    description: "",
    brand: null,
    color: null,
    selectedColor: null,
    selectedBrand: null,
    price: null,
    packageContent: "",
    quantity: null,
    packageWeight: null,
    packageLength: null,
    packageWidth: null,
    packageHeight: null,
    colorOptions: ColorOptions()
  }

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
        const { tree, brands } = data
        const options1 = tree.map((category) => (
          { 'value': category.name, 'label': category.name, 'id': category.category_id }
        ))
        const brandOptions = brands.map((brand) => (
          { 'value': brand.name, 'label': brand.name, 'name': "brand" }
        ))
        this.setState({ tree, options1, brandOptions })
      })
      .catch(error => {
        console.log(error)
      });
  }

  getOptions2 = (selectedOption1) => {
    let firstChildren = this.state.tree.map((c) => (c.children))[this.state.options1.findIndex(x => x.value === selectedOption1.value)]
    if (firstChildren) {
      return firstChildren.map((c2) => ({ 'value': c2.name, 'label': c2.name, 'id': c2.category_id }))
    }
  }

  getOptions3 = (selectedOption2) => {
    let firstChildren = this.state.tree.map((c) => (c.children))[this.state.options1.findIndex(x => x.value === this.state.selectedOption1.value)]
    let secondChildren = firstChildren.map((c2) => (c2.children))[this.state.options2.findIndex(x => x.value === selectedOption2.value)]
    if (secondChildren) {
      return secondChildren.map((c3) => ({ 'value': c3.name, 'label': c3.name, 'id': c3.category_id }))
    }
  }

  handleChange1 = (selectedOption1) => {
    console.log(`Option selected:`, selectedOption1);
    const options2 = this.getOptions2(selectedOption1)
    this.setState({ selectedOption1, options2, options3: null, selectedOption2: null, selectedOption3: null });
  };

  handleChange2 = (selectedOption2) => {
    console.log(`Option2 selected:`, selectedOption2);
    const options3 = this.getOptions3(selectedOption2)
    this.setState({ selectedOption2, options3, selectedOption3: null });
  }

  handleChange3 = (selectedOption3) => {
    console.log(`Option3 selected:`, selectedOption3);
    // const options4 = this.getOptions4(selectedOption3)
    this.setState({ selectedOption3 });
  }

  handleSubmit = (e) => {
    const { selectedOption1, selectedOption2, selectedOption3, brand, price, quantity, packageContent, packageWeight, packageHeight, packageLength, packageWidth, name, description, color } = this.state
    e.preventDefault()
    let time = parseInt(new Date().getTime() / 1000)
    let primaryCategoryId
    if (selectedOption3) {
      primaryCategoryId = selectedOption3.id
    } else if (selectedOption2) {
      primaryCategoryId = selectedOption2.id
    } else {
      primaryCategoryId = selectedOption1.id
    }
    axios({
      method: 'post',
      url: 'http://127.0.0.1:5000/api/v1/products/lazada/new',
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${localStorage.jwt}`
      },
      data: {
        id: primaryCategoryId,
        name: name,
        description: description,
        brand: brand,
        price: price,
        color: color,
        quantity: quantity,
        package_content: packageContent,
        package_height: packageHeight,
        package_weight: packageWeight,
        package_width: packageWidth,
        package_length: packageLength,
        payload: `
        <?xml version=\"1.0\" encoding=\"UTF-8\" ?> <Request>
            <Product>
                <PrimaryCategory>${primaryCategoryId}</PrimaryCategory>
                <SPUId></SPUId>         <AssociatedSku></AssociatedSku>
                <Attributes>
                    <name>${name}</name>
                    <short_description>${description}</short_description>
                    <SellerSku>MarketBucket-create-${time}</SellerSku>
                    <warranty_type>No Warranty</warranty_type>
                    <brand>${brand}</brand>
                    <tax_class>default</tax_class>
                    <model>asdf</model>
                </Attributes>
                <Skus>
                    <Sku>
                        <SellerSku>MarketBucket-create-${time}</SellerSku>
                        <price>${price}</price>
                        <quantity>${quantity}</quantity>
                        <package_content>${packageContent}</package_content>
                        <package_weight>${packageWeight}</package_weight>
                        <package_length>${packageLength}</package_length>
                        <package_width>${packageWidth}</package_width>
                        <package_height>${packageHeight}</package_height>
                        <Images>
                        <Image></Image> 
                        </Images>
                    </Sku>
                </Skus>
            </Product>
        </Request>`}
    })
      .then(response => {
        debugger
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

  handleInput = (event) => {
    if (event.name) {
      const field = event.name
      const value = event.value
      const selectedColor = event
      this.setState({
        [field]: value,
        selectedColor
      })
    } else {
      const field = event.target.name
      const value = event.target.value
      this.setState({
        [field]: value
      })
    }
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
                  options={this.state.options1}
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
                      placeholder="Sub-Category" />
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
                    />
                  </> : null}
                <br />
                <Select
                  className=""
                  name="brand"
                  value={this.state.selectedBrand}
                  onChange={this.handleInput}
                  options={this.state.brandOptions}
                  placeholder="Brand"
                  required
                />
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
                  placeholder="Short Description"
                  required
                />
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
                  step="0.01"
                  placeholder="Quantity"
                  required
                />
                <br />
                <Select
                  className=""
                  name="color"
                  value={this.state.selectedColor}
                  onChange={this.handleInput}
                  options={this.state.colorOptions.map((color) => ({ label: color.name, value: color.name, name: 'color' }))}
                  placeholder="Color Family"
                />
                <br />
                <Input onInput={this.handleInput}
                  className=""
                  name="packageContent"
                  type='text'
                  placeholder="Package Content"
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
                <p className='text-muted'>Package Dimensions (cm)</p>
                <Input onInput={this.handleInput}
                  className=""
                  name="packageHeight"
                  type='number'
                  step="0.01"
                  placeholder="Height"
                  required
                />
                <Input onInput={this.handleInput}
                  className=""
                  name="packageWidth"
                  type='number'
                  step="0.01"
                  placeholder="Width"
                  required
                />
                <Input onInput={this.handleInput}
                  className=""
                  name="packageLength"
                  type='number'
                  step="0.01"
                  placeholder="Length"
                  required
                />
                <div className="d-flex flex-row mt-3 ml-1">
                  <Button className="btn btn-warning" value="submit" type="submit">
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