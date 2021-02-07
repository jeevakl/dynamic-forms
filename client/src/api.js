import Axios from 'axios'
import download from 'downloadjs'

export const api = Axios.create(
  {
    baseURL: process.env.API_URL || '',
    withCredentials: true,
    transformResponse: [
      (response, headers) => {
        if (!headers['content-type'].includes('application/json')) {
          return response
        }
        try {
          response = JSON.parse(response)
        } catch (error) {
          throw Error('Internal Error')
        }
        if (response) {
          if (response.status === 200) {
            return response.data
          } else if (response.status === 422) {
            window.location.href = '/'
          } else {
            return response
          }
        } else {
          throw new Error('Interal Error')
        }
      },
      (response, headers) => {
        if (!headers['content-type'].includes('application/pdf')) {
          return response
        }
        download(response)
      }
    ]
  }
)

export const fetchForms = () => {
  return api.get('/form')
    .then(response => {
      return response.data
    })
}

export const createForm = (form) => {
  return api.post('/form', form).then(response => {
    return response.data
  })
}

export const getForm = (_id) => {
  return api.get('/form/' + _id).then(response => {
    return response.data
  })
}

export const updateForm = (_id, form) => {
  return api.put('/form/' + _id, form).then(response => {
    return response.data
  })
}

export const deleteForm = (_id) => {
  return api.delete('/form/' + _id).then(response => {
    return response.data
  })
}

export const downloadForm = (_id, fields) => {
  return api.post('/form/' + _id + '/fill', { fields }, { responseType: 'blob' })
}

export const me = () => {
  return api.get('/auth/me').then(response => {
    return response && response.data
  })
}
