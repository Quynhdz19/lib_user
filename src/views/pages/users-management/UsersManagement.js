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
  CListGroup,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody
} from "@coreui/react"
import CIcon from '@coreui/icons-react'
import { cilSearch } from '@coreui/icons'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import UsersTable from '../../components/courses-management/users/UsersTable'
import DeleteModal from '../../components/courses-management/courses/DeleteModal'
import UserService from 'src/services/UserService'
import Pagination from 'src/views/components/courses-management/courses/Pagination'
import BaseInputUser from "src/views/components/courses-management/users/BaseInputUser"
import { openErrorNotification } from 'src/views/components/base/BaseNotification'

const UsersManagement = () => {
  const [users, setUsers] = useState([])
  const [userToEdit, setUserToEdit] = useState(null)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [modalState, setModalState] = useState({ add: false, edit: false, delete: false, userIdToAction: null })

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
    fetchUsers()
  }, [searchQuery])


  const fetchUsers = async () => {
    try {
      const response = await UserService.getUsers(searchQuery)
      setUsers(response.data)
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
    setModalState({ add: false, edit: false, delete: false, userIdToAction: null })
    setUserToEdit(null)
  }

  const handleAdminAction = (userId, action) => {
    if (action === 'add') {
      setModalState({ add: true, edit: false, delete: false, userIdToAction: null })
    } else if (action === 'edit') {
      const userToEditData = users.find((user) => user._id === userId)
      setUserToEdit(userToEditData)
      setModalState({ add: false, edit: true, delete: false, userIdToAction: userId })
    }
    else if (action === 'delete') {
      setModalState({ add: false, edit: false, delete: true, userIdToAction: userId })
    }
  }

  const handleUserAction = async (action, userData = null) => {
    try {
      const userId = modalState.userIdToAction
      const formattedData = {
        userIds: userId ? [userId.toString()] : selectedUsers.map((id) => id.toString()),
      }
      if (action === 'add') {
        await UserService.addUser(userData)
      } else if (action === 'edit') {
        await UserService.updateUser(userToEdit._id, userData)
      } else if (action === 'delete') {
        await UserService.deleteUsers(formattedData)
      }
      closeModal()
      setSelectedUsers([])
      fetchUsers()
    } catch (error) {
      openErrorNotification(error.data?.message ?? error.message)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = String(date.getUTCDate()).padStart(2, '0')
    const month = String(date.getUTCMonth() + 1).padStart(2, '0')
    const year = date.getUTCFullYear()
    return `${day}/${month}/${year}`
  }

  const handleExportExcel = () => {
    const filteredData = users.map(({ fullName, email, phone, dateOfBirth }) => ({
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

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(users.map((user) => user._id))
    } else {
      setSelectedUsers([])
    }
  }

  const handleSelectedUser = (userId) => {
    setSelectedUsers(prevSelectedUsers =>
      prevSelectedUsers.includes(userId)
        ? prevSelectedUsers.filter(id => id !== userId)
        : [...prevSelectedUsers, userId]
    )
  }
  const isDeleteButtonEnabled = selectedUsers.length > 0
  const isHeaderCheckboxChecked = users.length > 0 && selectedUsers.length === users.length

  return (
    <CContainer>
      <CInputGroup className="mb-3">
        <CFormInput
          type="text"
          placeholder="Search user"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <CInputGroupText>
          <CIcon icon={cilSearch} />
        </CInputGroupText>
      </CInputGroup>

      <CContainer className="d-flex justify-content-end mb-4 gap-3">
        <CButton onClick={() => handleAdminAction(null, 'add')} color="primary" size="sm">
          Add user
        </CButton>
        <CButton color="primary" size="sm" onClick={handleExportExcel}>
          Export
        </CButton>
        <CButton
          color="primary"
          size="sm"
          disabled={!isDeleteButtonEnabled}
          onClick={() => handleAdminAction(null, 'delete')}
        >
          Delete
        </CButton>
      </CContainer>
      <CListGroup>
        <UsersTable
          users={users}
          showAddButton={false}
          showEditButton={true}
          showDeleteButton={true}
          handleUserAction={handleAdminAction}
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

      </CListGroup>

      <CModal
        visible={modalState.add}
        onClose={closeModal}
        backdrop="static"
        className="modal-lg d-flex justify-content-center align-items-center"
      >
        <CModalHeader>
          <CModalTitle>Add user</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <BaseInputUser onSubmit={(userData) => handleUserAction('add', userData)} />
        </CModalBody>
      </CModal>

      <CModal
        visible={modalState.edit}
        onClose={closeModal}
        backdrop="static"
        className="modal-lg d-flex justify-content-center align-items-center"
      >
        <CModalHeader>
          <CModalTitle>Edit user</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <BaseInputUser
            userToEdit={userToEdit}
            onSubmit={(userData) => handleUserAction('edit', userData)}
          />
        </CModalBody>
      </CModal>

      <DeleteModal
        visible={modalState.delete}
        onClose={closeModal}
        onConfirm={() => handleUserAction('delete')}
      />
    </CContainer>
  )
}

export default UsersManagement
