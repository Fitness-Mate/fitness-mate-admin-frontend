import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as bodyPartCreateAction from "../store/bodypartCreate";

import Loading from "../../../component/Loading";
import ConfirmModal from "../../../component/modal/ConfirmModal";
import AlertModal from "../../../component/modal/AlertModal";
import * as apiUtil from "../../../util/apiUtil";

class BodyPartCreateContainer extends React.Component {
    constructor(props) {
        super(props);

        this.setLoading = this.setLoading.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

        this.handleCreateBtnClick = this.handleCreateBtnClick.bind(this);

        this.setConfirmMethod = this.setConfirmMethod.bind(this);
        this.setConfirmMessage = this.setConfirmMessage.bind(this);
        this.setAlertRedirectUrl = this.setAlertRedirectUrl.bind(this);
        this.setAlertMessage = this.setAlertMessage.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);

        this.ajaxBodyPartCreate = this.ajaxBodyPartCreate.bind(this);

        this.state = {
            loading: false,

            confirmMethod: null,
            confirmMessage: '',
            alertRedirectUrl: null,
            alertMessage: '',
            confirmModalIsOpen: false,
            alertModalIsOpen: false,
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.state.loading !== nextState.loading
            || this.state.confirmMethod !== nextState.confirmMethod
            || this.state.confirmMessage !== nextState.confirmMessage
            || this.state.alertRedirectUrl !== nextState.alertRedirectUrl
            || this.state.alertMessage !== nextState.alertMessage
            || this.state.confirmModalIsOpen !== nextState.confirmModalIsOpen
            || this.state.alertModalIsOpen !== nextState.alertModalIsOpen

            || this.props.korName !== nextProps.korName
            || this.props.engName !== nextProps.engName
        )
    }

    /* handlers */
    setLoading(loading) {
        this.setState({ loading: loading });
    }
    toggleModal(modalName, value) {
        this.setState({ [modalName]: value });
    }

    handleCreateBtnClick() {
        this.setConfirmMessage('운동부위를 생성하시겠습니까?');
        this.setConfirmMethod('create');
        this.toggleModal('confirmModalIsOpen', true);
    }
    setConfirmMethod(method) {
        if(method === 'create') this.setState({ confirmMethod: this.ajaxBodyPartCreate });
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
        const { BodyPartCreateAction } = this.props;

        if(e.target.name === 'korName') await BodyPartCreateAction.setKorName(e.target.value);
        if(e.target.name === 'engName') await BodyPartCreateAction.setEngName(e.target.value);
    }

    /* ajax request methods */
    ajaxBodyPartCreate() {
        apiUtil.sendRequest({
            setLoading: this.setLoading,
            url: `/api/admin/bodypart`,
            method: apiUtil.methods.POST,
            data: {
                koreanName: this.props.korName,
                englishName: this.props.engName,
            },
            success: (result) => {
                this.toggleModal('confirmModalIsOpen', false);

                this.setAlertMessage('운동부위 생성이 완료되었습니다.');
                this.setAlertRedirectUrl('/bodypart/list');
                this.toggleModal('alertModalIsOpen', true);
            },
            fail: (message) => {
                this.toggleModal('confirmModalIsOpen', false);

                this.setAlertMessage(`운동부위 생성에 실패했습니다.\n${message}`);
                this.toggleModal('alertModalIsOpen', true);
            }
        })
    }

    render() {
        const { confirmMethod, confirmMessage, alertRedirectUrl, alertMessage } = this.state;
        const { confirmModalIsOpen, alertModalIsOpen } = this.state;

        const { korName, engName } = this.props;

        return (
            <React.Fragment>
                <Loading loading={this.state.loading}/>
                <table>
                    <tbody>
                    <tr>
                        <td>운동 이름 (KOR)</td>
                        <td><input type='text' name='korName' value={korName} onChange={this.handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td>운동 이름 (ENG)</td>
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

export default connect((state) => ({
        korName: state.bodyPartCreate.korName,
        engName: state.bodyPartCreate.engName,
    }),
    (dispatch) => ({
        BodyPartCreateAction: bindActionCreators(bodyPartCreateAction, dispatch)
    })
)(BodyPartCreateContainer);