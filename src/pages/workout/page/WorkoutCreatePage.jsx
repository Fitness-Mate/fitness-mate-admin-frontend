import React from 'react';
import {Provider} from "react-redux";
import configure from "../../../store/configure";

import WorkoutDetailContainer from "../container/WorkoutDetailContainer";
import {useLocation} from "react-router-dom";
import Layout from "../../../component/layout/layout";

const WorkoutCreatePage = () => {
    const path = useLocation().pathname.split("/");
    const id = path[2];

    return (
        <Provider store={configure}>
            <Layout>
                <WorkoutDetailContainer id={id}/>
            </Layout>
        </Provider>
    );
};

export default WorkoutCreatePage;
