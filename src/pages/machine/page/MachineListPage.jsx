import React from 'react';
import {Provider} from "react-redux";
import configure from "../../../store/configure";

import Layout from "../../../component/layout/layout";
import MachineListContainer from "../container/MachineListContainer";

const MachineListPage = () => {

    return (
        <Provider store={configure}>
            <Layout>
                <MachineListContainer />
            </Layout>
        </Provider>
    );
};

export default MachineListPage;
