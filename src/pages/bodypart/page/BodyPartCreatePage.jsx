import React from 'react';
import {Provider} from "react-redux";
import configure from "../../../store/configure";

import Layout from "../../../component/layout/layout";
import BodyPartCreateContainer from "../container/BodyPartCreateContainer";

const BodyPartCreatePage = () => {
    return (
        <Provider store={configure}>
            <Layout>
                <BodyPartCreateContainer />
            </Layout>
        </Provider>
    );
};

export default BodyPartCreatePage;
