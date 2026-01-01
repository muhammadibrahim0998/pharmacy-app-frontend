import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

// Pages
import Clinicians from './Helth/Clinicians'
import ClinicianList from './Helth/Clininician-List' 
import DiagnosisList from '../components/Helth/Diagnoses-List'  
import Drugs from '../../src/components/Helth/Drugs' 
import DrugList from '../../src/components/Helth/Drug-list'
import DrugTable from '../../src/components/Helth/DrugTable'
import Pharmacies from '../../src/components/Helth/Pharmacies'
import PayersTable from '../../src/components/Helth/PayersTable'



import Dashboard from '../views/dashboard/Dashboard'
import Widgets from '../views/widgets/Widgets'
import Charts from '../views/charts/Charts'


const AppContent = () => {
  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/widgets" element={<Widgets />} />
          <Route path="/clinicians" element={<Clinicians />} />
          <Route path="/clinicians-list" element={<ClinicianList />} />
          <Route path="/diagnosis-list" element={<DiagnosisList />} />
          <Route path="/drugs" element={<Drugs />} />
          <Route path="/drug-list" element={<DrugList />} />
          <Route path="/DrugTable" element={<DrugTable />} />
          <Route path="/Pharmacies" element={<Pharmacies />} />
          <Route path="/PayersTable" element={<PayersTable />} />

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default AppContent // ⚡ دا مهم دی
