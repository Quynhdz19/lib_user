import { CCard, CCardBody, CCardText, CCardTitle } from '@coreui/react'
import PropTypes from 'prop-types'
import React from 'react'
import BasePlaceholder from '../../base/BasePlaceholder'

const CourseDetailDescriptionCard = (props) => {
  const { header, content, loading = false } = props
  const paragraphs = content.split('\n')

  return (
    <CCard className={'border-light'}>
      <CCardBody>
        <CCardTitle>
          <strong>{header}</strong>
        </CCardTitle>
        {loading ? (
          <BasePlaceholder />
        ) : (
          <>
            {paragraphs.map((paragraph, index) => (
              <CCardText key={index}>{paragraph}</CCardText>
            ))}
          </>
        )}
      </CCardBody>
    </CCard>
  )
}

CourseDetailDescriptionCard.propTypes = {
  header: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  loading: PropTypes.bool,
}

export default CourseDetailDescriptionCard
