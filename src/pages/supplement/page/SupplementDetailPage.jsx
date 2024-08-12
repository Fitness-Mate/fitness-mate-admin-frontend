import React from 'react';
import {Provider} from "react-redux";
import configure from "../../../store/configure";

import SupplementDetailContainer from "../container/SupplementDetailContainer";
import {useLocation} from "react-router-dom";
import Layout from "../../../component/layout/layout";

const SupplementDetailPage = () => {
    const path = useLocation().pathname.split("/");
    const id = path[2];

    return (
        <Provider store={configure}>
            <Layout>
                <SupplementDetailContainer id={id}/>
            </Layout>
        </Provider>
    );
};

export default SupplementDetailPage;
