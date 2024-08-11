import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link} from "@mui/material";

import * as apiUtil from "../../../util/apiUtil";
import * as workoutAction from "../store/workout"

import Loading from "../../../component/Loading";
import AlertModal from "../../../component/modal/AlertModal";
import ConfirmModal from "../../../component/modal/ConfirmModal";

class WorkoutDetailContainer extends React.Component {
    constructor(props) {
        super(props);

        this.setLoading = this.setLoading.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

        this.handleDeleteBtnClick = this.handleDeleteBtnClick.bind(this);
        this.setConfirmMethod = this.setConfirmMethod.bind(this);
        this.setConfirmMessage = this.setConfirmMessage.bind(this);
        this.setAlertRedirectUrl = this.setAlertRedirectUrl.bind(this);
        this.setAlertMessage = this.setAlertMessage.bind(this);

        this.ajaxGetWorkout = this.ajaxGetWorkout.bind(this);
        this.ajaxDeleteWorkout = this.ajaxDeleteWorkout.bind(this);

        this.state = {
            loading: false,

            confirmMethod: null,
            confirmMessage: '',
            alertRedirectUrl: null,
            alertMessage: '',
            confirmModalIsOpen: false,
            alertModalIsOpen: false
        }
    }

    componentDidMount() {
        this.ajaxGetWorkout();
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

            || this.props.workout !== nextProps.workout
        )
    }

    /* handlers */
    setLoading(loading) {
        this.setState({ loading: loading });
    }
    toggleModal(modalName, value) {
        this.setState({ [modalName]: value });
    }

    handleDeleteBtnClick() {
        this.setConfirmMessage('운동을 삭제하시겠습니까?');
        this.setConfirmMethod('delete');
        this.toggleModal('confirmModalIsOpen', true);
    }

    setConfirmMethod(method) {
        if(method === 'delete') this.setState({ confirmMethod: this.ajaxDeleteWorkout });
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

    /* ajax request methods */
    ajaxGetWorkout() {
        const { WorkoutAction } = this.props;
        const { id } = this.props;

        apiUtil.sendRequest({
            setLoading: this.setLoading,
            url: `/api/admin/workout/${id}`,
            method: apiUtil.methods.GET,
            success: (result) => {
                WorkoutAction.setWorkout(result);
            }
        });
    }
    ajaxDeleteWorkout() {
        const { id } = this.props;

        apiUtil.sendRequest({
            setLoading: this.setLoading,
            url: `/api/admin/workout/${id}`,
            method: apiUtil.methods.DELETE,
            success: (result) => {
                this.toggleModal('confirmModalIsOpen', false);

                this.setAlertMessage('운동 삭제가 완료되었습니다.');
                this.setAlertRedirectUrl('/workout/list');
                this.toggleModal('alertModalIsOpen', true);
            },
            fail: (error) => {
                this.toggleModal('confirmModalIsOpen', false);

                this.setAlertMessage('운동 삭제에 실패했습니다.');
                this.toggleModal('alertModalIsOpen', true);
            }
        })
    }

    render() {
        const { loading } = this.state;
        const { confirmMethod, confirmMessage, alertRedirectUrl, alertMessage } = this.state;
        const { confirmModalIsOpen, alertModalIsOpen } = this.state;
        const { workout } = this.props;

        return (
            <React.Fragment>
                <Loading loading={loading}/>
                { workout != null && (
                    <React.Fragment>
                        {/* TODO */} {/* <button>수정</button>*/}
                        <button onClick={this.handleDeleteBtnClick}>삭제</button>
                        <table>
                            <tbody>
                            <tr>
                                <td colSpan={2}><img src={workout.imgPath} alt=''/></td>
                            </tr>
                            <tr>
                                <td>운동 이름 (KOR)</td>
                                <td>{workout.koreanName}</td>
                            </tr>
                            <tr>
                                <td>운동 이름 (ENG)</td>
                                <td>{workout.englishName}</td>
                            </tr>
                            <tr>
                                <td>관련 운동 기구</td>
                                <td>{JSON.stringify(workout.machineKoreanName)}</td>
                            </tr>
                            <tr>
                                <td>관련 운동 부위</td>
                                <td>{JSON.stringify(workout.bodyPartKoreanName)}</td>
                            </tr>
                            <tr>
                                <td>운동 영상 링크</td>
                                <td><Link href={workout.videoLink} target='_blank'>{workout.videoLink}</Link></td>
                            </tr>
                            <tr>
                                <td>설명</td>
                                <td>{workout.description}</td>
                            </tr>
                            </tbody>
                        </table>
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
                )}
            </React.Fragment>
        )
    }
}

export default connect((state) => ({
        workout: state.workout.workout,
    }),
    (dispatch) => ({
        WorkoutAction: bindActionCreators(workoutAction, dispatch)
    })
)(WorkoutDetailContainer);