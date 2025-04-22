import React, { useState } from 'react'
import Layout from '../../common/Layout'
import Sidebar from '../../common/Sidebar'
import { useForm } from 'react-hook-form';
import { adminToken, apiUrl } from '../../common/Http';
import { toast } from 'react-toastify';

const Shipping = () => {

    const [disable, setDisable] = useState(false);

    const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    } = useForm({
        defaultValues: async () => {
            try {
                const response = await fetch(`${apiUrl}/get-shipping`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${adminToken()}`
                }

            });
            
            const result = await response.json();
        
            if (result.status === 200) {
            toast.success(result.message);
            reset({
                shipping_charge: result.data.shipping_charge
            })

            } else {
            console.error("Failed to save category:", result);
            toast.error(result.message || "Failed to save category");
            }
            } catch (error) {
                console.error("Error saving category:", error);
                toast.error("An error occurred while saving");
            } finally {
                setDisable(false);
            }
        }
    });
        
    const saveShipping = async (data) => {
        setDisable(true);
        try {
            const response = await fetch(`${apiUrl}/save-shipping`, {
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
            } else {
            console.error("Failed to save category:", result);
            toast.error(result.message || "Failed to save category");
            }
        } catch (error) {
            console.error("Error saving category:", error);
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
              <h4 className='h4 pb-0 mb 0'>Shipping Charge</h4>
            </div>
            <div className='col-md-3'>
                  <Sidebar/>
            </div>
            <div className='col-md-9'>
                <form onSubmit={handleSubmit(saveShipping)}>
                    <div className='card shadow'>
                        <div className="card-body p-4">
                            <div className='mb-3'>
                                <label htmlFor='' className='form-label'>
                                    Shipping Charge
                                </label>
                                <input {
                                    ...register('shipping_charge', {
                                        required : 'The shipping charge field is required'
                                    })
                                } 
                                type="text" className={`form-control ${errors.shipping_charge && 'is-invalid'}`} 
                                placeholder='Shipping Charge' />
                                {
                                    errors.shipping_charge && <p className='invalid-feedback'>{errors.shipping_charge?.message}</p>
                                }

                            </div>

                        </div>
                    </div>
                    <button disabled={disable}
                    type="submit" className='btn btn-primary mt-3'>Save</button>
                </form>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Shipping