import React, {Component} from "react";

import theme from "../../theme";
import { ThemeProvider } from '@mui/material/styles';

import Header from "./Header";
import Footer from "./Footer";

class Layout extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return false;
    }

    render() {
        const { children } = this.props;

        return (
            <ThemeProvider theme={theme}>
                <div id="root">
                    <Header/>
                    {children}
                    <Footer/>
                </div>
            </ThemeProvider>
        )
    }
}

Layout.defaultProps = {
    category: "monitoring",
    page: "",
}

export default Layout;
