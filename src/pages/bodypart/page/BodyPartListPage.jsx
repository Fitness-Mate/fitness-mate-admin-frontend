import React from 'react';
import {Provider} from "react-redux";
import configure from "../../../store/configure";

import Layout from "../../../component/layout/layout";
import BodyPartListContainer from "../container/BodyPartListContainer";

const BodyPartListPage = () => {

    return (
        <Provider store={configure}>
            <Layout>
                <BodyPartListContainer />
            </Layout>
        </Provider>
    );
};

export default BodyPartListPage;
