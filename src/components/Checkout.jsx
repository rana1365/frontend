import React, { useContext, useState } from 'react'
import Layout from './common/Layout'
import { Link, useNavigate } from 'react-router-dom'
import ProductImg from '../assets/images/mens/nine.jpg'
import { CartContext } from './context/Cart'
import { useForm } from 'react-hook-form'
import { apiUrl, userToken } from './common/Http'
import { toast } from 'react-toastify'

const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const { cartData, grandTotal, subTotal, shipping } = useContext(CartContext);

    const handlePaymentMethod = (e) => {
        setPaymentMethod (e.target.value)
    }
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const processOrder = (data) => {
        if (paymentMethod == 'cod') {
            saveOrder(data, 'unpaid');
        }
    }

    const saveOrder = (formData, paymentStatus) => {
        const newFormData = {...formData, 
            grand_total: grandTotal(),
            subtotal: subTotal(), 
            shipping: shipping(), 
            discount: 0,
            payment_status: paymentStatus, 
            status: 'pending',
            cart: cartData
        }
        fetch(`${apiUrl}/save-order`, {
            method : 'POST',
            headers : {
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${userToken()}`
            },
            body : JSON.stringify(newFormData)
        })
        .then( res => res.json())
        .then( result => {
            if (result.status == 200) {
                localStorage.removeItem('cart');
                navigate(`/order/confirmation/${result.id}`);
            } else {
                toast.error(result.message);
            }
        })
    };
    

  return (
    <Layout>
        
        <div className='container pb-5'>
            <div className='row'>
                <div className='col-md-12'>
                    <nav aria-label="breadcrumb" className='py-4'>
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Checkout</li>
                        </ol>
                    </nav>

                </div>

            </div>
            <form onSubmit={handleSubmit(processOrder)}>
                <div className='row'>
                        <div className='col-md-7'>
                            <h3 className='border-bottom pb-3'><strong>Billing Details</strong></h3>
                            
                                <div className='row pt-3'>
                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                            <input 
                                            {
                                                ...register('name', {
                                                    required : "The name field is required."
                                                })
                                            }
                                            type='text' placeholder='Name' 
                                            className={`form-control ${errors.name && 'is-invalid'}`} />
                                            {
                                                errors.name && <p className='invalid-feedback'>{errors.name?.message}</p>
                                            }
                                        </div>
                                    </div>

                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                            <input
                                            {
                                                ...register('email', {
                                                    required : "The email field is required.",
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                        message: "Invalid email address"
                                                    }
                                                })
                                            }
                                            type='email' placeholder='Email' 
                                            className={`form-control ${errors.email && 'is-invalid'}`} />
                                            {
                                                errors.email && <p className='invalid-feedback'>{errors.email?.message}</p>
                                            }
                                        </div>
                                    </div>

                                    <div className='mb-3'>
                                        <textarea 
                                        {
                                            ...register('address', {
                                                required : "The address field is required."
                                            })
                                        }
                                        className={`form-control ${errors.address && 'is-invalid'}`} 
                                        placeholder='Address' rows={3}></textarea>
                                        {
                                            errors.address && <p className='invalid-feedback'>{errors.address?.message}</p>
                                        }
                                        
                                    </div>

                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                            <input 
                                            {
                                                ...register('city', {
                                                    required : "The city field is required."
                                                })
                                            }
                                            type='text' placeholder='City' 
                                            className={`form-control ${errors.city && 'is-invalid'}`} />
                                            {
                                                errors.city && <p className='invalid-feedback'>{errors.city?.message}</p>
                                            }
                                        </div>
                                    </div>

                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                            <input 
                                            {
                                                ...register('state', {
                                                    required : "The state field is required."
                                                })
                                            }
                                            type='text' placeholder='State' 
                                            className={`form-control ${errors.state && 'is-invalid'}`} />
                                            {
                                                errors.state && <p className='invalid-feedback'>{errors.state?.message}</p>
                                            }
                                        </div>
                                    </div>

                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                            <input 
                                            {
                                                ...register('zip', {
                                                    required : "The zip field is required."
                                                })
                                            }
                                            type='text' placeholder='Zip' 
                                            className={`form-control ${errors.zip && 'is-invalid'}`} />
                                            {
                                                errors.zip && <p className='invalid-feedback'>{errors.zip?.message}</p>
                                            }
                                        </div>
                                    </div>

                                    <div className='col-md-6'>
                                        <div className='mb-3'>
                                            <input 
                                            {
                                                ...register('mobile', {
                                                    required : "The mobile field is required."
                                                })
                                            }
                                            type='text' placeholder='Phone' 
                                            className={`form-control ${errors.mobile && 'is-invalid'}`} />
                                            {
                                                errors.mobile && <p className='invalid-feedback'>{errors.mobile?.message}</p>
                                            }
                                        </div>
                                    </div>

                                </div>
                            
                        </div>

                        <div className='col-md-5'>
                            <h3 className='border-bottom pb-3'><strong>Item</strong></h3>

                            <table className='table'>
                                <tbody>
                                    {
                                        cartData && cartData.map(item => {
                                            return (
                                                <tr key={`${item.id}`}>
                                                    <td width={100}>
                                                        <img src={item.image_url} width={80} alt='' />
                                                    </td>
                                                    <td width={600}>
                                                        <h4>{item.title}</h4>
                                                        <div className='d-flex align-items-center pt-3'>
                                                            <span>${item.price}</span>
                                                            <div className='ps-3'>
                                                                {
                                                                    item.size && <button className='btn btn-size'>{item.size}</button>
                                                                }
                                                            </div>

                                                            <div className='ps-5'>
                                                                X {item.qty}
                                                            </div>

                                                        </div>
                                                    </td>
                                                    
                                                </tr>
                                            )
                                        })
                                    }
                                    

                                </tbody>
                            </table>

                            <div className='row'>
                            <div className='col-md-12'>
                                <div className='d-flex justify-content-between border-bottom pb-2'>
                                    <div>Subtotal</div>
                                    <div>${subTotal()}</div>
                                </div>

                                <div className='d-flex justify-content-between border-bottom py-2'>
                                    <div>Shipping</div>
                                    <div>${shipping()}</div>
                                </div>

                                <div className='d-flex justify-content-between border-bottom py-2'>
                                    <div><strong>Grand Total</strong></div>
                                    <div>${grandTotal()}</div>
                                </div>

                            </div>
                        </div>

                        <h3 className='border-bottom pt-4 pb-3'><strong>Payment Method</strong></h3>
                        <div className='pt-2'>
                            <input type='radio' onClick={handlePaymentMethod} defaultChecked={paymentMethod == 'stripe'} value={'stripe'} />
                            <label htmlFor="" className='form-label ps-2'>Stripe</label>

                            <input type='radio' onClick={handlePaymentMethod} defaultChecked={paymentMethod == 'cod'} value={'cod'} className='ms-3' />
                            <label htmlFor="" className='form-label ps-2'>COD</label>

                        </div>
                        <div className='d-flex py-3'>
                            <button className='btn btn-primary'>Pay Now</button>
                        </div>

                        </div>
                </div>
        
            </form>
        </div>
    </Layout>
  )
}

export default Checkout