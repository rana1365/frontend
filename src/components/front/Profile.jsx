import React from 'react'
import Layout from '../common/Layout'
import UserSidebar from '../common/UserSidebar'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const Profile = () => {

  const {
      register,
      handleSubmit,
      reset,
      setError,
      formState: { errors },
    } =useForm();
  
  const updateProfile = async (data) => {
    console.log(data);
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
                                errors.name && <P className='invalid-feedback'>{errors.name?.message}</P>
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
                                  errors.address && <P className='invalid-feedback'>{errors.address?.message}</P>
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
                                errors.city && <P className='invalid-feedback'>{errors.city?.message}</P>
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
                                errors.state && <P className='invalid-feedback'>{errors.state?.message}</P>
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
                                errors.zip && <P className='invalid-feedback'>{errors.zip?.message}</P>
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
                                errors.mobile && <P className='invalid-feedback'>{errors.mobile?.message}</P>
                              }
                            </div>
                          </div>
                          
                        </div>

                    </div>
                </div>

                <button className='btn btn-primary mt-4 mb-5'>Update</button>
              </form>

            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Profile