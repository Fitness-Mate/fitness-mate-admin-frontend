import React from 'react';

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    } // end constructor

    render() {
        return (
            <footer className='bg-white pt-3 mt-5'>
                <div className="container-xxl fs-7 pb-4 px-3 text-muted">
                    <div className='row'>
                        <div className='col-lg-8'>
                            Footer
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
