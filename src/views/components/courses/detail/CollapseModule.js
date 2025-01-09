import { cilCheckAlt, cilMediaPlay, cilMinus, cilPlus } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CCard, CCardBody, CCardTitle, CCollapse, CListGroup, CListGroupItem } from '@coreui/react'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { bindRouteParams, RouteMap } from 'src/routes/routeMap'

const checkModuleHasActiveLesson = (lessons, activeLesson) =>
  !!lessons.find((lesson) => lesson._id === activeLesson)

const CourseDetailModuleCollapse = (props) => {
  const [visible, setVisible] = useState(
    checkModuleHasActiveLesson(props.module.lessons, props.activeLesson),
  )
  const { courseId } = useParams()
  return (
    <CCard
      className={'border-light'}
      style={{ cursor: 'pointer' }}
      onClick={() => setVisible(!visible)}
      aria-expanded={visible}
      aria-controls="collapse"
    >
      <CCardBody>
        <CCardTitle>
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <div className="line-clamp" style={{ WebkitLineClamp: 3, lineHeight: '1.7rem' }}>
              {props.module.title}
            </div>
            <div>{visible ? <CIcon icon={cilMinus} /> : <CIcon icon={cilPlus} />}</div>
          </div>
        </CCardTitle>
        <CCollapse id="collapse" visible={visible}>
          <CListGroup flush>
            {props.module.lessons.map((lesson, index) => (
              <CListGroupItem
                key={index}
                as="a"
                href={bindRouteParams(RouteMap.LessonPage, [courseId, lesson._id])}
                active={lesson._id === props.activeLesson}
              >
                <div
                  style={{
                    minHeight: '36px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ marginRight: '12px' }}>
                    <CIcon icon={lesson.isLearned ? cilCheckAlt : cilMediaPlay} />
                  </div>
                  <div className="line-clamp" style={{ WebkitLineClamp: 3, lineHeight: '1.7rem' }}>
                    {lesson.title}
                  </div>
                </div>
              </CListGroupItem>
            ))}
          </CListGroup>
        </CCollapse>
      </CCardBody>
    </CCard>
  )
}

CourseDetailModuleCollapse.propTypes = {
  module: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    lessons: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
  activeLesson: PropTypes.string,
}

export default CourseDetailModuleCollapse
