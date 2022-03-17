import React from 'react'
import DashboardContent from '../components/dashboard'
import Navbarmain from '../components/navbarmain'
import Sibar from '../components/sibar'

const Dashboard = () => {
    return (
    <>
        <Navbarmain />
        <Sibar />
        <DashboardContent />
    </>
    )
}

export default Dashboard