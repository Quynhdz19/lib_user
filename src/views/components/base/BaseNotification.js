import { notification } from 'antd'

export const openNotification = (message = 'Info', description = undefined) => {
  notification.open({
    type: 'info',
    message,
    description,
  })
}

export const openSuccessNotification = (message = 'Success', description = undefined) => {
  notification.open({
    type: 'success',
    message,
    description,
  })
}

export const openWarningNotification = (message = 'Warning', description = undefined) => {
  notification.open({
    type: 'warning',
    message,
    description,
  })
}

export const openErrorNotification = (message = 'Error', description = undefined) => {
  notification.open({
    type: 'error',
    message,
    description,
  })
}
