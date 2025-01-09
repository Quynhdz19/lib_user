import PropTypes from 'prop-types'
import React, { lazy } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import DefaultLayout from 'src/views/layout/DefaultLayout'
import { RouteMap } from './routeMap'
import UsersManagement from 'src/views/pages/users-management/UsersManagement'
import FilesUploaded from 'src/views/pages/dashboard/FilesUpload'
import HistoryDownloaded from "src/views/pages/dashboard/HistoryDownloaded";

const LoginPage = lazy(() => import('src/views/pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('src/views/pages/auth/RegisterPage'))

const DashboardPage = lazy(() => import('src/views/pages/dashboard/DashboardPage'))

const CoursesListPage = lazy(() => import('src/views/pages/courses/CoursesListPage'))
const CourseDetailPage = lazy(() => import('src/views/pages/courses/CourseDetailPage'))
const LessonPage = lazy(() => import('src/views/pages/courses/LessonPage'))
const MyLearningPage = lazy(() => import('src/views/pages/courses/MyLearningPage'))

const CoursesManagementPage = lazy(
  () => import('src/views/pages/courses-management/CoursesManagementPage'),
)
const CourseModulesManagementPage = lazy(
  () => import('src/views/pages/courses-management/CourseModulesManagementPage'),
)
const CourseUsersManagementPage = lazy(
  () => import('src/views/pages/courses-management/CourseUsersManagementPage'),
)
const CourseLessonsManagementPage = lazy(
  () => import('src/views/pages/courses-management/CourseLessonsManagementPage'),
)

const NotFoundPage = lazy(() => import('src/views/pages/errors/NotFoundPage'))
const ErrorPage = lazy(() => import('src/views/pages/errors/ErrorPage'))

const AuthGuard = (props) => {
  const { isPublic = false } = props
  const { requireAdmin = false } = props

  const authState = useSelector((state) => state.auth)

  if (!isPublic && !authState.user?._id) return <Navigate to={RouteMap.LoginPage} replace />

  if (requireAdmin && authState.user?.role !== 'ADMIN')
    return <Navigate to={RouteMap.HomePage} replace />

  return props.element
}
AuthGuard.propTypes = {
  element: PropTypes.node,
  isPublic: PropTypes.bool,
  requireAdmin: PropTypes.bool,
}

const routes = [
  {
    path: RouteMap.LoginPage,
    element: <LoginPage />,
  },
  {
    path: RouteMap.RegisterPage,
    element: <RegisterPage />,
  },
  {
    element: <DefaultLayout />,
    children: [
      {
        path: RouteMap.HomePage,
        element: <AuthGuard element={<CoursesListPage />} />,
      },
      {
        path: RouteMap.DashboardPage,
        element: <AuthGuard element={<DashboardPage />} />,
      },
      {
        path: RouteMap.CoursesListPage,
        element: <AuthGuard element={<CoursesListPage />} />,
      },
      {
        path: RouteMap.CourseDetailPage,
        element: <AuthGuard element={<CourseDetailPage />} />,
      },
      {
        path: RouteMap.LessonPage,
        element: <AuthGuard element={<LessonPage />} />,
      },
      {
        path: RouteMap.MyLearningPage,
        element: <AuthGuard element={<MyLearningPage />} />,
      },
      {
        path: RouteMap.FilesUploaded,
        element: <AuthGuard element={<FilesUploaded />} />,
      },
      {
        path: RouteMap.HistoryDownloaded,
        element: <AuthGuard element={<HistoryDownloaded />} />,
      },
      {
        path: RouteMap.CourseModulesManagementPage,
        element: <AuthGuard requireAdmin={true} element={<CourseModulesManagementPage />} />,
      },
      {
        path: RouteMap.CourseUsersManagementPage,
        element: <AuthGuard requireAdmin={true} element={<CourseUsersManagementPage />} />,
      },
      {
        path: RouteMap.CourseLessonsManagementPage,
        element: <AuthGuard requireAdmin={true} element={<CourseLessonsManagementPage />} />,
      },
      {
        path: RouteMap.ManagementUser,
        element: <AuthGuard requireAdmin={true} element={<UsersManagement />} />,
      },
    ],
  },
  {
    path: RouteMap.NotFoundPage,
    element: <NotFoundPage />,
  },
  {
    path: RouteMap.ErrorPage,
    element: <ErrorPage />,
  },
  {
    path: '*',
    element: <Navigate to={RouteMap.NotFoundPage} replace />,
  },
]

export default routes
