import React from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as workoutAction from '../store/workout'
import * as apiUtil from '../../../util/apiUtil'

import PaginationComponent from "../../../component/PagenationComponent";
import {Link} from "@mui/material";

class WorkoutListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.handlePageChange = this.handlePageChange.bind(this);

        this.ajaxGetWorkoutList = this.ajaxGetWorkoutList.bind(this);

        this.state = {}
    }

    componentDidMount() {
        /* 운동 리스트 조회 */
        this.ajaxGetWorkoutList();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (
            this.props.workoutList !== nextProps.workoutList
            || this.props.page !== nextProps.page
            || this.props.size !== nextProps.size
            || this.props.total !== nextProps.total
        )
    }

    /* handlers */
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
            url: `/api/admin/workout/list?page=${page}&size=${size}`,
            method: apiUtil.methods.GET,
            success: (result) => {
                WorkoutAction.setWorkoutList(result.content);
                WorkoutAction.setTotal(result.total);
            }
        });
    }

    render() {
        const { workoutList } = this.props;
        const { page, size, total } = this.props;

        const { handlePageChange } = this;

        return (
            <React.Fragment>
                <table>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>이미지</th>
                            <th>운동 이름 (KOR)</th>
                            <th>운동 이름 (ENG)</th>
                            <th>관련 운동부위</th>
                            <th>설명</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workoutList.length !== 0
                            ?
                            workoutList.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{10 * (page - 1) + idx + 1}</td>
                                    <td><img src={item.imgPath} alt='' /></td>
                                    <td><Link href={`/workout/${item.id}/detail`}>{item.koreanName}</Link></td>
                                    <td>{item.englishName}</td>
                                    <td>{JSON.stringify(item.bodyPartKoreanName)}</td>
                                    <td>{item.description}</td>
                                </tr>
                            ))
                            :
                            <tr>
                                <td colSpan={4}>No Data</td>
                            </tr>
                        }
                    </tbody>
                </table>
                <PaginationComponent page={page} total={total} sizePerPage={size} handleChange={handlePageChange}/>
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
