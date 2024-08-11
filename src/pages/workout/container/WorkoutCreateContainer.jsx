import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as apiUtil from "../../../util/apiUtil";
import * as workoutCreateAction from "../store/workoutCreate"
import ConfirmModal from "../../../component/modal/ConfirmModal";
import AlertModal from "../../../component/modal/AlertModal";
import Loading from "../../../component/Loading";

class WorkoutCreateContainer extends React.Component {
    constructor(props) {
        super(props);

        this.setLoading = this.setLoading.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

        this.handleCreateBtnClick = this.handleCreateBtnClick.bind(this);
        this.handleMachineSelect = this.handleMachineSelect.bind(this);
        this.handleBodyPartSelect = this.handleBodyPartSelect.bind(this);
        this.handleMachineRemove = this.handleMachineRemove.bind(this);
        this.handleBodyPartRemove = this.handleBodyPartRemove.bind(this);

        this.setConfirmMethod = this.setConfirmMethod.bind(this);
        this.setConfirmMessage = this.setConfirmMessage.bind(this);
        this.setAlertRedirectUrl = this.setAlertRedirectUrl.bind(this);
        this.setAlertMessage = this.setAlertMessage.bind(this);

        this.handleInputChange = this.handleInputChange.bind(this);

        this.ajaxCreateWorkout = this.ajaxCreateWorkout.bind(this);
        this.ajaxGetMachineList = this.ajaxGetMachineList.bind(this);
        this.ajaxGetBodyPartList = this.ajaxGetBodyPartList.bind(this);

        this.state = {
            loading: false,

            confirmMethod: null,
            confirmMessage: '',
            alertRedirectUrl: null,
            alertMessage: '',
            confirmModalIsOpen: false,
            alertModalIsOpen: false,

            machineList: [],
            bodyPartList: [],
            selectedMachine: '',
            selectedBodyPart: ''
        }
    }

    componentDidMount() {
        this.ajaxGetMachineList();
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
            || this.state.machineList !== nextState.machineList
            || this.state.bodyPartList !== nextState.bodyPartList
            || this.state.selectedMachine !== nextState.selectedMachine
            || this.state.selectedBodyPart !== nextState.selectedBodyPart

            || this.props.korName !== nextProps.korName
            || this.props.engName !== nextProps.engName
            || this.props.image !== nextProps.image
            || this.props.description !== nextProps.description
            || this.props.videoLink !== nextProps.videoLink
            || this.props.selectedBodyPartList !== nextProps.selectedBodyPartList
            || this.props.selectedMachineList !== nextProps.selectedMachineList
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
        this.setConfirmMessage('운동을 생성하시겠습니까?');
        this.setConfirmMethod('create');
        this.toggleModal('confirmModalIsOpen', true);
    }
    async handleMachineSelect(e) {
        const { WorkoutCreateAction } = this.props;
        await WorkoutCreateAction.pushSelectedMachine(JSON.parse(e.target.value));
        await this.setState({ selectedMachine: '' });
    }
    async handleBodyPartSelect(e) {
        const { WorkoutCreateAction } = this.props;
        await WorkoutCreateAction.pushSelectedBodyPart(JSON.parse(e.target.value));
        await this.setState({ selectedBodyPart: '' });
    }
    async handleMachineRemove(item) {
        const { WorkoutCreateAction } = this.props;
        await WorkoutCreateAction.popSelectedMachine(JSON.parse(item).id);
    }
    async handleBodyPartRemove(item) {
        const { WorkoutCreateAction } = this.props;
        await WorkoutCreateAction.popSelectedBodyPart(JSON.parse(item).id);
    }


    setConfirmMethod(method) {
        if(method === 'create') this.setState({ confirmMethod: this.ajaxCreateWorkout });
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
        const { WorkoutCreateAction } = this.props;

        if(e.target.name === 'korName') await WorkoutCreateAction.setKorName(e.target.value);
        if(e.target.name === 'engName') await WorkoutCreateAction.setEngName(e.target.value);
        if(e.target.name === 'image') await WorkoutCreateAction.setImage(e.target.files[0]);
        if(e.target.name === 'videoLink') await WorkoutCreateAction.setVideoLink(e.target.value);
        if(e.target.name === 'description') await WorkoutCreateAction.setDescription(e.target.value);
    }

    /* ajax request methods */
    ajaxCreateWorkout() {
        let data = new FormData();
        data.append('koreanName', this.props.korName);
        data.append('englishName', this.props.engName);
        data.append('videoLink', this.props.videoLink);
        data.append('description', this.props.description);
        data.append('image', this.props.image);
        data.append('machineIdList', this.props.selectedMachineList.map(machine => machine.id));
        data.append('bodyPartIdList', this.props.selectedBodyPartList.map(bodyPart => bodyPart.id));

        apiUtil.sendRequest({
            setLoading: this.setLoading,
            url: `/api/admin/workout`,
            method: apiUtil.methods.POST,
            data: data,
            isForm: true,
            success: (result) => {
                this.toggleModal('confirmModalIsOpen', false);

                this.setAlertMessage('운동 생성이 완료되었습니다.');
                this.setAlertRedirectUrl('/workout/list');
                this.toggleModal('alertModalIsOpen', true);
            },
            fail: (message) => {
                this.toggleModal('confirmModalIsOpen', false);

                this.setAlertMessage(`운동 생성에 실패했습니다.\n${message}`);
                this.toggleModal('alertModalIsOpen', true);
            }
        })
    }
    ajaxGetMachineList() {
        apiUtil.sendRequest({
            setLoading: this.setLoading,
            url: `/api/admin/machine?page=1&size=50&sort=id&direction=ASC`,
            method: apiUtil.methods.GET,
            success: (result) => {
                this.setState({ machineList: result.content });
            },
            fail: (message) => {
                this.setAlertMessage('운동기구 조회에 실패했습니다.\n', message);
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

        const { machineList, bodyPartList } = this.state;
        const { selectedMachine, selectedBodyPart } = this.state;
        const { selectedMachineList, selectedBodyPartList } = this.props;
        const { korName, engName, description, videoLink } = this.props;

        return (
            <React.Fragment>
                <Loading loading={loading}/>
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
                    <tr>
                        <td>운동 이미지</td>
                        <td><input type='file' name='image' onChange={this.handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td>영상 링크</td>
                        <td><input type='text' name='videoLink' value={videoLink} onChange={this.handleInputChange}/></td>
                    </tr>
                    <tr>
                        <td>관련 운동 기구</td>
                        <td>
                            <select value={selectedMachine} onChange={this.handleMachineSelect}>
                                <option value=''>운동 기구 선택해서 추가</option>
                                {machineList.length !== 0 && machineList.map((item, index) => (
                                    <option key={index} value={JSON.stringify(item)}>{item.koreanName}</option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>선택된 운동 기구</td>
                        <td>
                            {selectedMachineList.map((item, index) => (
                                <button key={index} onClick={()=>{this.handleMachineRemove(JSON.stringify(item))}}>{item.koreanName}</button>
                            ))}
                            <span style={{fontSize: 10, color: '#FF0000'}}> *버튼을 누르면 제거</span>
                        </td>
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
                                <button key={index} onClick={()=>{this.handleBodyPartRemove(JSON.stringify(item))}}>{item.koreanName}</button>
                            ))}
                            <span style={{fontSize: 10, color: '#FF0000'}}> *버튼을 누르면 제거</span>
                        </td>
                    </tr>
                    <tr>
                        <td>설명</td>
                        <td><textarea name='description' value={description} onChange={this.handleInputChange}/></td>
                    </tr>
                    </tbody>
                </table>
                <button onClick={this.handleCreateBtnClick}>생성</button>
                <ConfirmModal
                    isOpen={confirmModalIsOpen}
                    onRequestClose={()=>{this.toggleModal('confirmModalIsOpen', false)}}
                    confirmMethod={confirmMethod}
                    message={confirmMessage}
                />
                <AlertModal
                    isOpen={alertModalIsOpen}
                    onRequestClose={()=>{this.toggleModal('alertModalIsOpen', false)}}
                    redirectUrl={alertRedirectUrl}
                    message={alertMessage}
                />
            </React.Fragment>
        )
    }
}

export default connect((state) => ({
        korName: state.workoutCreate.korName,
        engName: state.workoutCreate.engName,
        image: state.workoutCreate.image,
        description: state.workoutCreate.description,
        videoLink: state.workoutCreate.videoLink,
        selectedBodyPartList: state.workoutCreate.selectedBodyPartList,
        selectedMachineList: state.workoutCreate.selectedMachineList
    }),
    (dispatch) => ({
        WorkoutCreateAction: bindActionCreators(workoutCreateAction, dispatch)
    })
)(WorkoutCreateContainer);