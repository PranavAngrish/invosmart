import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import React from "react"

import InvoiceReview from "./pages/InvoiceReview"
import SignupPage from "./pages/SignUpPage"
import SignInPage from "./pages/SignInPage"
import BillsPage from "./pages/BillsPage"
import Home from "./pages/Home"

function App() {
  // This would normally come from your auth state management
  const isAuthenticated = false

  return (
    <Router>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/invoice" element={<InvoiceReview />} />
          <Route path="/pending" element={<BillsPage />} />
          
      </Routes>
    </Router>
  )
}

export default App

