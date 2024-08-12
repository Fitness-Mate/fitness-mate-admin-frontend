import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as apiUtil from "../../../util/apiUtil";
import * as bodyPartAction from "../../bodypart/store/bodypart";

import PaginationComponent from "../../../component/PagenationComponent";
import ConfirmModal from "../../../component/modal/ConfirmModal";
import AlertModal from "../../../component/modal/AlertModal";
import Loading from "../../../component/Loading";

class BodyPartListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.setLoading = this.setLoading.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

        this.handleDeleteBtnClick = this.handleDeleteBtnClick.bind(this);
        this.setConfirmMethod = this.setConfirmMethod.bind(this);
        this.setConfirmMessage = this.setConfirmMessage.bind(this);
        this.setAlertRedirectUrl = this.setAlertRedirectUrl.bind(this);
        this.setAlertMessage = this.setAlertMessage.bind(this);

        this.handlePageChange = this.handlePageChange.bind(this);

        this.ajaxGetBodyPartList = this.ajaxGetBodyPartList.bind(this);
        this.ajaxDeleteBodyPart = this.ajaxDeleteBodyPart.bind(this);

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
        this.ajaxGetBodyPartList();
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.state.loading !== nextProps.loading

            || this.state.confirmMethod !== nextState.confirmMethod
            || this.state.confirmMessage !== nextState.confirmMessage
            || this.state.alertRedirectUrl !== nextState.alertRedirectUrl
            || this.state.alertMessage !== nextState.alertMessage
            || this.state.confirmModalIsOpen !== nextState.confirmModalIsOpen
            || this.state.alertModalIsOpen !== nextState.alertModalIsOpen

            || this.props.bodyPartList !== nextProps.bodyPartList
            || this.props.page !== nextProps.page
            || this.props.size !== nextProps.size
            || this.props.total !== nextProps.total
        )
    }

    /* handlers */
    setLoading(loading) {
        this.setState({ loading: loading });
    }
    toggleModal(modalName, value) {
        this.setState({ [modalName]: value });
    }

    handleDeleteBtnClick(id) {
        this.setConfirmMessage('운동기구를 삭제하시겠습니까?');
        this.setConfirmMethod('delete', id);
        this.toggleModal('confirmModalIsOpen', true);
    }
    setConfirmMethod(method, id) {
        if(method === 'delete') this.setState({ confirmMethod: ()=>{this.ajaxDeleteBodyPart(id)}});
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

    async handlePageChange(event, value) {
        const { BodyPartAction } = this.props;
        await BodyPartAction.setPage(value);

        this.ajaxGetBodyPartList();
    }

    /* ajax request methods */
    ajaxGetBodyPartList() {
        const { BodyPartAction } = this.props;
        const { page, size } = this.props;

        apiUtil.sendRequest({
            setLoading: this.setLoading,
            url: `/api/admin/bodypart?page=${page}&size=${size}&sort=createdAt&direction=DESC`,
            method: apiUtil.methods.GET,
            success: (result) => {
                BodyPartAction.setBodyPartList(result.content);
                BodyPartAction.setTotal(result.total);
            }
        });
    }
    ajaxDeleteBodyPart(id) {
        apiUtil.sendRequest({
            setLoading: this.setLoading,
            url: `/api/admin/bodypart/${id}`,
            method: apiUtil.methods.DELETE,
            success: (result) => {
                this.toggleModal('confirmModalIsOpen', false);

                this.setAlertMessage('운동부위 삭제가 완료되었습니다.');
                this.setAlertRedirectUrl('/bodypart/list');
                this.toggleModal('alertModalIsOpen', true);
            },
            fail: (message) => {
                this.toggleModal('confirmModalIsOpen', false);

                this.setAlertMessage(`운동부위 삭제에 실패했습니다.\n${message}`);
                this.toggleModal('alertModalIsOpen', true);
            }
        });
    }

    render() {
        const { confirmMethod, confirmMessage, alertRedirectUrl, alertMessage } = this.state;
        const { confirmModalIsOpen, alertModalIsOpen } = this.state;

        const { bodyPartList } = this.props;
        const { page, size, total } = this.props;

        return (
            <React.Fragment>
                <Loading loading={this.state.loading}/>
                <button onClick={() => {window.location.href = '/bodypart/create'}}>부위 생성</button>
                <table>
                    <thead>
                    <tr>
                        <th>번호</th>
                        <th>부위 이름 (KOR)</th>
                        <th>부위 이름 (ENG)</th>
                        <th>생성일시</th>
                        {/*<th>삭제버튼</th>*/}
                    </tr>
                    </thead>
                    <tbody>
                            {bodyPartList.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{10 * (page - 1) + idx + 1}</td>
                                    <td>{item.koreanName}</td>
                                    <td>{item.englishName}</td>
                                    <td>{item.createdAt}</td>
                                    <td><button onClick={() => {this.handleDeleteBtnClick(item.id)}}>삭제</button></td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <PaginationComponent page={page} total={total} sizePerPage={size} handleChange={this.handlePageChange}/>
                <ConfirmModal
                    isOpen={confirmModalIsOpen}
                    onRequestClose={() => {this.toggleModal('confirmModalIsOpen', false)}}
                    confirmMethod={confirmMethod}
                    message={confirmMessage}
                />
                <AlertModal
                    isOpen={alertModalIsOpen}
                    onRequestClose={() => {this.toggleModal('alertModalIsOpen', false)}}
                    redirectUrl={alertRedirectUrl}
                    message={alertMessage}
                />
            </React.Fragment>
        )
    }
}


export default connect((state) => ({
        bodyPartList: state.bodypart.bodyPartList,
        page: state.bodypart.page,
        size: state.bodypart.size,
        total: state.bodypart.total
    }),
    (dispatch) => ({
        BodyPartAction: bindActionCreators(bodyPartAction, dispatch)
    })
)(BodyPartListContainer);
