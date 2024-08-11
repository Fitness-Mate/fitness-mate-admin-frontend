import React from 'react';
import Loading from "../../../component/Loading";
import {Link} from "@mui/material";
import PaginationComponent from "../../../component/PagenationComponent";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as machineAction from "../../machine/store/machine";
import * as apiUtil from "../../../util/apiUtil";

class MachineListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.setLoading = this.setLoading.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);

        this.ajaxGetMachineList = this.ajaxGetMachineList.bind(this);

        this.state = {
            loading: false
        }
    }

    componentDidMount() {
        /* 운동 리스트 조회 */
        this.ajaxGetMachineList();
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.state.loading !== nextProps.loading
            || this.props.machineList !== nextProps.machineList
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
        const { MachineAction } = this.props;
        await MachineAction.setPage(value);

        this.ajaxGetMachineList();
    }

    /* ajax request methods */
    ajaxGetMachineList() {
        const { MachineAction } = this.props;
        const { page, size } = this.props;

        apiUtil.sendRequest({
            setLoading: this.setLoading,
            url: `/api/admin/machine?page=${page}&size=${size}&sort=createdAt&direction=DESC`,
            method: apiUtil.methods.GET,
            success: (result) => {
                MachineAction.setMachineList(result.content);
                MachineAction.setTotal(result.total);
            }
        });
    }

    render() {
        const { loading } = this.state;
        const { machineList } = this.props;
        const { page, size, total } = this.props;

        const { handlePageChange } = this;

        return (
            <React.Fragment>
                <Loading loading={loading}/>
                {machineList != null && machineList.length !== 0 && (
                    <React.Fragment>
                        <button onClick={()=>{window.location.href='/machine/create'}}>기구 생성</button>
                        <table>
                            <thead>
                            <tr>
                                <th>번호</th>
                                <th>기구 이름 (KOR)</th>
                                <th>기구 이름 (ENG)</th>
                                <th>생성일시</th>
                            </tr>
                            </thead>
                            <tbody>
                            {machineList.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{10 * (page - 1) + idx + 1}</td>
                                    <td>{item.koreanName}</td>
                                    <td>{item.englishName}</td>
                                    <td>{item.createdAt}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <PaginationComponent page={page} total={total} sizePerPage={size} handleChange={handlePageChange}/>
                    </React.Fragment>
                )}
            </React.Fragment>
        )
    }
}

export default connect((state) => ({
        machineList: state.machine.machineList,
        page: state.machine.page,
        size: state.machine.size,
        total: state.machine.total
    }),
    (dispatch) => ({
        MachineAction: bindActionCreators(machineAction, dispatch)
    })
)(MachineListContainer);