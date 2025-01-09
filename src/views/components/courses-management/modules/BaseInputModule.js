import { cilDescription, cilPencil } from '@coreui/icons'
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

const BaseInputModule = ({ moduleToEdit, onSubmit }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (moduleToEdit) {
      setTitle(moduleToEdit.title)
      setDescription(moduleToEdit.description)
    } else {
      setTitle('')
      setDescription('')
    }
  }, [moduleToEdit])

  const handleSubmit = () => {
    if (!title || !description) {
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
                    placeholder="Name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </CInputGroup>

                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilDescription} />
                  </CInputGroupText>
                  <CFormInput
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </CInputGroup>
                <div className="d-grid">
                  <CButton color="primary" onClick={handleSubmit}>
                    {moduleToEdit  ? 'Edit module' : 'Add module'}
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

export default BaseInputModule
