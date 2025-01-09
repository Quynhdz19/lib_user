import {
  CAvatar,
  CCard,
  CCardBody,
  CCardImage,
  CCardText,
  CCardTitle,
  CLink,
  CRow,
  CButton,
} from '@coreui/react'
import PropTypes from 'prop-types'
import React from 'react'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import { bindRouteParams, RouteMap } from 'src/routes/routeMap'
import './CourseCardsList.scss'
import courseService from 'src/services/CourseService'

const CourseCardsList = (props) => {
  const handleButtonClick = (event, courseId) => {
    event.preventDefault()
    event.stopPropagation()
    try {
      courseService
        .registerCourse(courseId)
        .then(() => {
          window.location.reload()
        })
        .catch()
    } catch (err) {
      console.error(err)
      // Handle error here
    }
  }

  return (
    <CRow xs={{ cols: 1, gutter: 4 }} sm={{ cols: 2 }} lg={{ cols: 3 }} xl={{ cols: 4 }}>
      {props.courses.map((course) => (
        <div key={course._id} className="d-flex">
          <CLink
            className="lesson-content"
            href={bindRouteParams(RouteMap.CourseDetailPage, [course._id])}
          >
            <CCard className="h-100 d-flex flex-column card-hover">
              <CCardImage size="md" src="https://independent-thinkers.co.uk/wp-content/uploads/2022/02/Free-Online-Courses-with-Certificates.jpg" />
              <CCardBody className="d-flex flex-column justify-content-between">
                <CCardTitle>
                  <span>{course.title}</span>
                </CCardTitle>
                <div className="d-flex align-items-center mt-auto">
                  <CAvatar className="me-2" size="md" src={avatar2} />
                  <CCardText>Lê Xuân Quỳnh</CCardText>
                </div>
                {course.isPending ? (
                  <CButton className="my-2" color="warning">
                    Đang xử lý
                  </CButton>
                ) : (
                  <CButton
                    className="my-2"
                    color="primary"
                    onClick={(event) => handleButtonClick(event, course._id)}
                  >
                    Đăng ký ngay
                  </CButton>
                )}
              </CCardBody>
            </CCard>
          </CLink>
        </div>
      ))}
    </CRow>
  )
}

CourseCardsList.propTypes = {
  courses: PropTypes.array.isRequired,
}

export default CourseCardsList
