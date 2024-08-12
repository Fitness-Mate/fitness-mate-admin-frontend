import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as apiUtil from "../../../util/apiUtil";
import * as supplementAction from "../../supplement/store/supplement";

import PaginationComponent from "../../../component/PagenationComponent";
import Loading from "../../../component/Loading";

class SupplementListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.setLoading = this.setLoading.bind(this);

        this.handlePageChange = this.handlePageChange.bind(this);

        this.ajaxGetSupplementList = this.ajaxGetSupplementList.bind(this);

        this.state = {
            loading: false
        }
    }

    componentDidMount() {
        this.ajaxGetSupplementList();
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.state.loading !== nextProps.loading
            || this.props.supplementList !== nextProps.supplementList
            || this.props.page !== nextProps.page
            || this.props.size !== nextProps.size
            || this.props.total !== nextProps.total
        )
    }

    /* handlers */
    setLoading(loading) {
        this.setState({ loading: loading });
    }
    async handlePageChange(event, value) {
        const { BodyPartAction } = this.props;
        await BodyPartAction.setPage(value);

        this.ajaxGetSupplementList();
    }

    /* ajax request methods */
    ajaxGetSupplementList() {
        const { SupplementAction } = this.props;
        const { page, size } = this.props;

        // apiUtil.sendRequest({
        //     setLoading: this.setLoading,
        //     url: `/api/admin/supplement?page=${page}&size=${size}&sort=createdAt&direction=DESC`,
        //     method: apiUtil.methods.GET,
        //     success: (result) => {
        //         SupplementAction.setSupplementList(result.content);
        //         SupplementAction.setTotal(result.total);
        //     }
        // });
    }

    render() {
        const { supplementList } = this.props;
        const { page, size, total } = this.props;

        return (
            <React.Fragment>
                <Loading loading={this.state.loading}/>
                <button onClick={() => {window.location.href = '/bodypart/create'}}>보조제 생성</button>
                <table>
                    <thead>
                    <tr>

                    </tr>
                    </thead>
                    <tbody>
                        {/*{supplementList.map((item, idx) => (*/}
                        {/*    <tr key={idx}>*/}
                        {/*        <td>{10 * (page - 1) + idx + 1}</td>*/}
                        {/*        <td>{item.koreanName}</td>*/}
                        {/*        <td>{item.englishName}</td>*/}
                        {/*        <td>{item.createdAt}</td>*/}
                        {/*        <td><button onClick={() => {this.handleDeleteBtnClick(item.id)}}>삭제</button></td>*/}
                        {/*    </tr>*/}
                        {/*))}*/}
                    </tbody>
                </table>
                <PaginationComponent page={page} total={total} sizePerPage={size} handleChange={this.handlePageChange}/>
            </React.Fragment>
        )
    }
}


export default connect((state) => ({
        supplementList: state.supplement.supplementList,
        page: state.supplement.page,
        size: state.supplement.size,
        total: state.supplement.total
    }),
    (dispatch) => ({
        SupplementAction: bindActionCreators(supplementAction, dispatch)
    })
)(SupplementListContainer);
