import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

import * as apiUtil from "../../../util/apiUtil";
import * as workoutAction from "../store/workout"

import Loading from "../../../component/Loading";
import {Link} from "@mui/material";
import AlertModal from "../../../component/modal/AlertModal";
import ConfirmModal from "../../../component/modal/ConfirmModal";

class WorkoutDetailContainer extends React.Component {
    constructor(props) {
        super(props);

        this.setLoading = this.setLoading.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleAlertMessage = this.handleAlertMessage.bind(this);

        this.ajaxGetWorkout = this.ajaxGetWorkout.bind(this);
        this.ajaxDeleteWorkout = this.ajaxDeleteWorkout.bind(this);

        this.state = {
            loading: false,
            alertMessage: '',
            deleteConfirmModalIsOpen: false,
            deleteAlertModalIsOpen: false
        }
    }

    componentDidMount() {
        this.ajaxGetWorkout();
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.state.loading !== nextState.loading
            || this.state.alertMessage !== nextState.alertMessage
            || this.state.deleteConfirmModalIsOpen !== nextState.deleteConfirmModalIsOpen
            || this.state.deleteAlertModalIsOpen !== nextState.deleteAlertModalIsOpen

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
    handleAlertMessage(message) {
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
            method: apiUtil.methods.GET,
            success: (result) => {
                this.toggleModal('deleteConfirmModalIsOpen', false);

                this.handleAlertMessage('운동 삭제가 완료되었습니다.');
                this.toggleModal('deleteAlertModalIsOpen', true);
            },
            fail: (error) => {
                this.handleAlertMessage('운동 삭제에 실패했습니다.');
                this.toggleModal('deleteAlertModalIsOpen', true);
            }
        })
    }

    render() {
        const { loading } = this.state;
        const { alertMessage } = this.state;
        const { deleteConfirmModalIsOpen, deleteAlertModalIsOpen } = this.state;
        const { workout } = this.props;

        return (
            <React.Fragment>
                <Loading loading={loading}/>
                { workout != null && (
                    <React.Fragment>
                        {/* TODO */} {/* <button>수정</button>*/}
                        <button onClick={()=>this.toggleModal('deleteConfirmModalIsOpen', true)}>삭제</button>
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
                            isOpen={deleteConfirmModalIsOpen}
                            onRequestClose={()=>{this.toggleModal('deleteConfirmModalIsOpen', false)}}
                            handleSelectY={this.ajaxDeleteWorkout}
                            message='운동을 삭제하시겠습니까?'
                        />
                        <AlertModal
                            isOpen={deleteAlertModalIsOpen}
                            onRequestClose={()=>{this.toggleModal('deleteAlertModalIsOpen', false)}}
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