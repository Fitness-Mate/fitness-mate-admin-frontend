import React from 'react';
import {Provider} from "react-redux";
import configure from "../../../store/configure";

import WorkoutListContainer from "../container/WorkoutListContainer";

const WorkoutListPage = () => {

    return (
        <Provider store={configure}>
            <WorkoutListContainer />
        </Provider>
    );
};

export default WorkoutListPage;
