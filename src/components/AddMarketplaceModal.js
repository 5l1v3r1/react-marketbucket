
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class AddMarketplace extends React.Component {


  render() {
    const { modal, lazada, shopee, toggleModal } = this.props
    return (
      <div>
        <Modal isOpen={modal} toggle={toggleModal} >
          <ModalHeader toggle={toggleModal}>Choose Marketplace To Add</ModalHeader>
          <ModalBody>
            <ul style={{ listStyleType: 'none' }}>
              {lazada ? null : <>
                <li>
                  <a href="https://marketbucket.herokuapp.com/api/v1/marketplaces/check/lazada">
                    <img height="100px" src="https://s3.amazonaws.com/market.bucket/Lazada.jpg" alt="lazada" />
                  </a>
                </li>
                <hr /> </>}
              {shopee ? null : <>
                <li>
                  <a href="https://marketbucket.herokuapp.com/api/v1/marketplaces/check/shopee">
                    <img height="100px" src="https://s3.amazonaws.com/market.bucket/Shopee.jpg" alt="shopee" />
                  </a>
                </li>
                <hr /></>}
              <li>
                More marketplaces coming soon...
          </li>
            </ul>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddMarketplace;