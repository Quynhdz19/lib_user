import { CContainer, CImage } from '@coreui/react'
import { Carousel, Empty } from 'antd'
import React, { useEffect, useState } from 'react'
import CourseService from 'src/services/CourseService'
import { openErrorNotification } from 'src/views/components/base/BaseNotification'
import BasePlaceholder from '../../components/base/BasePlaceholder'
import CourseCardsList from '../../components/courses/CourseCardsList'

const CoursesListPage = () => {
  const [courses, setCourses] = useState([])
  const [coursesPending, setCoursesPending] = useState([])
  const [coursesNew, setCoursesNew] = useState([])
  const [coursesLoading, setCoursesLoading] = useState(false)
  const fetchAlCourses = async () => {
    try {
      const response = await CourseService.getCourses({})
      const idCoursesPending = await CourseService.getPendingCourser()
      if (response.data) {
        const newCourses = response.data.filter((item) => item.isRegistered === false)
        newCourses.forEach((item) => {
          item.isPending = false
          idCoursesPending.forEach((item2) => {
            if (item._id === item2.course) {
              item.isPending = true
            }
          })
        })
        setCourses(newCourses)
      }
    } catch (error) {
      openErrorNotification(error.data?.message ?? error.message)
    }
  }

  useEffect(() => {
    setCoursesLoading(true)
    fetchAlCourses().then(() => setCoursesLoading(false))
  }, [])

  return (
    <>
      <h2 className="mt-4 mb-3">File đã upload</h2>
    </>
  )
}

export default CoursesListPage
