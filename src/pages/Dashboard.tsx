import React from 'react'
import Navbar from '../components/Navbar';
import DataSection from '../components/DataSection';

type DashboardProps = {

}

const Dashboard = (props: DashboardProps) => {
  return (
    <>
      <Navbar />
      <DataSection />
    </>
  )
}

export default Dashboard;