import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import PropTypes from 'prop-types'
import React from 'react'

const AddModal = ({ visible, onClose, onConfirm }) => {
  return (
    <CModal visible={visible} onClose={onClose} backdrop="static" className="add-user-modal">
      <CModalHeader closeButton>
        <CModalTitle>Confirm Adding Users</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p className="text-center fs-5">Are you sure you want to add the selected users to the course?</p>
        <p className="text-center text-muted">This action will enroll the users in the course.</p>
      </CModalBody>
      <CModalFooter className="d-flex justify-content-center">
        <CButton color="secondary" onClick={onClose} className="px-4">
          Cancel
        </CButton>
        <CButton color="primary" onClick={onConfirm} className="px-4">
          Add Users
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

AddModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
}

export default AddModal
