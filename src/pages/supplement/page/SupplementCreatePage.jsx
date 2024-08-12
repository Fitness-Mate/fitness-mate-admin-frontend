import React from 'react';
import {Provider} from "react-redux";
import configure from "../../../store/configure";

import Layout from "../../../component/layout/layout";
import SupplementCreateContainer from "../container/SupplementCreateContainer";

const SupplementCreatePage = () => {
    return (
        <Provider store={configure}>
            <Layout>
                <SupplementCreateContainer />
            </Layout>
        </Provider>
    );
};

export default SupplementCreatePage;
