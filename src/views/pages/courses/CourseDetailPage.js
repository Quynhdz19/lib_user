import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CourseService from 'src/services/CourseService'
import { openErrorNotification } from 'src/views/components/base/BaseNotification'
import CourseDetailDescriptionCard from '../../components/courses/detail/CardDescription'
import CourseDetailModulesCard from '../../components/courses/detail/CardModules'

const CourseDetailPage = () => {
  const { courseId } = useParams()
  const [course, setCourse] = useState({})
  const [courseLoading, setCourseLoading] = useState(false)

  const fetchCourse = async () => {
    try {
      const response = await CourseService.getCourse(courseId)
      setCourse(response)
    } catch (error) {
      openErrorNotification(error.data?.message ?? error.message)
    }
  }

  useEffect(() => {
    setCourseLoading(true)
    fetchCourse().then(() => setCourseLoading(false))
  }, [])

  return (
    <div className="d-grid gap-4">
      <CourseDetailDescriptionCard
        header="Mô tả"
        content={course.description ?? ''}
        loading={courseLoading}
      />
      <CourseDetailModulesCard modules={course.modules ?? []} loading={courseLoading} />
    </div>
  )
}

export default CourseDetailPage
