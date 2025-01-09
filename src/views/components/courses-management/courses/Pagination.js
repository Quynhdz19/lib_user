import React from 'react'
import { CPagination, CPaginationItem } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilChevronCircleLeftAlt, cilChevronCircleRightAlt } from '@coreui/icons'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="d-flex justify-content-center mt-3">
            <CPagination aria-label="Page navigation example">
                <CPaginationItem aria-label="Previous" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
                    <CIcon icon={cilChevronCircleLeftAlt} />
                </CPaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                    <CPaginationItem key={i + 1} active={currentPage === i + 1} onClick={() => onPageChange(i + 1)}>
                        {i + 1}
                    </CPaginationItem>
                ))}
                <CPaginationItem aria-label="Next" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
                    <CIcon icon={cilChevronCircleRightAlt} />
                </CPaginationItem>
            </CPagination>
        </div>
    )
}

export default Pagination
