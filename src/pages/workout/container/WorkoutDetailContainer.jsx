import React from 'react';

class WorkoutDetailContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        const { id } = this.props;

        return (
            <React.Fragment>
                <h1>WorkoutDetailContainer</h1>
                workout id is {id}
            </React.Fragment>
        )
    }
}

// export default connect((state) => ({
//         workoutList: state.workout.workoutList,
//         page: state.workout.page,
//         size: state.workout.size,
//         total: state.workout.total
//     }),
//     (dispatch) => ({
//         WorkoutAction: bindActionCreators(workoutAction, dispatch)
//     })
// )(BodyPartDetailContainer);

export default WorkoutDetailContainer;