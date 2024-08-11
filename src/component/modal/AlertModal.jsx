import React, {Component} from 'react';

import Modal from "react-modal";
Modal.setAppElement('#root');

class AlertModal extends Component{
    constructor(props) {
        super(props);
        this.state={};
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.props.isOpen !== nextProps.isOpen
            || this.props.message !== nextProps.message
            || this.props.buttons !== nextProps.buttons
        )
    }

    render() {
        const { isOpen, onRequestClose, redirectUrl, message } = this.props;

        return (
            <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="react-modal" overlayClassName="modal-overlay">
                <div className='modal-body'>
                    <span style={{whiteSpace: "pre-wrap"}}>{message}</span>
                </div>
                <div className='modal-footer'>
                    <button onClick={()=>{ redirectUrl ? window.location.href=redirectUrl: onRequestClose()}}>확인</button>
                </div>
            </Modal>
        )
    }
}

export default AlertModal;
