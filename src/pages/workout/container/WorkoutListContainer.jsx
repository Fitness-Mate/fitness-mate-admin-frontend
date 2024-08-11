import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as workoutAction from '../store/workout'
import * as apiUtil from '../../../util/apiUtil'

import PaginationComponent from "../../../component/PagenationComponent";
import {Link} from "@mui/material";
import Loading from "../../../component/Loading";

class WorkoutListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.setLoading = this.setLoading.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);

        this.ajaxGetWorkoutList = this.ajaxGetWorkoutList.bind(this);

        this.state = {
            loading: false
        }
    }


    componentDidMount() {
        /* 운동 리스트 조회 */
        this.ajaxGetWorkoutList();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.state.loading !== nextProps.loading
            || this.props.workoutList !== nextProps.workoutList
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
        const { WorkoutAction } = this.props;
        await WorkoutAction.setPage(value);

        this.ajaxGetWorkoutList();
    }

    /* ajax request methods */
    ajaxGetWorkoutList() {
        const { WorkoutAction } = this.props;
        const { page, size } = this.props;

        apiUtil.sendRequest({
            setLoading: this.setLoading,
            url: `/api/admin/workout?page=${page}&size=${size}&sort=createdAt&direction=DESC`,
            method: apiUtil.methods.GET,
            success: (result) => {
                WorkoutAction.setWorkoutList(result.content);
                WorkoutAction.setTotal(result.total);
            }
        });
    }

    render() {
        const { loading } = this.state;
        const { workoutList } = this.props;
        const { page, size, total } = this.props;

        const { handlePageChange } = this;

        return (
            <React.Fragment>
                <Loading loading={loading}/>
                {workoutList != null && workoutList.length !== 0 && (
                    <React.Fragment>
                            <button onClick={()=>{window.location.href='/workout/create'}}>운동 생성</button>
                            <table>
                                <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>이미지</th>
                                        <th>운동 이름 (KOR)</th>
                                        <th>운동 이름 (ENG)</th>
                                        <th>관련 운동기구</th>
                                        <th>관련 운동부위</th>
                                        <th>설명</th>
                                        <th>생성일시</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {workoutList.map((item, idx) => (
                                        <tr key={idx}>
                                            <td>{10 * (page - 1) + idx + 1}</td>
                                            <td><img src={item.imgPath} alt=''/></td>
                                            <td><Link href={`/workout/${item.id}/detail`}>{item.koreanName}</Link></td>
                                            <td>{item.englishName}</td>
                                            <td>{JSON.stringify(item.machineKoreanName)}</td>
                                            <td>{JSON.stringify(item.bodyPartKoreanName)}</td>
                                            <td>{item.description}</td>
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
        workoutList: state.workout.workoutList,
        page: state.workout.page,
        size: state.workout.size,
        total: state.workout.total
    }),
    (dispatch) => ({
        WorkoutAction: bindActionCreators(workoutAction, dispatch)
    })
)(WorkoutListContainer);
