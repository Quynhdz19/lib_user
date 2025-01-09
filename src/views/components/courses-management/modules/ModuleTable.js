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
import { cilExternalLink, cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { bindRouteParams, RouteMap } from 'src/routes/routeMap'
import { useNavigate, useParams } from 'react-router-dom'

const ModuleTable = ({
    modules,
    selectedModules,
    handleSelectedModule,
    handleUserAction,
    isHeaderCheckboxChecked,
    handleSelectAll
}) => {
    const navigate = useNavigate()
    const { courseId } = useParams()

    const handleModuleClick = (moduleId) => {
        const selectedModule = modules.find((module) => module._id === moduleId)
        navigate(bindRouteParams(RouteMap.CourseLessonsManagementPage, [courseId, moduleId]), {
            state: { module: selectedModule },
        })
    }

    return (
        <CTable hover responsive>
            <CTableHead color="primary">
                <CTableRow className="textprimaryy">
                    <CTableHeaderCell>
                        <CFormCheck checked={isHeaderCheckboxChecked} onChange={handleSelectAll} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="col-4">Name</CTableHeaderCell>
                    <CTableHeaderCell className="col-4">Description</CTableHeaderCell>
                    <CTableHeaderCell className="col-1">Lesson</CTableHeaderCell>
                    <CTableHeaderCell className="text-center col-4">Action</CTableHeaderCell>
                </CTableRow>
            </CTableHead>
            <CTableBody>
                {Array.isArray(modules) && modules.length > 0 ? (
                    modules.map((module, index) => (
                        <CTableRow key={module._id}>
                            <CTableDataCell>
                                <CFormCheck
                                    checked={selectedModules.includes(module._id)}
                                    onChange={() => handleSelectedModule(module._id)}
                                />
                            </CTableDataCell>
                            <CTableDataCell className="text-course">{`module ${index + 1}: ` + module.title}</CTableDataCell>
                            <CTableDataCell className="text-course">{module.description}</CTableDataCell>
                            <CTableDataCell className="text-course">{module.lessons ? module.lessons.length : 0}</CTableDataCell>
                            <CTableDataCell className="text-center">
                                <CButton
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleUserAction(module._id, 'edit')}
                                >
                                    <CIcon icon={cilPencil} />
                                </CButton>
                                <CButton size="sm" className="me-2" onClick={() => handleModuleClick(module._id)}>
                                    <CIcon icon={cilExternalLink} />
                                </CButton>
                                <CButton
                                    size="sm"
                                    onClick={() => handleUserAction(module._id, 'delete')}
                                >
                                    <CIcon icon={cilTrash} style={{ color: 'red' }} />
                                </CButton>
                            </CTableDataCell>
                        </CTableRow>
                    ))
                ) : (
                    <CTableRow>
                        <CTableDataCell colSpan="5" className="text-center">
                            There are currently no modules
                        </CTableDataCell>
                    </CTableRow>
                )}
            </CTableBody>

        </CTable>
    )
}
export default ModuleTable