import React from 'react';
import {Provider} from "react-redux";
import configure from "../../../store/configure";

import BodyPartDetailContainer from "../container/BodyPartDetailContainer";
import {useLocation} from "react-router-dom";
import Layout from "../../../component/layout/layout";

const BodyPartDetailPage = () => {
    const path = useLocation().pathname.split("/");
    const id = path[2];

    return (
        <Provider store={configure}>
            <Layout>
                <BodyPartDetailContainer id={id}/>
            </Layout>
        </Provider>
    );
};

export default BodyPartDetailPage;
