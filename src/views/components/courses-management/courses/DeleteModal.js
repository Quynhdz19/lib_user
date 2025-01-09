import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import PropTypes from 'prop-types'
import React from 'react'

const DeleteModal = ({ visible, onClose, onConfirm }) => {
  return (
    <CModal visible={visible} onClose={onClose} backdrop="static" className="delete-modal">
      <CModalHeader closeButton>
        <CModalTitle>Confirm Deletion</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p className="text-center fs-5">Are you sure you want to delete?</p>
        <p className="text-center text-muted">This action cannot be undone.</p>
      </CModalBody>
      <CModalFooter className="d-flex justify-content-center">
        <CButton color="secondary" onClick={onClose} className="px-4">
          Cancel
        </CButton>
        <CButton color="danger" onClick={onConfirm} className="px-4">
          Delete
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

DeleteModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
}

export default DeleteModal
