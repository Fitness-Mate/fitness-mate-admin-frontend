import React from 'react';
import {Provider} from "react-redux";
import configure from "../../../store/configure";

import WorkoutListContainer from "../container/WorkoutListContainer";
import Layout from "../../../component/layout/layout";

const WorkoutListPage = () => {

    return (
        <Provider store={configure}>
            <Layout>
                <WorkoutListContainer />
            </Layout>
        </Provider>
    );
};

export default WorkoutListPage;
