import { cilCalendar, cilLockLocked, cilPhone, cilEnvelopeClosed, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CFormFeedback,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { isValidPhoneNumber } from 'libphonenumber-js'

const BaseInputUser = ({ userToEdit, onSubmit }) => {
  const [userData, setUserData] = useState({
    email: '',
    phone: '',
    fullName: '',
    dateOfBirth: '',
    password: '',
  })
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (userToEdit) {
      setUserData({
        email: userToEdit.email || '',
        phone: userToEdit.phone || '',
        fullName: userToEdit.fullName || '',
        dateOfBirth: userToEdit.dateOfBirth
          ? new Date(userToEdit.dateOfBirth).toLocaleDateString('en-CA')
          : '',
        password: '',
      })
    } else {
      setUserData({
        email: '',
        phone: '',
        fullName: '',
        dateOfBirth: '',
        password: '',
      })
    }
  }, [userToEdit])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const validate = () => {
    let validationErrors = {}
    const { email, phone, fullName, dateOfBirth, password } = userData

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      validationErrors.email = 'Email không hợp lệ.'
    }

    if (!phone || !isValidPhoneNumber(phone, 'VN')) {
      validationErrors.phone = 'Số điện thoại không hợp lệ.'
    }

    if (!fullName) {
      validationErrors.fullName = 'Tên không hợp lệ.'
    }

    if (!dateOfBirth) {
      validationErrors.dateOfBirth = 'Ngày sinh không hợp lệ.'
    }

    if (!userToEdit && (!password || password !== confirmPassword)) {
      validationErrors.password = 'Mật khẩu không hợp lệ hoặc không khớp.'
    }

    return validationErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const [year, month, day] = new Date(userData.dateOfBirth).toLocaleDateString('en-CA').split('-')
    const formattedDateOfBirth = `${month}/${day}/${year}`

    const submissionData = {
      ...userData,
      dateOfBirth: formattedDateOfBirth,
     
    }

    onSubmit(submissionData)
  }

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol>
          <CCard>
            <CCardBody>
              <CForm onSubmit={handleSubmit}>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilEnvelopeClosed} />
                  </CInputGroupText>
                  <CFormInput
                    type="text"
                    placeholder="Email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    autoComplete="no"
                    invalid={!!errors.email}
                  />
                  {errors.email && <CFormFeedback invalid>{errors.email}</CFormFeedback>}
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilPhone} />
                  </CInputGroupText>
                  <CFormInput
                    type="text"
                    placeholder="Phone"
                    name="phone"
                    value={userData.phone}
                    onChange={handleChange}
                    autoComplete="no"
                    invalid={!!errors.phone}
                  />
                  {errors.phone && <CFormFeedback invalid>{errors.phone}</CFormFeedback>}
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilUser} />
                  </CInputGroupText>
                  <CFormInput
                    type="text"
                    placeholder="Full Name"
                    name="fullName"
                    value={userData.fullName}
                    onChange={handleChange}
                    autoComplete="no"
                    invalid={!!errors.fullName}
                  />
                  {errors.fullName && <CFormFeedback invalid>{errors.fullName}</CFormFeedback>}
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilCalendar} />
                  </CInputGroupText>
                  <CFormInput
                    type="date"
                    placeholder="Date of Birth"
                    name="dateOfBirth"
                    value={userData.dateOfBirth}
                    onChange={handleChange}
                    invalid={!!errors.dateOfBirth}
                  />
                  {errors.dateOfBirth && <CFormFeedback invalid>{errors.dateOfBirth}</CFormFeedback>}
                </CInputGroup>

                {!userToEdit && (
                  <>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                        invalid={!!errors.password}
                      />
                      {errors.password && <CFormFeedback invalid>{errors.password}</CFormFeedback>}
                    </CInputGroup>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                        invalid={!!errors.password}
                      />
                      {errors.password && <CFormFeedback invalid>{errors.password}</CFormFeedback>}
                    </CInputGroup>
                  </>
                )}

                <div className="d-grid">
                  <CButton color="primary" type="submit">
                    {userToEdit ? 'Edit User' : 'Create User'}
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default BaseInputUser
