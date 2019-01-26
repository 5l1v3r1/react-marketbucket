
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom'
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
                  <Link to={'/lazada/new'}>
                    <img height="100px" src="https://s3.amazonaws.com/market.bucket/Lazada.jpg" alt="lazada" />
                  </Link>
                </li>
                <hr /> </>}
              {!shopee ? null : <>
                <li>
                  <Link to={'/shopee/new'}>
                    <img height="100px" src="https://s3.amazonaws.com/market.bucket/Shopee.jpg" alt="lazada" />
                  </Link>
                </li>
                <hr /> </>}
              {!shopee || !lazada ? null :
                <li>
                  <Link to={'/all/new'}>
                    <img height="100px" src="https://s3.amazonaws.com/market.bucket/image.jpg" alt="all marketplaces" />
                  </Link>
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

