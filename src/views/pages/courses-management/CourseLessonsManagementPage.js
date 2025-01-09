import { cilSearch } from '@coreui/icons'
import { CIcon } from '@coreui/icons-react'
import {
  CButton,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CListGroup,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LessonService from 'src/services/LessonService'
import BaseInputLesson from 'src/views/components/courses-management/lessons/BaseInputLesson'
import LessonTable from 'src/views/components/courses-management/lessons/LessonTable'
import DeleteModal from 'src/views/components/courses-management/courses/DeleteModal'
import Pagination from 'src/views/components/courses-management/courses/Pagination'
import './CoursesManagementPage.scss'
import moduleService from 'src/services/ModuleService'
import lessonService from 'src/services/LessonService'
import { openErrorNotification } from 'src/views/components/base/BaseNotification'

const CourseLessonsManagementPage = () => {
  const [lessons, setLessons] = useState([])
  const [lessonToEdit, setLessonToEdit] = useState(null)
  const [selectedLessons, setSelectedLessons] = useState([])
  const [modalState, setModalState] = useState({
    add: false,
    edit: false,
    delete: false,
    lessonIdToAction: null,
  })

  const { moduleId } = useParams()

  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    size: 10,
    orderBy: 'createdAt',
    orderDirection: 'asc',
    search: null,
  })

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setCurrentPage(1)
      setSearchQuery((prevQuery) => ({ ...prevQuery, search: searchTerm, page: 1 }))
    }, 200)

    return () => clearTimeout(debounceTimeout)
  }, [searchTerm])

  useEffect(() => {
    fetchLessons()
  }, [searchQuery])

  const fetchLessons = async () => {
    try {
      const response = await LessonService.getLessons(moduleId, searchQuery)
      setLessons(response.data)
      setTotalPages(response.metadata.totalPage)
    } catch (error) {
      openErrorNotification(error.data?.message ?? error.message)
    }
  }

  const handlePageChange = (page) => {
    setSearchQuery((prevQuery) => ({ ...prevQuery, page }))
    setCurrentPage(page)
  }

  const closeModal = () => {
    setModalState({ add: false, edit: false, delete: false, lessonIdToAction: null })
    setLessonToEdit(null)
  }

  const handleUserAction = (lessonId, action) => {
    if (action === 'add') {
      setModalState({ add: true, edit: false, delete: false, lessonIdToAction: null })
    } else if (action === 'edit') {
      const lessonToEditData = lessons.find((lesson) => lesson._id === lessonId)
      setLessonToEdit(lessonToEditData)
      setModalState({ add: false, edit: true, delete: false, lessonIdToAction: lessonId })
    } else if (action === 'delete') {
      setModalState({ add: false, edit: false, delete: true, lessonIdToAction: lessonId })
    }
  }
  const getVideoDuration = (videoFile) => {
    return new Promise((resolve, reject) => {
      const videoElement = document.createElement('video')
      const videoUrl = URL.createObjectURL(videoFile)

      videoElement.src = videoUrl

      videoElement.onloadedmetadata = () => {
        resolve(videoElement.duration)
        URL.revokeObjectURL(videoUrl) // Clean up the object URL
      }

      videoElement.onerror = () => {
        reject('Error loading video metadata')
        URL.revokeObjectURL(videoUrl) // Clean up even in case of error
      }
    })
  }
  const handleLessonAction = async (action, lessonData = null) => {
    const videoDuration = await getVideoDuration(lessonData.video)
    const presigned = await lessonService.getUploadPresignedUrl({
      filename: lessonData.video.name,
      filetype: lessonData.video.type,
    })

    const response = await fetch(presigned.presignedUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': lessonData.video.type,
      },
      body: lessonData.video,
    })
    if (response.status === 200) {
      lessonData.s3VideoKey = presigned.s3VideoKey
      try {
        if (action === 'add') {
          await lessonService.addLesson(moduleId, {
            title: lessonData.title,
            description: lessonData.description,
            s3VideoKey: presigned.s3VideoKey,
            duration: videoDuration,
          })
        } else if (action === 'edit') {
          await lessonService.updateLesson(lessonToEdit._id, lessonData)
        } else if (action === 'delete') {
          await lessonService.deleteLessons(moduleId, formattedData)
        }
      } catch (error) {
        openErrorNotification(error.data?.message ?? error.message)
      }
      fetchLessons()
      setSelectedLessons([])
      closeModal()
    }
  }
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedLessons(lessons.map((lesson) => lesson._id))
    } else {
      setSelectedLessons([])
    }
  }

  const handleSelectedLesson = (lessonId) => {
    if (selectedLessons.includes(lessonId)) {
      setSelectedLessons(selectedLessons.filter((id) => id !== lessonId))
    } else {
      setSelectedLessons([...selectedLessons, lessonId])
    }
  }

  const isDeleteButtonEnabled = selectedLessons.length > 0
  const isHeaderCheckboxChecked = lessons.length > 0 && selectedLessons.length === lessons.length

  return (
    <div>
      <CInputGroup className="mb-3">
        <CFormInput
          type="text"
          placeholder="Search Lessons"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <CInputGroupText style={{ cursor: 'pointer' }}>
          <CIcon icon={cilSearch} />
        </CInputGroupText>
      </CInputGroup>

      <CContainer className="d-flex justify-content-end mb-4 gap-3">
        <CButton onClick={() => handleUserAction(null, 'add')} color="primary" size="sm">
          Add lesson
        </CButton>
        <CButton
          color="primary"
          size="sm"
          disabled={!isDeleteButtonEnabled}
          onClick={() => handleUserAction(null, 'delete')}
        >
          Delete
        </CButton>
      </CContainer>

      <CListGroup>
        <LessonTable
          lessons={lessons}
          handleUserAction={handleUserAction}
          handleSelectedLesson={handleSelectedLesson}
          selectedLessons={selectedLessons}
          isHeaderCheckboxChecked={isHeaderCheckboxChecked}
          handleSelectAll={handleSelectAll}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </CListGroup>

      <CModal
        visible={modalState.add}
        onClose={closeModal}
        backdrop="static"
        className="modal-lg d-flex justify-content-center align-items-center"
      >
        <CModalHeader>
          <CModalTitle>Add lesson</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <BaseInputLesson onSubmit={(lessonData) => handleLessonAction('add', lessonData)} />
        </CModalBody>
      </CModal>

      <CModal
        visible={modalState.edit}
        onClose={closeModal}
        backdrop="static"
        className="modal-lg d-flex justify-content-center align-items-center"
      >
        <CModalHeader>
          <CModalTitle>Edit lesson</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <BaseInputLesson
            lessonToEdit={lessonToEdit}
            onSubmit={(lessonData) => handleLessonAction('edit', lessonData)}
          />
        </CModalBody>
      </CModal>

      <DeleteModal
        visible={modalState.delete}
        onClose={closeModal}
        onConfirm={() => handleLessonAction('delete')}
      />
    </div>
  )
}

export default CourseLessonsManagementPage
