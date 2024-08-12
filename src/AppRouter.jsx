import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route, Navigate
} from "react-router-dom";

import WorkoutListPage from "./pages/workout/page/WorkoutListPage";
import WorkoutDetailPage from "./pages/workout/page/WorkoutDetailPage";
import MachineListPage from "./pages/machine/page/MachineListPage";
import MachineDetailPage from "./pages/machine/page/MachineDetailPage";
import BodyPartListPage from "./pages/bodypart/page/BodyPartListPage";
import BodyPartDetailPage from "./pages/bodypart/page/BodyPartDetailPage";
import WorkoutCreatePage from "./pages/workout/page/WorkoutCreatePage";
import MachineCreatePage from "./pages/machine/page/MachineCreatePage";
import BodyPartCreatePage from "./pages/bodypart/page/BodyPartCreatePage";
import SupplementListPage from "./pages/supplement/page/SupplementListPage";
import SupplementDetailPage from "./pages/supplement/page/SupplementDetailPage";
import SupplementCreatePage from "./pages/supplement/page/SupplementCreatePage";

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
                    <Route path="/workout/create" element={<WorkoutCreatePage />} />

                    <Route path="/machine/list" element={<MachineListPage />} />
                    <Route path="/machine/:id/detail" element={<MachineDetailPage />} />
                    <Route path="/machine/create" element={<MachineCreatePage />} />

                    <Route path="/bodypart/list" element={<BodyPartListPage />} />
                    <Route path="/bodypart/:id/detail" element={<BodyPartDetailPage />} />
                    <Route path="/bodypart/create" element={<BodyPartCreatePage />} />

                    <Route path="/supplement/list" element={<SupplementListPage />} />
                    <Route path="/supplement/:id/detail" element={<SupplementDetailPage />} />
                    <Route path="/supplement/create" element={<SupplementCreatePage />} />
                </Routes>
            </Router>
        )
    }
}

export default AppRouter;
