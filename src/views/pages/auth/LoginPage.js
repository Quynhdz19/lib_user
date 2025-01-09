import { cilLockLocked, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logo } from 'src/assets/brand/logo'
import { decodeJwtToken } from 'src/helpers/decode-token'
import { setAuthAccessToken, setAuthUser } from 'src/redux/modules/authSlice'
import { RouteMap } from 'src/routes/routeMap'
import authService from 'src/services/AuthService'

const LoginPage = () => {
  const [account, setAccount] = useState({
    username: '',
    password: '',
  })
  const [errMsg, setErrMsg] = useState({})
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setAccount({
      ...account,
      [name]: value,
    })
  }

  const validateSigninData = () => {
    const errors = {}
    if (!account.username.trim()) {
      errors.username = 'Username cannot be empty'
    } else if (account.username.includes(' ')) {
      errors.username = 'Username cannot contain spaces'
    }

    if (!account.password.trim()) {
      errors.password = 'Password cannot be empty.'
    } else if (/\s/.test(account.password)) {
      errors.password = 'Password cannot contain whitespace.'
    } else if (account.password.length <= 5) {
      errors.password = 'Password must be longer than 5 characters.'
    }

    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errors = validateSigninData()
    if (Object.keys(errors).length > 0) {
      setErrMsg(errors)
      return
    }

    try {
      setLoading(true)
      const response = await authService.signIn(account)
      setLoading(false)
      dispatch(
        setAuthUser({
          _id: response.user.id,
          username: response.user.username,
          role: response.user.is_admin ? 'ADMIN' : 'USER',
        }),
      )
      dispatch(setAuthAccessToken(response.token.access_token))
      navigate(RouteMap.DashboardPage)
    } catch (err) {
      setLoading(false)
      setErrMsg({ general: err.data.message ?? err.message })
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Đăng Nhập</h1>
                    <p className="text-body-secondary">Đăng nhập với học sinh</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="username"
                        placeholder="Username"
                        autoComplete="username"
                        value={account.username}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </CInputGroup>
                    {errMsg.username && <div className="text-danger">{errMsg.username}</div>}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={account.password}
                        onChange={handleChange}
                        disabled={loading}
                      />
                    </CInputGroup>
                    {errMsg.password && <div className="text-danger">{errMsg.password}</div>}
                    {errMsg.general && <div className="text-danger">{errMsg.general}</div>}
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit" disabled={loading}>
                          {loading && (
                            <CSpinner as="span" className="me-2" size="sm" aria-hidden="true" />
                          )}
                          Đăng nhập
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0" disabled={loading}>
                          <Link to={RouteMap.ForgotPasswordPage}>Quên mật khẩu</Link>
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <CIcon customClassName="sidebar-brand-full" icon={logo} height={100} />
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default LoginPage
