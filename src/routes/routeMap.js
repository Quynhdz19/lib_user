export const RouteMap = {
  LoginPage: '/login',
  RegisterPage: '/register',
  ForgotPasswordPage: '/forgot-password',

  HomePage: '/',
  DashboardPage: '/dashboard',
  ManagementUser: '/a/users',

  CoursesListPage: '/homepage',
  CourseDetailPage: '/courses/:courseId',
  LessonPage: '/courses/:courseId/lessons/:lessonId',
  MyLearningPage: '/my-courses/learning',

  CoursesManagementPage: '/a/courses',
  FilesUploaded: '/filesUploaded',
  HistoryDownloaded: '/historyDownload',
  CourseModulesManagementPage: '/a/courses/:courseId',
  CourseUsersManagementPage: '/a/courses/:courseId/users',
  CourseLessonsManagementPage: '/a/courses/:courseId/modules/:moduleId',

  NotFoundPage: 'not-found',
  ErrorPage: 'error',
}

/**
 * Bind URL params into route.
 */
export const bindRouteParams = (route, params) => {
  // Find all placeholders in the route, like :courseId, :lessonId, etc.
  const placeholders = route.match(/:\w+/g)

  // Check if the number of placeholders matches the number of provided params
  if (!placeholders || placeholders.length !== params.length) {
    console.warn(
      `Warning: Mismatch between placeholders (${placeholders ? placeholders.length : 0}) and params (${params.length}) in route "${route}".`,
    )
    return route // Return the original route if there's a mismatch
  }

  // Replace each placeholder with the corresponding param
  const boundRoute = placeholders.reduce((path, placeholder, index) => {
    return path.replace(placeholder, params[index])
  }, route)

  return boundRoute
}
