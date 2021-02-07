import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { downloadForm, getForm } from '../api'

export function Fill (props) {
  const params = useParams()
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(false)

  const { handleSubmit, register, errors, control, setValue } = useForm()
  const { fields } = useFieldArray({
    control,
    name: 'fields'
  })

  const onSubmit = (data) => {
    setLoading(true)
    downloadForm(params._id, data.fields).then(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    if (params._id) {
      setLoading(true)
      getForm(params._id).then(data => {
        setValue('fields', data.form.fields)
        setForm(data.form)
        setLoading(false)
      })
    }
  }, [])

  return (

    <div className='row mt-2'>
      <div className='col-sm-12'>
        <div className='row border-bottom border-top pb-1 pt-1'>
          <div className='col d-flex justify-content-between align-items-center'>
            <h4 className='m-0 flex-grow-1 text-center'>
              Fill Form
            </h4>
          </div>
        </div>
        {
          params._id &&
          form &&
        !loading &&
          <div className='row'>
            <div className='col-sm-8 offset-2'>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='card'>
                  <div className='card-header text-center'>
                    <h6>{form.name}</h6>
                  </div>
                  <div className='card-body'>
                    {
                      fields.map((_value, index) => {
                        const field = form.fields[index]
                        if (field) {
                          return (
                            <div key={index} className='form-group'>
                              <label className='control-label'>
                                {field.label}
                              </label>
                              <input type='hidden' name={`fields[${index}]._id`} ref={register({ required: true })} defaultValue={form.fields && form.fields[index] && form.fields[index]._id} />
                              {
                                field.type === 'textbox' &&
                                  <input className='form-control form-control-sm' name={`fields[${index}].value`} ref={register({ required: true })} />
                              }
                              {
                                field.type === 'dropdown' &&
                                  <select className='form-control form-control-sm' name={`fields[${index}].value`} ref={register({ required: true })}>
                                    <option value=''>Select</option>
                                    {
                                      field.options.split(',').map((option, index) =>
                                        <option key={index} value={option}>{option}</option>
                                      )
                                    }
                                  </select>
                              }
                              <small className='text-danger'>
                                {
                                  errors && errors.fields && errors.fields[index] && errors.fields[index].value && `${field.label} is required`
                                }
                              </small>
                            </div>
                          )
                        }
                      })
                    }
                  </div>

                  <div className='card-footer text-right'>
                    <button className='btn btn-primary btn-sm' type='submit'> Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        }
        {
          loading &&
            <div className='row'>
              <div className='col-sm-12'>
              Fetching...
              </div>
            </div>
        }
      </div>
    </div>
  )
}
