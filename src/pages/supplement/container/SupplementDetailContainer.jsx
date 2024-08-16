import React from 'react';
import * as apiUtil from "../../../util/apiUtil";
import ConfirmModal from "../../../component/modal/ConfirmModal";
import AlertModal from "../../../component/modal/AlertModal";
import {Link} from "@mui/material";

class SupplementDetailContainer extends React.Component {
    constructor(props) {
        super(props);

        this.setLoading = this.setLoading.bind(this);
        this.toggleModal = this.toggleModal.bind(this);

        this.handleDeleteBtnClick = this.handleDeleteBtnClick.bind(this);
        this.setConfirmMethod = this.setConfirmMethod.bind(this);
        this.setConfirmMessage = this.setConfirmMessage.bind(this);
        this.setAlertRedirectUrl = this.setAlertRedirectUrl.bind(this);
        this.setAlertMessage = this.setAlertMessage.bind(this);

        this.ajaxGetSupplement = this.ajaxGetSupplement.bind(this);
        this.ajaxDeleteSupplement = this.ajaxDeleteSupplement.bind(this);

        this.state = {
            loading: false,
            supplement: null,

            confirmMethod: null,
            confirmMessage: '',
            alertRedirectUrl: null,
            alertMessage: '',
            confirmModalIsOpen: false,
            alertModalIsOpen: false
        }
    }

    componentDidMount() {
        this.ajaxGetSupplement();
    }

    setLoading(loading) {
        this.setState({ loading: loading });
    }
    toggleModal(modalName, value) {
        this.setState({ [modalName]: value });
    }

    handleDeleteBtnClick() {
        this.setConfirmMessage('보조제를 삭제하시겠습니까?');
        this.setConfirmMethod('delete');
        this.toggleModal('confirmModalIsOpen', true);
    }
    setConfirmMethod(method) {
        if(method === 'delete') this.setState({ confirmMethod: this.ajaxDeleteSupplement });
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


    ajaxGetSupplement() {
        const { id } = this.props;

        apiUtil.sendRequest({
            setLoading: this.setLoading,
            url: `/api/admin/supplement/${id}`,
            method: apiUtil.methods.GET,
            success: (result) => {
                console.log(result);
                this.setState({ supplement: result });
            }
        });
    }
    ajaxDeleteSupplement() {

    }

    render() {
        const { confirmMethod, confirmMessage, alertRedirectUrl, alertMessage } = this.state;
        const { confirmModalIsOpen, alertModalIsOpen } = this.state;

        const { supplement } = this.state;

        return (
            <React.Fragment>
                { supplement != null && (
                    <React.Fragment>
                        {/* TODO */} {/* <button>수정</button>*/}
                        <button onClick={this.handleDeleteBtnClick}>삭제</button>
                        <table>
                            <tbody>
                            <tr>
                                <td colSpan={2}><img src={supplement.imageURL} alt='' width={400}/></td>
                            </tr>
                            <tr>
                                <td>보조제 종류</td>
                                <td>{supplement.supplementType}</td>
                            </tr>
                            <tr>
                                <td>제조사명 (KOR)</td>
                                <td>{supplement.koreanCompanyName}</td>
                            </tr>
                            <tr>
                                <td>제조사명 (ENG)</td>
                                <td>{supplement.englishCompanyName}</td>
                            </tr>
                            <tr>
                                <td>보조제 이름 (KOT)</td>
                                <td>{supplement.koreanName}</td>
                            </tr>
                            <tr>
                                <td>보조제 이름 (ENG)</td>
                                <td>{supplement.englishName}</td>
                            </tr>
                            <tr>
                                <td>맛</td>
                                <td>{supplement.flavor} {supplement.isCaptain ? '(대표)' : null}</td>
                            </tr>
                            <tr>
                                <td>마켓 링크</td>
                                <td><Link href={supplement.marketURL} target='_blank'>{supplement.marketURL}</Link></td>
                            </tr>
                            <tr>
                                <td>가격</td>
                                <td>{supplement.price}</td>
                            </tr>
                            <tr>
                                <td>용량 (1스쿱)</td>
                                <td>{supplement.servings}</td>
                            </tr>
                            <tr>
                                <td>설명</td>
                                <td>{supplement.description}</td>
                            </tr>
                            <tr>
                                <td>다른 맛</td>
                                <td>{JSON.stringify(supplement.otherFlavors)}</td>
                                {/*<td>{supplement.otherFlavors}</td>*/}
                            </tr>
                            {/*<tr>*/}
                            {/*    <td>관련 운동 부위</td>*/}
                            {/*    <td>{JSON.stringify(workout.bodyPartKoreanName)}</td>*/}
                            {/*</tr>*/}
                            {/*<tr>*/}
                            {/*    <td>운동 영상 링크</td>*/}
                            {/*    <td><Link href={workout.videoLink} target='_blank'>{workout.videoLink}</Link></td>*/}
                            {/*</tr>*/}
                            {/*<tr>*/}
                            {/*    <td>설명</td>*/}
                            {/*    <td>{workout.description}</td>*/}
                            {/*</tr>*/}
                            </tbody>
                        </table>
                        <ConfirmModal
                            isOpen={confirmModalIsOpen}
                            onRequestClose={() => {
                                this.toggleModal('confirmModalIsOpen', false)}}
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

export default SupplementDetailContainer;