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

const BaseInputCourse = ({ courseToEdit, onSubmit }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)

  useEffect(() => {
    if (courseToEdit) {
      setTitle(courseToEdit.title)
      setDescription(courseToEdit.description)
      setImage(courseToEdit.image)
    } else {
      setTitle('')
      setDescription('')
      setImage(null)
    }
  }, [courseToEdit])

  const handleSubmit = () => {
    if (!title || !description || (!courseToEdit && !image)) {
      alert('Bắt buộc nhập tất cả field.')
      return
    }

    onSubmit({
      title,
      description,
      image: image || courseToEdit?.image,
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
                    <CIcon icon={cilImage} />
                  </CInputGroupText>
                  <CFormInput type="file" onChange={(e) => setImage(e.target.files[0])} />
                </CInputGroup>

                <div className="d-grid">
                  <CButton color="primary" onClick={handleSubmit}>
                    {courseToEdit ? 'Edit course' : 'Add course'}
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

export default BaseInputCourse
