import React from 'react';
import {Provider} from "react-redux";
import configure from "../../../store/configure";

import Layout from "../../../component/layout/layout";
import SupplementListContainer from "../container/SupplementListContainer";

const SupplementListPage = () => {

    return (
        <Provider store={configure}>
            <Layout>
                <SupplementListContainer />
            </Layout>
        </Provider>
    );
};

export default SupplementListPage;
