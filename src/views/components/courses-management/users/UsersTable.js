import React from 'react'
import {
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CFormCheck,
  CButton,
} from '@coreui/react'
import { cilTrash, cilUserPlus, cilPencil } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const UsersTable = ({
  users,
  selectedUsers,
  handleSelectedUser,
  handleUserAction,
  showAddButton,
  showEditButton,
  showDeleteButton,
  isHeaderCheckboxChecked,
  handleSelectAll,
}) => (
  <CTable hover responsive>
    <CTableHead color="primary">
      <CTableRow className="textprimaryy">
        <CTableHeaderCell>
          <CFormCheck checked={isHeaderCheckboxChecked} onChange={handleSelectAll} />
        </CTableHeaderCell>
        <CTableHeaderCell className="col-5">Name</CTableHeaderCell>
        <CTableHeaderCell className="col-3">Email</CTableHeaderCell>
        <CTableHeaderCell className="col-2">Phone</CTableHeaderCell>
        <CTableHeaderCell className="text-center col-2">Action</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      {Array.isArray(users) && users.length > 0 ? (
        users.map((user) => (
          <CTableRow key={user._id}>
            <CTableDataCell>
              <CFormCheck
                checked={selectedUsers.includes(user._id)}
                onChange={() => handleSelectedUser(user._id)}
              />
            </CTableDataCell>
            <CTableDataCell className="text-course">{user.fullName}</CTableDataCell>
            <CTableDataCell className="text-course">{user.email}</CTableDataCell>
            <CTableDataCell className="text-course">{user.phone}</CTableDataCell>
            <CTableDataCell className="text-center">
              {showAddButton && (
                <CButton size="sm" onClick={() => handleUserAction(user._id, 'add')}>
                  <CIcon icon={cilUserPlus} style={{ color: 'green' }} />
                </CButton>
              )}
              {showEditButton && (
                <CButton size="sm" onClick={() => handleUserAction(user._id, 'edit')}>
                  <CIcon icon={cilPencil} />
                </CButton>
              )}
              {showDeleteButton && (
                <CButton size="sm" onClick={() => handleUserAction(user._id, 'delete')}>
                  <CIcon icon={cilTrash} style={{ color: 'red' }} />
                </CButton>
              )}
            </CTableDataCell>
          </CTableRow>
        ))
      ) : (
        <CTableRow>
          <CTableDataCell colSpan="5" className="text-center">
            There are currently no users
          </CTableDataCell>
        </CTableRow>
      )}
    </CTableBody>
  </CTable>
)

export default UsersTable