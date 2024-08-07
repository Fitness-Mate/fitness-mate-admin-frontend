import React from 'react';
import {Provider} from "react-redux";
import configure from "../../../store/configure";

import WorkoutDetailContainer from "../container/WorkoutDetailContainer";
import {useLocation} from "react-router-dom";

const WorkoutDetailPage = () => {
    const path = useLocation().pathname.split("/");
    const id = path[2];

    return (
        <Provider store={configure}>
            <WorkoutDetailContainer id={id}/>
        </Provider>
    );
};

export default WorkoutDetailPage;
