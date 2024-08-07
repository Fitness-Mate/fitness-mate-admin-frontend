import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route, Navigate
} from "react-router-dom";

import WorkoutListPage from "./pages/workout/page/WorkoutListPage";
import WorkoutDetailPage from "./pages/workout/page/WorkoutDetailPage";

class AppRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render () {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate replace to="/workout/list" />} />

                    <Route path="/workout/list" element={<WorkoutListPage />} />
                    <Route path="/workout/:id/detail" element={<WorkoutDetailPage />} />
                </Routes>
            </Router>
        )
    }
}

export default AppRouter;
