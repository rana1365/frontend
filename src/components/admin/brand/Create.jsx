import React, { useState } from 'react'
import Layout from '../../common/Layout'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../../common/Sidebar'
import { useForm } from 'react-hook-form'
import { adminToken, apiUrl } from '../../common/Http'
import { toast } from 'react-toastify'

const Create = () => {

  const [disable, setDisable] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        } = useForm();
    
    const saveBrand = async (data) => {
        setDisable(true);
        
        try {
            const response = await fetch(`${apiUrl}/brands`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${adminToken()}`
            },
            body: JSON.stringify(data)
            });
        
            const result = await response.json();
        
            if (result.status === 200) {
            toast.success(result.message);
            navigate('/admin/brands');
            } else {
            console.error("Failed to save brand:", result);
            toast.error(result.message || "Failed to save brand");
            }
        } catch (error) {
            console.error("Error saving brand:", error);
            toast.error("An error occurred while saving");
        } finally {
            setDisable(false);
        }
    };

  return (
    <Layout>
      <div className='container'>
          <div className='row'>
            <div className='d-flex justify-content-between mt-5 pb-3'>
              <h4 className='h4 pb-0 mb 0'>Brand / Create</h4>
              <Link to="/admin/brands" className="btn btn-primary">Back</Link>
            </div>
            <div className='col-md-3'>
                  <Sidebar/>
            </div>
            <div className='col-md-9'>
            <form onSubmit={handleSubmit(saveBrand)}>
                    <div className='card shadow'>
                        <div className="card-body p-4">
                            <div className='mb-3'>
                                <label htmlFor='' className='form-label'>
                                    Name
                                </label>
                                <input {
                                    ...register('name', {
                                        required : 'The name field is required'
                                    })
                                } 
                                type="text" className={`form-control ${errors.name && 'is-invalid'}`} 
                                placeholder='Name' />
                                {
                                    errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>
                                }

                            </div>

                            <div className='mb-3'>
                                <label htmlFor='' className='form-label'>
                                    Status
                                </label>
                                <select
                                    {
                                       ...register('status', {
                                        required : 'Please select a status'
                                        })
                                    }
                                    className={`form-control ${errors.status && 'is-invalid'}`} 
                                    >
                                    
                                    <option value="">Selet a Status</option>
                                    <option value="1">Active</option>
                                    <option value="0">Block</option>
                                </select>
                                {
                                    errors.status && <p className='invalid-feedback'>{errors.status?.message}</p>
                                }
                            </div>

                        </div>
                    </div>
                    <button disabled={disable}
                    type="submit" className='btn btn-primary mt-3'>Create</button>
                </form>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Create