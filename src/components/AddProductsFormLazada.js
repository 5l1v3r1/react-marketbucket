import React, { Component } from 'react';
import Select from 'react-select'
import { Alert, Col, Form, FormGroup, Input, Button } from 'reactstrap'
import axios from 'axios';
import ColorOptions from '../containers/ColorOptions';
import BrandOptions from '../containers/BrandsLazada';
import { Redirect } from 'react-router-dom'


export default class AddProductsFormLazada extends Component {
  state = {
    tree: null,
    brandOptions: BrandOptions(),
    options1: [],
    options2: null,
    options3: null,
    options4: null,
    selectedOption1: null,
    selectedOption2: null,
    selectedOption3: null,
    selectedOption4: null,
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
    file: null,
    colorOptions: ColorOptions(),
    message: null,
    redirect: false,
    errors: null,
    hasError: false,
    isLoading: false
  }

  componentDidMount = () => {
    axios({
      method: 'get',
      url: 'https://marketbucket.herokuapp.com/api/v1/products/lazada/tree',
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

  getOptions4 = (selectedOption3) => {
    let firstChildren = this.state.tree.map((c) => (c.children))[this.state.options1.findIndex(x => x.value === this.state.selectedOption1.value)]
    let secondChildren = firstChildren.map((c2) => (c2.children))[this.state.options2.findIndex(x => x.value === this.state.selectedOption2.value)]
    let thirdChildren = secondChildren.map((c3) => (c3.children))[this.state.options3.findIndex(x => x.value === selectedOption3.value)]
    if (thirdChildren) {
      return thirdChildren.map((c4) => ({ 'value': c4.name, 'label': c4.name, 'id': c4.category_id }))
    }
  }

  handleChange1 = (selectedOption1) => {
    console.log(`Option selected:`, selectedOption1);
    const options2 = this.getOptions2(selectedOption1)
    this.setState({ selectedOption1, options2, options3: null, selectedOption2: null, selectedOption3: null, selectedOption4: null });
  };

  handleChange2 = (selectedOption2) => {
    console.log(`Option2 selected:`, selectedOption2);
    const options3 = this.getOptions3(selectedOption2)
    this.setState({ selectedOption2, options3, selectedOption3: null, selectedOption4: null });
  }

  handleChange3 = (selectedOption3) => {
    console.log(`Option3 selected:`, selectedOption3);
    const options4 = this.getOptions4(selectedOption3)
    this.setState({ selectedOption3, options4, selectedOption4: null });
  }

  handleChange4 = (selectedOption4) => {
    console.log(`Option4 selected:`, selectedOption4);
    // const options4 = this.getOptions4(selectedOption3)
    this.setState({ selectedOption4 });
  }

  handleSubmit = (e) => {
    const { selectedOption1, selectedOption2, selectedOption3, selectedOption4, file, brand, price, quantity, packageContent, packageWeight, packageHeight, packageLength, packageWidth, name, description, color } = this.state
    e.preventDefault()
    let primaryCategoryId
    if (selectedOption4) {
      primaryCategoryId = selectedOption4.id
    } else if (selectedOption3) {
      primaryCategoryId = selectedOption3.id
    } else if (selectedOption2) {
      primaryCategoryId = selectedOption2.id
    } else {
      primaryCategoryId = selectedOption1.id
    }

    let formData = new FormData()
    formData.set('id', primaryCategoryId)
    formData.set('name', name)
    formData.set('description', description)
    formData.set('price', price)
    formData.set('brand', brand)
    formData.set('color', color)
    formData.set('quantity', quantity)
    formData.set('package_weight', packageWeight)
    formData.set('package_width', packageWidth)
    formData.set('package_length', packageLength)
    formData.set('package_height', packageHeight)
    formData.set('package_content', packageContent)
    formData.append('image', file)

    axios({
      method: 'post',
      url: 'https://marketbucket.herokuapp.com/api/v1/products/lazada/new',
      headers: {
        'content-type': 'multipart/form-data',
        'authorization': `Bearer ${localStorage.jwt}`
      },
      data: formData
    })
      .then(response => {
        const { data } = response;
        const { message } = data
        setTimeout(() => this.setState({ redirect: true }), 2000)
        this.setState({ message, isLoading:true, hasError: false })
      })

      .catch(error => {
        const { message } = error.response.data

        this.setState({ errors: message, hasError: true, isLoading:false })
      });
  }

  handleInput = (event) => {
    if (event.name === 'color') {
      const field = event.name
      const value = event.value
      const selectedColor = event
      this.setState({
        [field]: value,
        selectedColor
      })
    } else if (event.name === 'brand') {
      const field = event.name
      const value = event.value
      const selectedBrand = event
      this.setState({
        [field]: value,
        selectedBrand
      })
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
    const { message, redirect, hasError, errors, isLoading } = this.state
    if (redirect) {
      return <Redirect to='/' />;
    } else {
      return (

        <Col md="9" className="h-100 d-flex align-items-start flex-column" >
          <Form className="m-auto w-100 p-5" onSubmit={this.handleSubmit}>
          {message ? <Alert color='info'>{message}</Alert> : null}
          
          {hasError ?
            <div className="">
              <small>
                <Alert color='danger'>{errors}</Alert>
              </small>
            </div>
            : ''}
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
                    placeholder="Almost there..."
                  />
                </> : null}
              {this.state.options4 ?
                <>
                  <br />
                  <Select
                    className=""
                    name="sub-sub-sub-category"
                    value={this.state.selectedOption4}
                    onChange={this.handleChange4}
                    options={this.state.options4}
                    placeholder="Leaf Category"
                  />
                </> : null}
              <br />
              <Select
                className=""
                name="brand"
                value={this.state.selectedBrand}
                onChange={this.handleInput}
                options={this.state.brandOptions.map((brand) => ({ label: brand.name, value: brand.name, name: 'brand' }))}
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
              <br />
              <Input
                className=""
                name="image"
                type='file'
                onChange={this.getImage}
                placeholder="Upload Image"
                required
              />
              <div className="d-flex flex-row mt-3 ml-1">
                <Button className="btn btn-warning" value="submit" type="submit" disabled={isLoading?true:false}>
                  {isLoading ? 'Please Wait...' : 'Send Product!'}
                    </Button>
              </div>
            </FormGroup>
          </Form>
        </Col>
      )
    }
  }
}