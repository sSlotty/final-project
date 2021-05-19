import React from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import Sidebar from './pages/SidebarComponent';

import IndexComponent from './pages/IndexComponent'
import Home from './pages/Home'
import Login from './authentication/login'

import DoctorComponent from './pages/doctor/Doctor'
// import DoctorReportComponent from './pages/doctor/DoctorReport'
import ProcessComponent from './pages/doctor/ProcessComponent'
import DoctorDispenseComponent from './pages/doctor/DoctorDispenseComponent';

import UserComponent from './pages/user/UserComponent'
import UserEditComponent from './pages/user/UserEditComponent'
import AddUserComponent from './pages/user/AddUserComponent'

import AddMedicineComponent from './pages/medicine/AddMedicineComponent';
import ViewMedicine from './pages/medicine/ViewMedicine';
import MedicineComponent from './pages/medicine/Medicine'
import MedicineDetailComponent from './pages/medicine/MedicineDetail'

import AddPatientComponent from './pages/patient/AddPatientComponent';
import ViewReportPatientComponent from './pages/patient/ViewReportPatientComponent';
import EditPatientComponent from './pages/patient/EditPatientComponent';
import PatientComponent from './pages/patient/Patient'
import ViewReportDetailComponent from './pages/patient/ViewReportDetailComponent'

import PaymentDetailComponent from './pages/payment/PaymentDetail'
import AddOrderPaymentComponent from './pages/payment/AddOrderPaymentComponent';
import PaymentComponent from './pages/payment/Payment'
import MedicineUpdateComponent from './pages/medicine/MedicineUpdateComponent';

const isLogin = () => {
    if (localStorage.getItem("accessToken")) {
        return true;
    }

    return false;
}

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLogin() ?
                <Sidebar><Component {...props} /></Sidebar>
                : <Redirect to="/login" />
        )} />
    );
};

const PublicRoute = ({ component: Component, force, ...rest }) => {
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            isLogin() && force ?
                <Redirect to="/dashboard" />
                : <Component {...props} />
        )} />
    );
};

const RoutesApp = () => {

    return (
        <Switch>

            <PublicRoute exact path="/" force={true} component={IndexComponent}></PublicRoute>
            <PublicRoute exact path="/login" force={true} component={Login}></PublicRoute>
            <PrivateRoute exact path="/dashboard" component={Home}></PrivateRoute>

            <PrivateRoute exact path="/patient" component={PatientComponent}></PrivateRoute>
            <PrivateRoute exact path="/patient/add" component={AddPatientComponent}></PrivateRoute>
            <PrivateRoute exact path="/patient/view-report/:id" component={ViewReportPatientComponent}></PrivateRoute>
            <PrivateRoute exact path="/patient/edit/:id" component={EditPatientComponent}></PrivateRoute>
            <PrivateRoute exact path="/patient/report/:id" component={ViewReportDetailComponent}></PrivateRoute>
                
            <PrivateRoute exact path="/doctor" component={DoctorComponent}></PrivateRoute>
            {/* <PrivateRoute exact path="/doctor/report/:id" component={DoctorReportComponent}></PrivateRoute> */}
            <PrivateRoute exact path="/doctor/process/:id" component={ProcessComponent}></PrivateRoute>
            <PrivateRoute exact path="/doctor/dispense/:id" component={DoctorDispenseComponent}></PrivateRoute>

            <PrivateRoute exact path="/user" component={UserComponent}></PrivateRoute>
            <PrivateRoute exact path="/user/add" component={AddUserComponent}></PrivateRoute>
            <PrivateRoute exact path="/user/edit/:id" component={UserEditComponent}></PrivateRoute>

            <PrivateRoute exact path="/payment" component={PaymentComponent}></PrivateRoute>
            <PrivateRoute exact path="/payment/add" component={AddOrderPaymentComponent}></PrivateRoute>
            <PrivateRoute exact path="/payment/detail/:id" component={PaymentDetailComponent}></PrivateRoute>

            <PrivateRoute exact path="/medicine" component={MedicineComponent}></PrivateRoute>
            <PrivateRoute exact path="/medicine/detail/:id" component={MedicineDetailComponent}></PrivateRoute>
            <PrivateRoute exact path="/medicine/add" component={AddMedicineComponent}></PrivateRoute>
            <PrivateRoute exact path="/medicine/view" component={ViewMedicine}></PrivateRoute>
            <PrivateRoute exact path="/medicine/update/:id" component={MedicineUpdateComponent}></PrivateRoute>

        </Switch>
    )
}


export default RoutesApp;
