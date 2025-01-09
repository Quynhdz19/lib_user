import { CCard, CCardBody, CCardTitle } from '@coreui/react'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import CourseDetailModuleCollapse from './CollapseModule'
import BasePlaceholder from '../../base/BasePlaceholder'
import { Empty } from 'antd'

const getTotalLessons = (modules) => modules.reduce((p, c) => p + c.lessons.length, 0)
const getLearnedLessons = (modules) =>
  modules.reduce((p, c) => p + c.lessons.filter((lesson) => lesson.isLearned).length, 0)

const CourseDetailModulesCard = (props) => {
  const { loading = false } = props

  const [totalLessons, setTotalLessons] = useState(0)
  const [learnedLessons, setLearnedLessons] = useState(0)

  useEffect(() => {
    setTotalLessons(getTotalLessons(props.modules))
    setLearnedLessons(getLearnedLessons(props.modules))
  }, [props.modules])

  return (
    <CCard className={'border-light'}>
      <CCardBody className="d-grid gap-2">
        <div className="d-flex align-items-end  justify-content-between">
          <CCardTitle>
            <strong>Bài Học</strong>
          </CCardTitle>
          <span>
            Tiến độ: {learnedLessons}/{totalLessons} bài học
          </span>
        </div>

        {loading ? (
          <BasePlaceholder />
        ) : props.modules.length ? (
          <>
            {props.modules.map((module) => (
              <CourseDetailModuleCollapse
                key={module._id}
                module={module}
                activeLesson={props.activeLesson}
              />
            ))}
          </>
        ) : (
          <Empty />
        )}
      </CCardBody>
    </CCard>
  )
}
CourseDetailModulesCard.propTypes = {
  modules: PropTypes.array.isRequired,
  activeLesson: PropTypes.string,
  loading: PropTypes.bool,
}

export default CourseDetailModulesCard
