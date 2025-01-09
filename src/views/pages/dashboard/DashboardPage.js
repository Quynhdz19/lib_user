import { cilPeople, cilBook, cilCloudUpload, cilStar } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CCardImage,
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CForm,
  CFormLabel,
  CFormText,
  CFormInput,
  CFormSelect,
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CModalFooter,
  CCardText,
  CCardTitle,
  CListGroup,
  CListGroupItem,
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { bindRouteParams, RouteMap } from 'src/routes/routeMap'
import { useNavigate } from 'react-router-dom'
import WidgetsDropdown from '../../components/dashboard/widgets/WidgetsDropdown'
import Pagination from 'src/views/components/courses-management/courses/Pagination'
import courseService from 'src/services/CourseService'
import orderService from 'src/services/OrderService'
import {
  openErrorNotification,
  openSuccessNotification,
} from 'src/views/components/base/BaseNotification'
import avatar1 from 'src/assets/images/avatars/avatar.png'
import StarRating from 'src/views/pages/dashboard/StarRating'

const DashboardPage = () => {
  const avatar = avatar1
  const navigate = useNavigate()

  const [topCourses, setTopCourses] = useState([])
  const [registrationOrders, setRegistrationOrders] = useState([])
  const [detailFile, setDetailFile] = useState({})
  const [comments, setComment] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchQuery, setSearchQuery] = useState({
    name: '',
    grade: '',
    subject: '',
  })
  const [userRating, setUserRating] = useState(0)

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setCurrentPage(1)
      setSearchQuery((prevQuery) => ({ ...prevQuery, search: searchTerm, page: 1 }))
    }, 200)

    return () => clearTimeout(debounceTimeout)
  }, [searchTerm])

  useEffect(() => {
    fetchAllFiles()
  }, [searchQuery])

  const handlePageChange = (page) => {
    setSearchQuery((prevQuery) => ({ ...prevQuery, page }))
    setCurrentPage(page)
  }

  const [visible, setVisible] = useState(false)

  const downloadThisFile = async (fileID, nameFile) => {
    try {
      const response = await orderService.downloadFile(fileID)

      // Check and log the response data to confirm it's a Blob
      console.log('Response Data:', response.data)

      // Extract the content type and determine the file extension
      const contentType = response.headers['content-type'] || 'application/octet-stream'
      const mimeExtensionMap = {
        'application/pdf': 'pdf',
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
        'application/msword': 'doc',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
        'application/vnd.ms-excel': 'xls',
        'text/plain': 'txt',
        'application/zip': 'zip',
      }
      const fileExtension = mimeExtensionMap[contentType] || 'bin'
      const baseName = nameFile.includes('.')
        ? nameFile.split('.').slice(0, -1).join('.')
        : nameFile
      const fileName = `${baseName}.${fileExtension}`

      // Create a blob from the response data and save using FileSaver.js
      const blob = new Blob([response.data], { type: contentType })
      saveAs(blob, fileName)
    } catch (error) {
      openErrorNotification(error.data?.message ?? error.message)
    }
  }

  const viewFile = async (fileID) => {
    try {
      // Fetch the file from the backend as a blob
      const response = await orderService.downloadFile(fileID, { responseType: 'blob' })

      // Create a Blob from the response data
      const fileBlob = new Blob([response.data], { type: response.headers['content-type'] })
      const fileUrl = URL.createObjectURL(fileBlob)

      // Open the Blob URL in a new tab
      window.open(fileUrl, '_blank')

      // Clean up the URL object after the file has been viewed
      setTimeout(() => URL.revokeObjectURL(fileUrl), 1000 * 60 * 5) // Revoke after 5 minutes
    } catch (error) {
      openErrorNotification(error.response?.data?.message ?? error.message)
    }
  }

  const detailFiles = async (id) => {
    setVisible(!visible)
    try {
      const response = await orderService.getDetailFiles({ id: id })
      setDetailFile(response)
      setComment(response.data.comments)
      console.log(detailFile.data)
    } catch (error) {
      openErrorNotification(error.data?.message ?? error.message)
    }
  }

  const fetchAllFiles = async () => {
    try {
      const response = await orderService.getOrders(searchQuery)
      setRegistrationOrders(response.data)
    } catch (error) {
      openErrorNotification(error.data?.message ?? error.message)
    }
  }

  const handleInputChange = (event) => {
    const { id, value } = event.target
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      [id]: value,
    }))
  }

  const handleSearch = (event) => {
    event.preventDefault()
    fetchAllFiles() // Trigger file fetching based on searchQuery state
  }
  return (
    <>
      <CModal
        scrollable
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="ScrollingLongContentExampleLabel2"
      >
        <CModalHeader>
          <CModalTitle id="ScrollingLongContentExampleLabel2">Thông tin file</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardHeader>
            Tên tác giả : {detailFile.data ? detailFile.data.uploader.username : 'Unknown'}
          </CCardHeader>
          <CCardBody>
            <CCardText>
              Trường : {detailFile.data ? detailFile.data.uploader.school : 'Unknown'}
            </CCardText>
            <CCardText>Tên file: {detailFile.data ? detailFile.data.file_name : 'Null'} </CCardText>
            <CCardText>Môn học : {detailFile.data ? detailFile.data.subject : 'Unknown'}</CCardText>
          </CCardBody>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader className="fw-bold fs-5">Tìm kiếm</CCardHeader>
            <CForm className="card-body" onSubmit={handleSearch}>
              <CRow>
                <CCol>
                  <CFormInput
                    type="text"
                    id="name"
                    label="Tên file hoặc tên môn học"
                    placeholder="Math..."
                    value={searchQuery.name}
                    onChange={handleInputChange}
                  />
                </CCol>
                <CCol>
                  <CFormSelect
                    label="Cấp học"
                    value={searchQuery.grade}
                    onChange={handleInputChange}
                    id="grade"
                  >
                    <option value="">Chọn lớp</option>
                    <option value="1">Lớp 1</option>
                    <option value="2">Lớp 2</option>
                    <option value="3">Lớp 3</option>
                    <option value="4">Lớp 4</option>
                    <option value="5">Lớp 5</option>
                    <option value="6">Lớp 6</option>
                    <option value="7">Lớp 7</option>
                    <option value="8">Lớp 8</option>
                    <option value="9">Lớp 9</option>
                  </CFormSelect>
                </CCol>
                <CCol>
                  <CFormSelect
                    label="Môn học"
                    value={searchQuery.subject}
                    onChange={handleInputChange}
                    id="subject"
                  >
                    <option value="">Chọn môn</option>
                    <option value="toan">Toán</option>
                    <option value="van">Ngữ văn</option>
                    <option value="ngoai_ngu">Ngoại ngữ (Tiếng Anh/Pháp/Trung, v.v.)</option>
                    <option value="vat_ly">Vật lý</option>
                    <option value="hoa_hoc">Hóa học</option>
                    <option value="sinh_hoc">Sinh học</option>
                    <option value="lich_su">Lịch sử</option>
                    <option value="dia_ly">Địa lý</option>
                    <option value="gdcd">Giáo dục công dân</option>
                    <option value="tin_hoc">Tin học</option>
                    <option value="the_duc">Thể dục</option>
                    <option value="quoc_phong">Giáo dục quốc phòng và an ninh</option>
                    <option value="cong_nghe">Công nghệ</option>
                    <option value="document">Tài liệu ôn thi</option>
                  </CFormSelect>
                </CCol>
              </CRow>
              <CButton className="my-4" color="primary" type="submit">
                Tìm kiếm
              </CButton>
            </CForm>
            <CCardHeader className="fw-bold fs-5">Kết quả</CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap bg-primary">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary">Tên File</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Môn học</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Cấp học</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Người đăng
                    </CTableHeaderCell>
                    {/*<CTableHeaderCell className="bg-body-tertiary text-center">*/}
                    {/*  Vote*/}
                    {/*</CTableHeaderCell>*/}
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Ngày đăng
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Hành động
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {registrationOrders.length > 0 ? (
                    registrationOrders.map((order, index) => (
                      <CTableRow onClick={() => detailFiles(order.id)} key={order.id}>
                        <CTableDataCell>{order.file_name}</CTableDataCell>
                        <CTableDataCell>{order.subject}</CTableDataCell>
                        <CTableDataCell>{order.class}</CTableDataCell>
                        <CTableDataCell>{order.uploader}</CTableDataCell>
                        {/*<CTableDataCell>*/}
                        {/*  {order.average_rating} <CIcon icon={cilStar} className="text-warning" />*/}
                        {/*</CTableDataCell>*/}
                        <CTableDataCell>{order.created_at}</CTableDataCell>
                        <CTableDataCell className="text-center">
                          <CButton
                            color="success"
                            className="me-2 fw-bold"
                            style={{ color: 'white' }}
                            onClick={() => downloadThisFile(order.id, order.file_name)}
                          >
                            Tải file
                          </CButton>
                          <CButton
                            color="danger"
                            className="fw-bold"
                            style={{ color: 'white' }}
                            onClick={() => viewFile(order.id)}
                          >
                            Xem file
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan="5" className="text-center">
                        No Orders Found
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default DashboardPage
