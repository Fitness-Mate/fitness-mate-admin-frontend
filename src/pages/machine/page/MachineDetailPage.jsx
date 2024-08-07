import React from 'react';
import {Provider} from "react-redux";
import configure from "../../../store/configure";

import MachineDetailContainer from "../container/MachineDetailContainer";
import {useLocation} from "react-router-dom";
import Layout from "../../../component/layout/layout";

const MachineDetailPage = () => {
    const path = useLocation().pathname.split("/");
    const id = path[2];

    return (
        <Provider store={configure}>
            <Layout>
                <MachineDetailContainer id={id}/>
            </Layout>
        </Provider>
    );
};

export default MachineDetailPage;
