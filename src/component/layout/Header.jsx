import React from 'react';

import { Link } from "@mui/material";


const Header = () => {

    return (
        <React.Fragment>
            <h1>
                <Link href={`/workout/list`} style={{marginRight: 40}}>운동 리스트 조회</Link>
                <Link href={`/machine/list`} style={{marginRight: 40}}>기구 리스트 조회</Link>
                <Link href={`/bodypart/list`} style={{marginRight: 40}}>부위 리스트 조회</Link>
                <Link href={`/supplement/list`} style={{marginRight: 40}}>보조제 리스트 조회</Link>
            </h1>
        </React.Fragment>
    );
};
export default Header;
