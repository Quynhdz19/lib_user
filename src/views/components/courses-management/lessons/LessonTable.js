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
import { cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const LessonTable = ({
    lessons,
    selectedLessons,
    handleSelectedLesson,
    handleUserAction,
    isHeaderCheckboxChecked,
    handleSelectAll
}) => {

    return (
        <CTable hover responsive>
            <CTableHead color="primary">
                <CTableRow className="textprimaryy">
                    <CTableHeaderCell>
                        <CFormCheck checked={isHeaderCheckboxChecked} onChange={handleSelectAll} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="col-4">Name</CTableHeaderCell>
                    <CTableHeaderCell className="col-4">Description</CTableHeaderCell>
                    <CTableHeaderCell className="text-center col-4">Action</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {Array.isArray(lessons) && lessons.length > 0 ? (
                    lessons.map((lesson, index) => (
                        <CTableRow key={lesson._id}>
                            <CTableDataCell>
                                <CFormCheck
                                    checked={selectedLessons.includes(lesson._id)}
                                    onChange={() => handleSelectedLesson(lesson._id)}
                                />
                            </CTableDataCell>
                            <CTableDataCell className="text-course">{`lesson ${index + 1}: ` + lesson.title}</CTableDataCell>
                            <CTableDataCell className="text-course">{lesson.description}</CTableDataCell>
                            <CTableDataCell className="text-center">
                                <CButton
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleUserAction(lesson._id, 'edit')}
                                >
                                    <CIcon icon={cilPencil} />
                                </CButton>
                                <CButton
                                    size="sm"
                                    onClick={() => handleUserAction(lesson._id, 'delete')}
                                >
                                    <CIcon icon={cilTrash} style={{ color: 'red' }} />
                                </CButton>
                            </CTableDataCell>
                        </CTableRow>
                    ))
                ) : (
                    <CTableRow>
                        <CTableDataCell colSpan="5" className="text-center">
                            There are currently no lessons
                        </CTableDataCell>
                    </CTableRow>
                )}
            </CTableBody>

        </CTable>
    )
}
export default LessonTable