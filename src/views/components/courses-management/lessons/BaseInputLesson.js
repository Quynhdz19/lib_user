import React, { useState, useEffect } from 'react'
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
import CIcon from '@coreui/icons-react'
import { cilMovie, cilPencil, cilDescription } from '@coreui/icons'

const BaseInputLesson = ({ lessonToEdit, onSubmit }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [video, setVideo] = useState(null)

  useEffect(() => {
    if (lessonToEdit) {
      setTitle(lessonToEdit.title)
      setDescription(lessonToEdit.description)
      setVideo(lessonToEdit.video)
    } else {
      setTitle('')
      setDescription('')
      setVideo(null)
    }
  }, [lessonToEdit])

  const handleSubmit = () => {
    if (!title || !description || !video) {
      alert('Bắt buộc nhập tất cả field.')
      return
    }
    onSubmit({
      title,
      description,
      video,
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

                <CInputGroup className="mb-3">
                  <CInputGroupText>
                    <CIcon icon={cilMovie} />
                  </CInputGroupText>
                  <CFormInput type="file" onChange={(e) => setVideo(e.target.files[0])} />
                </CInputGroup>

                <div className="d-grid">
                  <CButton color="primary" onClick={handleSubmit}>
                    {lessonToEdit ? 'Update lesson' : 'Add lesson'}
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

export default BaseInputLesson
