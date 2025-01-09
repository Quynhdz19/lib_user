import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  CContainer,
  CNav,
  CNavItem,
  CNavLink,
  CButton,
  CInputGroup,
  CFormInput,
  CInputGroupText,
  CCard,
  CCardBody
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import CourseService from 'src/services/CourseService'
import UsersTable from '../../components/courses-management/users/UsersTable'
import AddModal from '../../components/courses-management/courses/AddModal'
import DeleteModal from '../../components/courses-management/courses/DeleteModal'
import './CourseUsersManagementPage.scss'
import Pagination from '../../components/courses-management/courses/Pagination'
import { openErrorNotification } from 'src/views/components/base/BaseNotification'

const CourseUsersManagementPage = () => {
  const [users, setUsers] = useState([])
  const [usersCourse, setUsersCourse] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [modalState, setModalState] = useState({ add: false, delete: false, userIdToAction: null })
  const [activeTab, setActiveTab] = useState('users')
  const { courseId } = useParams()

  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchQuery, setSearchQuery] = useState({
    page: 1,
    size: 10,
    orderBy: 'createdAt',
    orderDirection: 'asc',
    search: null,
    isInCourse: true,
  })

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setCurrentPage(1)
      setSearchQuery(prevQuery => ({ ...prevQuery, search: searchTerm, page: 1 }))
    }, 100)

    return () => clearTimeout(debounceTimeout)
  }, [searchTerm])

  useEffect(() => {
    if (activeTab === 'users') {
      if (searchQuery.isInCourse === false) {
        setSearchQuery(prevQuery => ({ ...prevQuery, isInCourse: true, page: 1 }))
      } else {
        fetchUsersCourse()
      }
      setSelectedUsers([])
    } else if (activeTab === 'add-users') {
      if (searchQuery.isInCourse === true) {
        setSearchQuery(prevQuery => ({ ...prevQuery, isInCourse: false, page: 1 }))
      } else {
        fetchUsers()
      }
      setSelectedUsers([])
    }
  }, [activeTab, searchQuery])

  const fetchUsers = async () => {
    try {
      const response = await CourseService.getUsers(courseId, searchQuery)
      setUsers(response.data)
      setTotalPages(response.metadata.totalPage)
    } catch (error) {
      openErrorNotification(error.data?.message ?? error.message)
    }
  }

  const fetchUsersCourse = async () => {
    try {
      searchQuery.isInCourse = true
      const response = await CourseService.getUsers(courseId, searchQuery)
      setUsersCourse(response.data)
      setTotalPages(response.metadata.totalPage)
    } catch (error) {
      openErrorNotification(error.data?.message ?? error.message)
    }
  }

  const handlePageChange = (page) => {
    setSearchQuery(prevQuery => ({ ...prevQuery, page }))
    setCurrentPage(page)
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSearchTerm('')
    setSearchQuery((prevQuery) => ({ ...prevQuery, search: '', page: 1 }))
  }

  const closeModal = () => {
    setModalState({ add: false, delete: false })
  }

  const handleUserAction = (userId, action) => {
    if (action === 'add') {
      setModalState({ add: true, delete: false, userIdToAction: userId })
    } else if (action === 'delete') {
      setModalState({ add: false, delete: true, userIdToAction: userId })
    }
  }

  const handleCourseAction = async (action) => {
    try {
      const userId = modalState.userIdToAction
      const formattedData = { userIds: userId ? [userId.toString()] : selectedUsers.map(id => id.toString()) }
      if (action === 'add') {
        await CourseService.addUsers(courseId, formattedData)
        fetchUsers()
      } else if (action === 'delete') {
        await CourseService.deleteUsers(courseId, formattedData)
        fetchUsersCourse()
      }
      setSelectedUsers([])
      closeModal()
    } catch (error) {
      openErrorNotification(error.data?.message ?? error.message)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  const handleExportExcel = () => {
    const filteredData = usersCourse.map(({ fullName, email, phone, dateOfBirth }) => ({
      fullName,
      email,
      phone,
      dateOfBirth: formatDate(dateOfBirth),
    }))

    const worksheet = XLSX.utils.json_to_sheet(filteredData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Users')
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'users.xlsx')
  }

  const handleSelectedUser = (userId) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter((id) => id !== userId)
        : [...prevSelectedUsers, userId],
    )
  }

  const handleSelectAll = () => {
    if (activeTab === 'users') {
      setSelectedUsers(
        usersCourse.length === selectedUsers.length ? [] : usersCourse.map((user) => user._id),
      )
    } else if (activeTab === 'add-users') {
      setSelectedUsers(users.length === selectedUsers.length ? [] : users.map((user) => user._id))
    }
  }

  const isHeaderCheckboxChecked =
    activeTab === 'users'
      ? usersCourse.length > 0 && selectedUsers.length === usersCourse.length
      : users.length > 0 && selectedUsers.length === users.length

  return (
    <CContainer>
      <CNav variant="tabs" className="mb-4">
        <CNavItem>
          <CNavLink active={activeTab === 'users'} onClick={() => handleTabChange('users')}>
            Users
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active={activeTab === 'add-users'} onClick={() => handleTabChange('add-users')}>
            Add Users
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            active={activeTab === 'export-exl'}
            onClick={() => handleTabChange('export-exl')}
          >
            Export Excel
          </CNavLink>
        </CNavItem>
      </CNav>

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

      {activeTab === 'users' && (
        <div>
          <CContainer className="d-flex justify-content-end mb-4 gap-3">
            <CButton onClick={() => setActiveTab('export-exl')} color="primary" size="sm">
              Export
            </CButton>
            <CButton
              color="primary"
              size="sm"
              disabled={selectedUsers.length === 0}
              onClick={() => setModalState({ ...modalState, delete: true })}
            >
              Delete
            </CButton>
          </CContainer>

          <UsersTable
            users={usersCourse}
            showDeleteButton={true}
            showAddButton={false}
            handleUserAction={handleUserAction}
            handleSelectedUser={handleSelectedUser}
            selectedUsers={selectedUsers}
            isHeaderCheckboxChecked={isHeaderCheckboxChecked}
            handleSelectAll={handleSelectAll}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {activeTab === 'add-users' && (
        <div>
          <CContainer className="d-flex justify-content-end mb-4 gap-3">
            <CButton
              color="primary"
              size="sm"
              disabled={selectedUsers.length === 0}
              onClick={() => setModalState({ ...modalState, add: true })}
            >
              Add Users
            </CButton>
          </CContainer>

          <UsersTable
            users={users}
            showAddButton={true}
            showEditButton={false}
            showDeleteButton={false}
            handleUserAction={handleUserAction}
            handleSelectedUser={handleSelectedUser}
            selectedUsers={selectedUsers}
            isHeaderCheckboxChecked={isHeaderCheckboxChecked}
            handleSelectAll={handleSelectAll}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      {activeTab === 'export-exl' && (
        <CCard className="py-5">
          <CCardBody className="text-center">
            <div>
              <h2>Export users of courses to Excel</h2>
              <CButton color="primary" className="mt-3" onClick={handleExportExcel}>
                Export
              </CButton>
            </div>
          </CCardBody>
        </CCard>
      )}

      <AddModal
        visible={modalState.add}
        onClose={closeModal}
        onConfirm={() => handleCourseAction('add')}
      />

      <DeleteModal
        visible={modalState.delete}
        onClose={closeModal}
        onConfirm={() => handleCourseAction('delete')}
      />
    </CContainer>
  )
}

export default CourseUsersManagementPage