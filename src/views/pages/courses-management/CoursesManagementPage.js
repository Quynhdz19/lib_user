import { cilSearch } from '@coreui/icons'
import { CIcon } from '@coreui/icons-react'
import {
  CButton,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import CourseService from 'src/services/CourseService'
import BaseInputCourse from 'src/views/components/courses-management/courses/BaseInputCourse'
import DeleteModal from 'src/views/components/courses-management/courses/DeleteModal'
import Pagination from 'src/views/components/courses-management/courses/Pagination'
import CourseTable from 'src/views/components/courses-management/courses/CourseTable'
import './CoursesManagementPage.scss'
import { openErrorNotification } from 'src/views/components/base/BaseNotification'

const CoursesManagementPage = () => {
  const [courses, setCourses] = useState([])
  const [modalState, setModalState] = useState({
    add: false,
    edit: false,
    delete: false,
    courseIdToAction: null,
  })
  const [courseToEdit, setCourseToEdit] = useState(null)
  const [selectedCourses, setSelectedCourses] = useState([])

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
    fetchCourses()
  }, [searchQuery])

  const fetchCourses = async () => {
    try {
      const response = await CourseService.getCourses(searchQuery)
      setCourses(response.data)
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
    setModalState({ add: false, edit: false, delete: false })
  }

  const handleUserAction = (courseId, action) => {
    if (action === 'add') {
      setModalState({ add: true, edit: false, delete: false, courseIdToAction: null })
    } else if (action === 'edit') {
      const courseToEditData = courses.find((course) => course._id === courseId)
      setCourseToEdit(courseToEditData)
      setModalState({ add: false, edit: true, delete: false, courseIdToAction: courseId })
    } else if (action === 'delete') {
      setModalState({ add: false, edit: false, delete: true, courseIdToAction: courseId })
    }
  }

  const handleCourseAction = async (action, courseData = null) => {
    try {
      const courseId = modalState.courseIdToAction
      const formattedData = {
        courseIds: courseId ? [courseId.toString()] : selectedCourses.map((id) => id.toString()),
      }
      if (action === 'add') {
        await CourseService.addCourse(courseData)
      } else if (action === 'edit') {
        await CourseService.updateCourse(courseId, courseData)
      } else if (action === 'delete') {
        await CourseService.deleteCourses(formattedData)
      }

      fetchCourses()
      setSelectedCourses([])
      closeModal()
    } catch (error) {
      openErrorNotification(error.data?.message ?? error.message)
    }
  }

  const handleSelectAll = (e) => {
    setSelectedCourses(
      courses.length === selectedCourses.length ? [] : courses.map((course) => course._id),
    )
  }

  const handleSelectedCourse = (courseId) => {
    setSelectedCourses((prevSelectedCourses) =>
      prevSelectedCourses.includes(courseId)
        ? prevSelectedCourses.filter((id) => id !== courseId)
        : [...prevSelectedCourses, courseId],
    )
  }
  const isDeleteButtonEnabled = selectedCourses.length > 0
  const isHeaderCheckboxChecked = courses.length > 0 && selectedCourses.length === courses.length

  return (
    <div>
      <CInputGroup className="mb-3">
        <CFormInput
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <CInputGroupText>
          <CIcon icon={cilSearch} />
        </CInputGroupText>
      </CInputGroup>

      <CContainer className="d-flex justify-content-end mb-4 gap-3">
        <CButton onClick={() => handleUserAction(null, 'add')} color="primary" size="sm">
          Add course
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

      <CourseTable
        courses={courses}
        handleUserAction={handleUserAction}
        handleSelectedCourse={handleSelectedCourse}
        selectedCourses={selectedCourses}
        isHeaderCheckboxChecked={isHeaderCheckboxChecked}
        handleSelectAll={handleSelectAll}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <CModal
        visible={modalState.add}
        onClose={closeModal}
        backdrop="static"
        className="modal-lg d-flex justify-content-center align-items-center"
      >
        <CModalHeader>
          <CModalTitle>Add course</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <BaseInputCourse onSubmit={(courseData) => handleCourseAction('add', courseData)} />
        </CModalBody>
      </CModal>

      <CModal
        visible={modalState.edit}
        onClose={closeModal}
        backdrop="static"
        className="modal-lg d-flex justify-content-center align-items-center"
      >
        <CModalHeader>
          <CModalTitle>Edit course</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <BaseInputCourse
            courseToEdit={courseToEdit}
            onSubmit={(courseData) => handleCourseAction('edit', courseData)}
          />
        </CModalBody>
      </CModal>

      <DeleteModal
        visible={modalState.delete}
        onClose={closeModal}
        onConfirm={() => handleCourseAction('delete')}
      />
    </div>
  )
}

export default CoursesManagementPage
