import React from 'react';
import {Provider} from "react-redux";
import configure from "../../../store/configure";

import Layout from "../../../component/layout/layout";
import WorkoutCreateContainer from "../container/WorkoutCreateContainer";

const WorkoutCreatePage = () => {
    return (
        <Provider store={configure}>
            <Layout>
                <WorkoutCreateContainer />
            </Layout>
        </Provider>
    );
};

export default WorkoutCreatePage;
