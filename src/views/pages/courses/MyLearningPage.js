import { CContainer } from '@coreui/react'
import { Empty } from 'antd'
import React, { useEffect, useState } from 'react'
import userService from 'src/services/UserService'
import BasePlaceholder from '../../components/base/BasePlaceholder'
import { openErrorNotification } from 'src/views/components/base/BaseNotification'
import CoursesLeaning from 'src/views/components/courses/CoursesLearningList'

const MyLearningPage = () => {
  const [coursesLeaning, setCoursesLeaning] = useState([])
  const [coursesLoading, setCoursesLoading] = useState(false)

  const fetchCoursesLearning = async () => {
    try {
      const response = await userService.getCourses({})
      response.forEach((course) => {
        course.isRegistered = true
      })
      setCoursesLeaning(response)
    } catch (error) {
      openErrorNotification(error.data?.message ?? error.message)
    }
  }

  useEffect(() => {
    setCoursesLoading(true)
    fetchCoursesLearning().then(() => setCoursesLoading(false))
  }, [])

  return (
    <>
      <h2 className="mt-4 mb-3">Khóa học đang học</h2>

      <CContainer style={{ margin: 0 }}>
        {coursesLoading ? (
          <BasePlaceholder />
        ) : coursesLeaning.length ? (
          <CoursesLeaning courses={coursesLeaning} />
        ) : (
          <Empty />
        )}
      </CContainer>
    </>
  )
}

export default MyLearningPage
