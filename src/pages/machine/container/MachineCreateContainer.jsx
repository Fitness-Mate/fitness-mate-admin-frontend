import React from 'react';
import Loading from "../../../component/Loading";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as machineCreateAction from "../../machine/store/machineCreate";
import ConfirmModal from "../../../component/modal/ConfirmModal";
import AlertModal from "../../../component/modal/AlertModal";
import * as apiUtil from "../../../util/apiUtil";

class MachineCreateContainer extends React.Component {
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

        this.ajaxMachineCreate = this.ajaxMachineCreate.bind(this);

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
        this.setConfirmMessage('운동기구를 생성하시겠습니까?');
        this.setConfirmMethod('create');
        this.toggleModal('confirmModalIsOpen', true);
    }
    setConfirmMethod(method) {
        if(method === 'create') this.setState({ confirmMethod: this.ajaxMachineCreate });
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
        const { MachineCreateAction } = this.props;

        if(e.target.name === 'korName') await MachineCreateAction.setKorName(e.target.value);
        if(e.target.name === 'engName') await MachineCreateAction.setEngName(e.target.value);
    }

    /* ajax request methods */
    ajaxMachineCreate() {
        const { korName, engName } = this.props;

        apiUtil.sendRequest({
            setLoading: this.setLoading,
            url: `/api/admin/machine`,
            method: apiUtil.methods.POST,
            data: {
                korName: korName,
                engName: engName
            },
            success: (result) => {
                this.toggleModal('confirmModalIsOpen', false);

                this.setAlertMessage('운동기구 생성이 완료되었습니다.');
                this.setAlertRedirectUrl('/machine/list');
                this.toggleModal('alertModalIsOpen', true);
            },
            fail: (message) => {
                this.toggleModal('confirmModalIsOpen', false);

                this.setAlertMessage(`운동기구 생성에 실패했습니다.\n${message}`);
                this.toggleModal('alertModalIsOpen', true);
            }
        })
    }


    render() {
        const { loading } = this.state;
        const { confirmMethod, confirmMessage, alertRedirectUrl, alertMessage } = this.state;
        const { confirmModalIsOpen, alertModalIsOpen } = this.state;

        const { korName, engName } = this.props;

        return (
            <React.Fragment>
                <Loading loading={loading}/>
                <table>
                    <tbody>
                    <tr>
                        <td>기구 이름 (KOR)</td>
                        <td><input type='text' name='korName' value={korName} onChange={this.handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td>기구 이름 (ENG)</td>
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
        korName: state.machineCreate.korName,
        engName: state.machineCreate.engName,
    }),
    (dispatch) => ({
        MachineCreateAction: bindActionCreators(machineCreateAction, dispatch)
    })
)(MachineCreateContainer);