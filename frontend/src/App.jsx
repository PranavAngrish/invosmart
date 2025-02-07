import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import React from "react"

import InvoiceReview from "./pages/Invoice"
import SignupPage from "./pages/SignUpPage"
import SignInPage from "./pages/SignInPage"
import Home from "./pages/Home"
import BillDashboard from "./pages/billDashboard"
import PayeeManagement from "./pages/PayeeManagement"

function App() {
  // This would normally come from your auth state management
  const isAuthenticated = false

  return (
    <Router>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/billdashboard" element={<BillDashboard />} />
          <Route path="/invoice" element={<InvoiceReview />} />
          <Route path="/payee" element={<PayeeManagement />} />
      </Routes>
    </Router>
  )
}

export default App
