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
        this.handleBodyPartSelect = this.handleBodyPartSelect.bind(this);
        this.handleBodyPartRemove = this.handleBodyPartRemove.bind(this);

        this.setConfirmMethod = this.setConfirmMethod.bind(this);
        this.setConfirmMessage = this.setConfirmMessage.bind(this);
        this.setAlertRedirectUrl = this.setAlertRedirectUrl.bind(this);
        this.setAlertMessage = this.setAlertMessage.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);

        this.ajaxMachineCreate = this.ajaxMachineCreate.bind(this);
        this.ajaxGetBodyPartList = this.ajaxGetBodyPartList.bind(this);

        this.state = {
            loading: false,

            confirmMethod: null,
            confirmMessage: '',
            alertRedirectUrl: null,
            alertMessage: '',
            confirmModalIsOpen: false,
            alertModalIsOpen: false,

            bodyPartList: [],
            selectedBodyPart: ''
        }
    }

    componentDidMount() {
        this.ajaxGetBodyPartList();
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
            || this.state.bodyPartList !== nextState.bodyPartList
            || this.state.selectedBodyPart !== nextState.selectedBodyPart

            || this.props.korName !== nextProps.korName
            || this.props.engName !== nextProps.engName
            || this.props.selectedBodyPartList !== nextProps.selectedBodyPartList
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
    async handleBodyPartSelect(e) {
        const { MachineCreateAction } = this.props;
        await MachineCreateAction.pushSelectedBodyPart(JSON.parse(e.target.value));
        await this.setState({ selectedBodyPart: '' });
    }
    async handleBodyPartRemove(item) {
        const { MachineCreateAction } = this.props;
        await MachineCreateAction.popSelectedBodyPart(JSON.parse(item).id);
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

        console.log(this.props.korName);
        console.log(this.props.engName);
        console.log(this.props.selectedBodyPartList.map(item => item.id));

        apiUtil.sendRequest({
            setLoading: this.setLoading,
            url: `/api/admin/machine`,
            method: apiUtil.methods.POST,
            data: {
                koreanName: this.props.korName,
                englishName: this.props.engName,
                bodyPartIdList: this.props.selectedBodyPartList.map(item => item.id)
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
    ajaxGetBodyPartList() {
        apiUtil.sendRequest({
            setLoading: this.setLoading,
            url: `/api/admin/bodypart?page=1&size=50&sort=id&direction=ASC`,
            method: apiUtil.methods.GET,
            success: (result) => {
                this.setState({ bodyPartList: result.content });
            },
            fail: (message) => {
                this.setAlertMessage('운동부위 조회에 실패했습니다.\n', message);
                this.toggleModal('alertModalIsOpen', true);
            }
        })
    }


    render() {
        const { loading } = this.state;
        const { confirmMethod, confirmMessage, alertRedirectUrl, alertMessage } = this.state;
        const { confirmModalIsOpen, alertModalIsOpen } = this.state;

        const { bodyPartList, selectedBodyPart } = this.state;
        const { selectedBodyPartList } = this.props;
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
                    <tr>
                        <td>관련 운동 부위</td>
                        <td>
                            <select value={selectedBodyPart} onChange={this.handleBodyPartSelect}>
                                <option value=''>운동부위 선택해서 추가</option>
                                {bodyPartList.length !== 0 && bodyPartList.map((item, index) => (
                                    <option key={index} value={JSON.stringify(item)}>{item.koreanName}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>선택된 운동 부위</td>
                        <td>
                            {selectedBodyPartList.map((item, index) => (
                                <button key={index} onClick={() => {this.handleBodyPartRemove(JSON.stringify(item))}}>{item.koreanName}</button>
                            ))}
                            <span style={{fontSize: 10, color: '#FF0000'}}> *버튼을 누르면 제거</span>
                        </td>
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
        selectedBodyPartList: state.machineCreate.selectedBodyPartList
    }),
    (dispatch) => ({
        MachineCreateAction: bindActionCreators(machineCreateAction, dispatch)
    })
)(MachineCreateContainer);