import React from 'react';
import {Provider} from "react-redux";
import configure from "../../../store/configure";

import Layout from "../../../component/layout/layout";
import MachineCreateContainer from "../container/MachineCreateContainer";

const MachineCreatePage = () => {
    return (
        <Provider store={configure}>
            <Layout>
                <MachineCreateContainer />
            </Layout>
        </Provider>
    );
};

export default MachineCreatePage;
