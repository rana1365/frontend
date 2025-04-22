import React, { useEffect, useState } from 'react'
import UserSidebar from '../common/UserSidebar'
import Layout from '../common/Layout'
import Loader from '../common/Loader'
import { useParams } from 'react-router-dom'
import { apiUrl, userToken } from '../common/Http'
import { toast } from 'react-toastify'

const MyOrderDetails = () => {

    const [order, setOrder] = useState([]);
    const [items, setItems] = useState([]);
    const[loader, setLoader] = useState(false);
    const params = useParams();

    const fetchOrder = async () => {
        setLoader(true);
        const res = await fetch(`${apiUrl}/get-order-details/${params.id}`, {
            method : 'GET',
            headers : {
                'Content-type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${userToken()}`
            }
        })
        .then( res => res.json())
        .then( result => {
            setLoader(false);
            if (result.status == 200) {
                setOrder(result.data);
                setItems(result.data.items);
            } else {
                toast.error(result.message);
            }
        })
        .catch(err => {
            console.error("Fetch error:", err);
            toast.error("Something went wrong");
        });
    }

    useEffect( () => {
        fetchOrder();
    },[]);

  return (
    <Layout>
      <div className='container'>
          <div className='row'>
            <div className='d-flex justify-content-between mt-5 pb-3'>
              <h4 className='h4 pb-0 mb 0'>My Order Details</h4>
              {/* <Link to="" className="btn btn-primary">Button</Link> */}
            </div>
            <div className='col-md-3'>
                  <UserSidebar/>
            </div>
            <div className='col-md-9'>
                <div className='card shadow mb-5'>
                    <div className="card-body p-4">
                        {
                            loader == true && <Loader/>
                        }
                        {
                            loader == false &&
                        <div>
                            <div className='row'>
                                <div className='col-md-4'>
                                    <h3>Order: #{order.id}</h3>
                                        {
                                            order.status == 'pending' && <span className='badge bg-warning'>Pending</span>
                                        }

                                        {
                                            order.status == 'shipped' && <span className='badge bg-warning'>Shipped</span>
                                        }

                                        {
                                            order.status == 'delivered' && <span className='badge bg-success'>Delivered</span>
                                        }

                                        {
                                            order.status == 'cancelled' && <span className='badge bg-danger'>Cancelled</span>
                                        }
                                </div>
                                <div className='col-md-4'>
                                    <div className='text-secondary'>Date</div>
                                    <h4 className='pt-2'>{order.created_at}</h4>
                                </div>
                                <div className='col-md-4'>
                                <div className='text-secondary'>Payment Status</div>
                                    {
                                        order.payment_status == 'paid' ?
                                        <span className='badge bg-success'>Paid</span> :
                                        <span className='badge bg-danger'>Unpaid</span>

                                    }
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-md-4'>
                                    <div className='py-4'>
                                        <strong>{order.name}</strong>
                                        <div>{order.email}</div>
                                        <div>{order.mobile}</div>
                                        <div>{order.address}, {order.city} {order.state} {order.zip}</div>
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <div className='text-secondary pt-4'>Payment Method</div>
                                    <p>COD</p>
                                </div>
                                <div className='col-md-4'></div>
                            </div>

                            <div className="row pt-3">
                                <h3 className="pb-2 "><strong>Items</strong></h3>
                                {
                                    items.map((item) => {
                                        return (
                                            <div key={`${item.id}`} className="row justify-content-end">
                                                <div className="col-lg-12">
                                                    <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
                                                        <div className="d-flex">
                                                            {
                                                                item.product.image && <img 
                                                                width="70" className="me-3" 
                                                                src={`${item.product.image_url}`} alt="" />
                                                            }
                                                            <div className="d-flex flex-column">
                                                                <div className="mb-2"><span>{item.name}</span></div>
                                                                <div><button className="btn btn-size">{item.size}</button></div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex">
                                                            <div>X {item.qty}</div>
                                                            <div className="ps-3">${item.price}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className="row justify-content-end">
                                    <div className="col-lg-12">
                                        <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                            <div>Subtotal</div>
                                            <div>${order.subtotal}</div>
                                        </div>
                                        <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                            <div>Shipping</div>
                                            <div>${order.shipping}</div>
                                        </div>
                                        <div className="d-flex  justify-content-between border-bottom pb-2 mb-2">
                                            <div><strong>Grand Total</strong></div>
                                            <div>${order.grand_total}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        }

                    </div>

                </div>
            </div>

          </div>

        </div>
    </Layout>
  )
}

export default MyOrderDetails