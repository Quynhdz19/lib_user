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
    CCardImage
} from '@coreui/react'
import { cilExternalLink, cilPencil, cilTrash, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { bindRouteParams, RouteMap } from 'src/routes/routeMap'
import { useNavigate } from 'react-router-dom'
const CourseTable = ({
    courses,
    selectedCourses,
    handleSelectedCourse,
    handleUserAction,
    isHeaderCheckboxChecked,
    handleSelectAll
}) => {
    const navigate = useNavigate()

    return (
        <CTable hover responsive>
            <CTableHead color="primary">
                <CTableRow className="textprimaryy">
                    <CTableHeaderCell>
                        <CFormCheck checked={isHeaderCheckboxChecked} onChange={handleSelectAll} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="col-1" />
                    <CTableHeaderCell className="col-4">Name</CTableHeaderCell>
                    <CTableHeaderCell className="col-3">Description</CTableHeaderCell>
                    <CTableHeaderCell className="col-1">Modules</CTableHeaderCell>
                    <CTableHeaderCell className="col-1">Users</CTableHeaderCell>
                    <CTableHeaderCell className="text-center col-3">Action</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {Array.isArray(courses) && courses.length > 0 ? (
                    courses.map(course => (
                        <CTableRow key={course._id}>
                            <CTableDataCell>
                                <CFormCheck
                                    checked={selectedCourses.includes(course._id)}
                                    onChange={() => handleSelectedCourse(course._id)}
                                />
                            </CTableDataCell>

                            <CTableDataCell>
                                <CCardImage
                                  src="https://independent-thinkers.co.uk/wp-content/uploads/2022/02/Free-Online-Courses-with-Certificates.jpg"
                                  style={{ maxWidth: '100px', width: 'auto' }}
                                />
                            </CTableDataCell>

                            <CTableDataCell className="text-course">{course.title}</CTableDataCell>

                            <CTableDataCell className="text-course">{course.description}</CTableDataCell>

                            <CTableDataCell className="text-course">
                                {course.modules?.length || 0}
                            </CTableDataCell>

                            <CTableDataCell className="text-course">
                                {course.totalStudents}
                            </CTableDataCell>

                            <CTableDataCell className="text-center">
                                <CButton
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleUserAction(course._id, 'edit')}
                                >
                                    <CIcon icon={cilPencil} />
                                </CButton>
                                <CButton
                                    size="sm"
                                    className="me-2"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        navigate(bindRouteParams(RouteMap.CourseUsersManagementPage, [course._id]))
                                    }}
                                >
                                    <CIcon icon={cilUser} />
                                </CButton>
                                <CButton
                                    size="sm"
                                    className="me-2"
                                    onClick={() =>
                                        navigate(bindRouteParams(RouteMap.CourseModulesManagementPage, [course._id]))
                                    }
                                >
                                    <CIcon icon={cilExternalLink} />
                                </CButton>
                                <CButton
                                    size="sm"
                                    onClick={() => handleUserAction(course._id, 'delete')}
                                >
                                    <CIcon icon={cilTrash} style={{ color: 'red' }} />
                                </CButton>
                            </CTableDataCell>
                        </CTableRow>
                    ))
                ) : (
                    <CTableRow>
                        <CTableDataCell colSpan="7" className="text-center">There are currently no courses</CTableDataCell>
                    </CTableRow>
                )}
            </CTableBody>
        </CTable>
    )
}
export default CourseTable
