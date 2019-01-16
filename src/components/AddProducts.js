
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class AddProducts extends React.Component {


  render() {
    const { modal, toggleModal, lazada, shopee } = this.props
    return (
      <div>
        <Modal isOpen={modal} toggle={toggleModal} >
          <ModalHeader toggle={toggleModal}>Where do you want to add your new product?</ModalHeader>
          <ModalBody>
            <ul style={{ listStyleType: 'none' }}>
              {!lazada ? null : <>
                <li>
                  <a href="http://localhost:5000/api/v1/marketplaces/check/lazada">
                    <img height="100px" src="https://s3.amazonaws.com/market.bucket/Lazada.jpg" alt="lazada" />
                  </a>
                </li>
                <hr /> </>}
              {!shopee || !lazada ? null :
                <li>
                  <a href="http://localhost:5000/api/v1/marketplaces/check/shopee">
                    <img height="100px" src="https://s3.amazonaws.com/market.bucket/image.jpg" alt="all marketplaces" />
                  </a>
                </li>
              }
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

