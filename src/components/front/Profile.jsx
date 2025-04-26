import React, { useState } from 'react'
import Layout from '../common/Layout'
import UserSidebar from '../common/UserSidebar'
import Loader from '../common/Loader'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { apiUrl, userToken } from '../common/Http'
import { toast } from 'react-toastify'

const Profile = () => {

  const [loader, setLoader] = useState(true);

  const {
      register,
      handleSubmit,
      reset,
      setError,
      formState: { errors }
    } = useForm({
      defaultValues: async () => {
        await fetch(`${apiUrl}/get-profile-details`, {
          method: 'GET',
          headers: {
            'Content-type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization' : `Bearer ${userToken()}`
          }
        })
        .then(res => res.json())
        .then(result => {
          setLoader(false);
          reset({
            name: result.data.name,
            email: result.data.email,
            address: result.data.address,
            city: result.data.city,
            state: result.data.state,
            zip: result.data.zip,
            mobile: result.data.mobile
          })
        });
      }

    });
  
  const updateProfile = async (data) => {
    await fetch(`${apiUrl}/update-profile`, {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json',
        'Accept' : 'application/json',
        'Authorization' : `Bearer ${userToken()}`
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
      if (result.status === 200) {
        toast.success(result.message);
        } else {
              const formErrors = result.errors;
              Object.keys(formErrors).forEach((field) => {
              setError(field, { message: formErrors[field][0] });
            })
          }
    });
  }
  
  return (
    <Layout>
      <div className='container'>
          <div className='row'>
            <div className='d-flex justify-content-between mt-5 pb-3'>
              <h4 className='h4 pb-0 mb 0'>My Account</h4>
              {/* <Link to="" className="btn btn-primary">Button</Link> */}
            </div>
            <div className='col-md-3'>
                  <UserSidebar/>
            </div>
            <div className='col-md-9'>
              {
                loader == true && <Loader/>
              }
              {
                loader == false && 
              
              <form onSubmit={handleSubmit(updateProfile)}>
                <div className='card shadow'>
                  <div className="card-body p-4">
                    <div className='row'>

                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label' htmlFor=''>Name</label>
                          <input
                          {
                            ...register('name', {required: "The name field is required."})
                          }
                          id='name' type='text' 
                          className={`form-control ${errors.name && 'is-invalid'}`} placeholder='Name' />
                          {
                            errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>
                          }
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <div className='mb-3'>
                            <label className='form-label' htmlFor=''>Email</label>
                            <input 
                            {
                              ...register("email", {
                                  required: "The Email Field is required.",
                                  pattern: {
                                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                      message: "Invalid email address"
                                  } 
                          
                              })
                            }
                            id='email' type='email' 
                            className={`form-control ${errors.email && 'is-invalid'}`} placeholder='Email' />
                            {
                              errors.email && <p className='invalid-feedback'>{errors.email?.message}</p>
                            }
                        </div>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='mb-3'>
                          <label className='form-label' htmlFor=''>Address</label>
                          <textarea
                          {
                            ...register('address', {required: "The name field is required."})
                          }
                          id='address' 
                          className={`form-control ${errors.address && 'is-invalid'}`} placeholder='Address'></textarea>
                          {
                              errors.address && <p className='invalid-feedback'>{errors.address?.message}</p>
                          }
                      </div>
                    </div>

                    <div className='row'>

                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label' htmlFor=''>City</label>
                          <input
                          {
                            ...register('city', {required: "The city field is required."})
                          } 
                          id='city' type='text' 
                          className={`form-control ${errors.city && 'is-invalid'}`} placeholder='City' />
                          {
                            errors.city && <p className='invalid-feedback'>{errors.city?.message}</p>
                        }
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <div className='mb-3'>
                            <label className='form-label' htmlFor=''>State</label>
                            <input
                            {
                              ...register('state', {required: "The state field is required."})
                            }
                            id='state' type='text' 
                            className={`form-control ${errors.state && 'is-invalid'}`} placeholder='State' />
                          {
                            errors.state && <p className='invalid-feedback'>{errors.state?.message}</p>
                          }
                        </div>
                      </div>

                    </div>

                    <div className='row'>

                      <div className='col-md-6'>
                        <div className='mb-3'>
                          <label className='form-label' htmlFor=''>Zip</label>
                          <input 
                          {
                            ...register('zip', {required: "The zip field is required."})
                          }
                          id='zip' type='text' 
                          className={`form-control ${errors.zip && 'is-invalid'}`} placeholder='Zip' />
                          {
                            errors.zip && <p className='invalid-feedback'>{errors.zip?.message}</p>
                          }
                        </div>
                      </div>

                      <div className='col-md-6'>
                        <div className='mb-3'>
                            <label className='form-label' htmlFor=''>Phone</label>
                            <input 
                            {
                              ...register('mobile', {required: "The phone field is required."})
                            }
                            id='mobile' type='text' 
                            className={`form-control ${errors.mobile && 'is-invalid'}`} placeholder='Phone' />
                          {
                            errors.mobile && <p className='invalid-feedback'>{errors.mobile?.message}</p>
                          }
                        </div>
                      </div>
                      
                    </div>

                  </div>
                </div>

                <button className='btn btn-primary mt-4 mb-5'>Update</button>

              </form>
              }
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Profile