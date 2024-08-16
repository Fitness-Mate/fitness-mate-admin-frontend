import React from 'react';

import Loading from "../../../component/Loading";
import ConfirmModal from "../../../component/modal/ConfirmModal";
import AlertModal from "../../../component/modal/AlertModal";

import * as apiUtil from "../../../util/apiUtil";

class SupplementCreateContainer extends React.Component {
    constructor(props) {
        super(props);

        this.setLoading = this.setLoading.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

        this.setConfirmMethod = this.setConfirmMethod.bind(this);
        this.setConfirmMessage = this.setConfirmMessage.bind(this);
        this.setAlertRedirectUrl = this.setAlertRedirectUrl.bind(this);
        this.setAlertMessage = this.setAlertMessage.bind(this);

        this.handleCreateBtnClick = this.handleCreateBtnClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.ajaxSupplementCreate = this.ajaxSupplementCreate.bind(this);

        this.state = {
            loading: false,
            confirmMethod: null,
            confirmMessage: '',
            alertRedirectUrl: null,
            alertMessage: '',
            confirmModalIsOpen: false,
            alertModalIsOpen: false,

            korName: '',
            engName: '',
        }
    }

    /* handlers */
    setLoading(loading) {
        this.setState({ loading: loading });
    }
    toggleModal(modalName, value) {
        this.setState({ [modalName]: value });
    }

    handleCreateBtnClick() {
        this.setConfirmMessage('보조제를 생성하시겠습니까?');
        this.setConfirmMethod('create');
        this.toggleModal('confirmModalIsOpen', true);
    }
    setConfirmMethod(method) {
        if(method === 'create') this.setState({ confirmMethod: this.ajaxSupplementCreate });
    }
    setConfirmMessage(message) {
        this.setState({ confirmMessage: message });
    }
    setAlertRedirectUrl(url) {
        this.setState({ alertRedirectUrl: url });
    }
    setAlertMessage(message) {
        this.setState({ alertMessage: message });
    }

    async handleInputChange(e) {
        if(e.target.name === 'korName') await this.setState({ korName: e.target.value });
        if(e.target.name === 'engName') await this.setState({ engName: e.target.value });
    }

    /* ajax request methods */
    ajaxSupplementCreate() {
        alert('보조제 생성 요청 AJAX');
        // apiUtil.sendRequest({
        //     setLoading: this.setLoading,
        //     url: `/api/admin/supplement`,
        //     method: apiUtil.methods.POST,
        //     data: {
        //         koreanName: this.props.korName,
        //         englishName: this.props.engName,
        //     },
        //     success: (result) => {
        //         this.toggleModal('confirmModalIsOpen', false);
        //
        //         this.setAlertMessage('보조제 생성이 완료되었습니다.');
        //         this.setAlertRedirectUrl('/supplement/list');
        //         this.toggleModal('alertModalIsOpen', true);
        //     },
        //     fail: (message) => {
        //         this.toggleModal('confirmModalIsOpen', false);
        //
        //         this.setAlertMessage(`보조제 생성에 실패했습니다.\n${message}`);
        //         this.toggleModal('alertModalIsOpen', true);
        //     }
        // })
    }

    render() {
        const { confirmMethod, confirmMessage, alertRedirectUrl, alertMessage } = this.state;
        const { confirmModalIsOpen, alertModalIsOpen } = this.state;

        const { korName, engName } = this.state;

        return (
            <React.Fragment>
                <Loading loading={this.state.loading}/>
                <table>
                    <tbody>
                    <tr>
                        <td>보조제 이름 (KOR)</td>
                        <td><input type='text' name='korName' value={korName} onChange={this.handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td>보조제 이름 (ENG)</td>
                        <td><input type='text' name='engName' value={engName} onChange={this.handleInputChange}/></td>
                    </tr>
                    </tbody>
                </table>
                <button onClick={this.handleCreateBtnClick}>생성</button>
                <ConfirmModal
                    isOpen={confirmModalIsOpen}
                    onRequestClose={() => {
                        this.toggleModal('confirmModalIsOpen', false)
                    }}
                    confirmMethod={confirmMethod}
                    message={confirmMessage}
                />
                <AlertModal
                    isOpen={alertModalIsOpen}
                    onRequestClose={() => {
                        this.toggleModal('alertModalIsOpen', false)
                    }}
                    redirectUrl={alertRedirectUrl}
                    message={alertMessage}
                />
            </React.Fragment>
        )
    }
}

export default SupplementCreateContainer;