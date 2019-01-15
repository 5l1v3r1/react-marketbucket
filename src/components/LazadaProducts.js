// import axios from "axios";
// import React, { Component } from 'react'

// export default class LazadaProducts extends Component {
//   state = {

//   }

//   componentDidMount() {
//     axios({
//       method: 'post',
//       url: 'http://127.0.0.1:5000/api/v1/marketplaces/authorize/shopee',
//       headers: {
//         'content-type': 'application/json',
//         'authorization': `Bearer ${localStorage.jwt}`
//       },
//       data: {
//         shop_id: this.state.shopeeShopId,
//       }
//     })
//       .then(response => {
//         const { data } = response;
//         const { message, shopee_shop_id } = data

//         localStorage.setItem('shopeeShopId', shopee_shop_id)

//         this.setState({
//           shopeeShopId: null
//         })
//       })
//       .catch(error => {
//         console.log(error)
//         this.setState({ errors: error.response.data.message })
//       });
//   }
  

//   render () {
//     return (

//     )
//   }
// }
