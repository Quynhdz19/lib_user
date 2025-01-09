import { cilDescription, cilImage, cilPencil } from '@coreui/icons'
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
} from '@coreui/react'
import React, { useEffect, useState } from 'react'

const AddUserModal = ({ userToEdit, onSubmit }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (userToEdit) {
      setTitle(userToEdit.email)
      setDescription(userToEdit.phone)
    } else {
      setTitle('')
      setDescription('')
    }
  }, [userToEdit])

  const handleSubmit = () => {
    if (!title || !description || !image) {
      alert('Bắt buộc nhập tất cả field.')
      return
    }
    onSubmit({
      title,
      description,
    })
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
                    <CIcon icon={cilPencil} />
                  </CInputGroupText>
                  <CFormInput
                    type="text"
                    placeholder="email"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilPencil} />
                  </CInputGroupText>
                  <CFormInput
                    type="text"
                    placeholder="phone"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilPencil} />
                  </CInputGroupText>
                  <CFormInput
                    type="text"
                    placeholder="fullName"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilPencil} />
                  </CInputGroupText>
                  <CFormInput
                    type="text"
                    placeholder="dateOfBirth"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilPencil} />
                  </CInputGroupText>
                  <CFormInput
                    type="text"
                    placeholder="password"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </CInputGroup>
                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilPencil} />
                  </CInputGroupText>
                  <CFormInput
                    type="text"
                    placeholder="confirm-password"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </CInputGroup>
                <div className="d-grid">
                  <CButton color="primary" onClick={handleSubmit}>
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

export default AddUserModal
