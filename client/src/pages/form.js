import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { createForm, getForm, updateForm } from '../api'

export function Form (props) {
  const params = useParams()
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const { handleSubmit, register, errors, control, setValue } = useForm()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'fields'
  })

  const onSubmit = (data) => {
    setLoading(true)
    let submit
    if (params._id) {
      submit = updateForm(form._id, data)
    } else {
      submit = createForm(data)
    }
    submit.then(() => {
      history.push('/')
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
              <span>{params._id ? 'Update' : 'Create'}</span> Form
            </h4>
          </div>
        </div>
        {
          (!params._id || form._id) &&
          !loading &&
            <div className='row'>
              <div className='col-sm-8 offset-2'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='card'>
                    <div className='card-body'>
                      <div className='form-group'>
                        <label className='control-label'>
                          Form Name:
                        </label>
                        <input className='form-control form-control-sm' name='name' ref={register({ required: true })} defaultValue={form.name} />
                        <small className='text-danger'>
                          {
                            errors && errors.name && 'Form name is required'
                          }
                        </small>
                      </div>
                      <div className='form-group'>
                        <label className='control-label d-flex'>
                          Fields: <button type='button' className='btn btn-sm ml-auto btn-primary' onClick={() => append({})}>Add Field</button>
                        </label>
                        <div className='row'>
                          <div className='col-sm-8 offset-2'>
                            {fields.map((field, index) => (
                              <div key={index} className='card mt-2'>
                                <div className='card-body'>
                                  <div className='form-group'>
                                    <select className='form-control form-control-sm' name={`fields[${index}].type`} ref={register({ required: true })} defaultValue={form.fields && form.fields[index] && form.fields[index].type}>
                                      <option value=''>Select Field Type</option>
                                      <option value='textbox'>Textbox</option>
                                      <option value='dropdown'>Dropdown</option>
                                    </select>
                                    <small className='text-danger'>
                                      {
                                        errors && errors.fields && errors.fields[index] && errors.fields[index].type && 'Field type is required'
                                      }
                                    </small>
                                  </div>
                                  <div className='form-group'>
                                    <textarea className='form-control form-control-sm' name={`fields[${index}].options`} placeholder='Values (comma seperated)' ref={register()} defaultValue={form.fields && form.fields[index] && form.fields[index].options} />
                                  </div>
                                  <div className='form-group'>
                                    <input className='form-control form-control-sm' name={`fields[${index}].label`} placeholder='Field Label' ref={register({ required: true })} defaultValue={form.fields && form.fields[index] && form.fields[index].label} />

                                    <small className='text-danger'>
                                      {
                                        errors && errors.fields && errors.fields[index] && errors.fields[index].label && 'Field label is required'
                                      }
                                    </small>
                                  </div>
                                  <div className='form-group'>
                                    <button type='button' className='btn btn-sm ml-auto btn-primary' onClick={() => remove({})}>Remove Field</button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
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
