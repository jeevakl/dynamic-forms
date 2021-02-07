import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteForm, fetchForms } from '../api'
import { AuthContext } from '../components/auth'

export function Home (props) {
  const [forms, setForms] = useState([])
  const [loading, setLoading] = useState(true)

  const authContext = useContext(AuthContext)

  const init = () => {
    fetchForms().then(data => {
      setForms(data.forms)
      setLoading(false)
    })
  }

  useEffect(() => {
    init()
  }, [])

  const onDelete = (_id) => {
    setLoading(true)
    deleteForm(_id).then(() => {
      init()
    })
  }

  return (
    <div className='row'>
      <div className='col-sm-12'>
        <div className='row'>
          <div className='col text-center'>
            <h1>Hi {authContext.user.name}</h1>
          </div>
        </div>
        <div className='row mt-5'>
          <div className='col-sm-8 offset-2'>
            <div className='row border-bottom border-top pb-1 pt-1'>
              <div className='col d-flex justify-content-between align-items-center'>
                <h4 className='m-0 flex-grow-1 text-center'>Your Forms</h4>
                <Link to='/form' className='btn btn-primary btn-sm'>
                  New Form
                </Link>
              </div>
            </div>
            <div className='row mt-2'>
              <div className='col-sm-12'>
                <div className='row mb-1 pb-1 border-bottom'>
                  <div className='col'>
                    <b>Form</b>
                  </div>
                  <div className='col-3 text-center'>
                    <b>Actions</b>
                  </div>
                </div>
              </div>
              <div className='col-sm-12'>
                {
                  loading &&
                    <div className='row mt-1 pb-1 align-items-center border-bottom'>
                      <div className='col' colSpan={2}>
                      Fetching...
                      </div>
                    </div>
                }
                {
                  !loading &&
                forms.length > 0 &&
                forms.map(form => {
                  return (
                    <div className='row mt-1 pb-1 align-items-center border-bottom' key={form._id}>
                      <div className='col'>
                        {form.name}
                      </div>
                      <div className='col-auto text-right'>
                        <Link to={`/form/${form._id}/fill`} className='btn btn-primary btn-sm mr-2'>
                          Fill Form
                        </Link>
                        <Link to={`/form/${form._id}`} className='btn btn-primary btn-sm mr-2'>
                          Edit
                        </Link>
                        <button className='btn btn-danger btn-sm mr-2' onClick={() => onDelete(form._id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  )
                })
                }
                {
                  !loading &&
                  !forms.length &&
                    <div className='row mt-1 pb-1 align-items-center border-bottom'>
                      <div className='col' colSpan={2}>
                      No Forms Found.
                      </div>
                    </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
