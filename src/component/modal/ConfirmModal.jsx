import React, {Component} from 'react';

import Modal from "react-modal";
Modal.setAppElement('#root');

class ConfirmModal extends Component{
    constructor(props) {
        super(props);
        this.state={};
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.state.loading !== nextProps.loading
            || this.props.isOpen !== nextProps.isOpen
            || this.props.message !== nextProps.message
            || this.props.buttons !== nextProps.buttons
        )
    }

    render() {
        const { isOpen, onRequestClose } = this.props;
        const { handleSelectY } = this.props;
        const { message } = this.props;

        return (
            <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="react-modal" overlayClassName="modal-overlay">
                <div className='modal-body'>
                    <span style={{whiteSpace: "pre-wrap"}}>{message}</span>
                </div>
                <div className='modal-footer'>
                    <button onClick={handleSelectY}>확인</button>
                    <button onClick={()=>{onRequestClose()}}>취소</button>
                </div>
            </Modal>
        )
    }
}

export default ConfirmModal;
