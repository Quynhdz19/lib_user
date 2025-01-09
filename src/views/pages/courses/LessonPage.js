import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { CButton, CContainer, CSpinner } from '@coreui/react'
import { Col, Row } from 'antd'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import ReactHlsPlayer from 'react-hls-player'
import { useParams } from 'react-router-dom'
import CourseService from 'src/services/CourseService'
import LessonService from 'src/services/LessonService'
import { openErrorNotification } from 'src/views/components/base/BaseNotification'
import CourseDetailModulesCard from 'src/views/components/courses/detail/CardModules'

const LessonPage = () => {
  const { courseId, lessonId } = useParams()
  const [course, setCourse] = useState({})
  const [lesson, setLesson] = useState({})
  const [courseLoading, setCourseLoading] = useState(false)
  const [linkStream, setLinkStream] = useState('')
  const [note, setNote] = useState('')
  const [initialNote, setInitialNote] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const playerRef = useRef(null)

  const fetchCourse = async () => {
    try {
      const response = await CourseService.getCourse(courseId)
      setCourse(response)
      setLesson(findCurrentLessonInModules(response.modules, lessonId))
    } catch (error) {
      openErrorNotification(error.data?.message ?? error.message)
    }
  }

  const getLessonDetail = async () => {
    try {
      const response = await LessonService.getLessonDetail(lessonId)
      setLinkStream(response.data.linkStream)
      setNote(response.data.note || '')
      setInitialNote(response.data.note || '')
    } catch (error) {
      openErrorNotification(error.data?.message ?? error.message)
    }
  }

  const findCurrentLessonInModules = (modules, lessonId) => {
    return modules
      .reduce((flattenedArray, module) => flattenedArray.concat(module.lessons), [])
      .find((lesson) => lesson._id === lessonId)
  }

  useEffect(() => {
    setCourseLoading(true)
    fetchCourse().then(() => setCourseLoading(false))
    getLessonDetail()
  }, [])

  const handleSaveNote = async () => {
    try {
      setIsSaving(true)
      if (initialNote) {
        await LessonService.updateNote(lessonId, { note })
      } else {
        await LessonService.addNote(lessonId, { note })
      }
      setInitialNote(note)
      setIsSaving(false)
    } catch (error) {
      openErrorNotification(error.data?.message ?? error.message)
      setIsSaving(false)
    }
  }

  const videoPlayer = useMemo(
    () => (
      <ReactHlsPlayer
        src={linkStream}
        hlsConfig={{
          maxLoadingDelay: 4,
          minAutoBitrate: 0,
          lowLatencyMode: true,
        }}
        playerRef={playerRef} // Assign the ref to playerRef
        width="100%"
        height="auto"
        controls // Optional: Add controls for play, pause, etc.
      />
    ),
    [linkStream],
  )

  return (
    <div className="video-card">
      <h3>Bài học: {lesson.title}</h3>
      <Row gutter={16}>
        <Col span={16}>
          {videoPlayer}

          <CContainer className="mt-4">
            <h5>Note for this Lesson</h5>
            <CKEditor
              editor={ClassicEditor}
              data={note}
              config={{
                toolbar: {
                  items: ['undo', 'redo', '|', 'bold', 'italic'],
                },
              }}
              onChange={(event, editor) => {
                const data = editor.getData()
                setNote(data)
              }}
            />
            <CContainer className="d-flex justify-content-end mt-3">
              {note !== initialNote && (
                <CButton color="primary" size="sm" onClick={handleSaveNote} disabled={isSaving}>
                  {isSaving ? <CSpinner size="sm" /> : initialNote ? 'Save Note' : 'Add Note'}
                </CButton>
              )}
            </CContainer>
          </CContainer>
        </Col>
        <Col span={8}>
          <CourseDetailModulesCard
            modules={course.modules ?? []}
            activeLesson={lessonId}
            loading={courseLoading}
          />
        </Col>
      </Row>
    </div>
  )
}

export default LessonPage
