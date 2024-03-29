import React,{useState,useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import {useParams,useNavigate} from 'react-router-dom';
import { useSelector,useDispatch } from "react-redux";
import { DELETE,ADD} from '../redux/actions/action';
import { RMV } from '../redux/actions/action';

const CardsDetails = () => {


  const [data,setData] = useState([]);
  //console.log(data);

  const {id} = useParams();
  //console.log(id);

  const history = useNavigate();

  const getdata = useSelector((state) => state.cartReducer.carts);
  //console.log(getdata);

  const dispatch = useDispatch();
  const dlt = (id)=>{
    dispatch(DELETE(id));
    history("/")
  }

//to increment the item
  const send = (e)=>{
    //console.log(e);
    dispatch(ADD(e));
  }

  //to decrement the item
  const remove =(item)=>{
    dispatch(RMV(item))
  }

  const compare = ()=>{
    let comparedata = getdata.filter((e)=>{
      return e.id == id
    });
    setData(comparedata);
  }

useEffect(()=>{
  compare()
},[id])
  

  return (
    <div className="container mt-2">
        <h2 className="text-center">Items Details Page</h2>
        <section className="container mt-3">
          <div className="itemsdetails">
            {
              data.map((ele)=>{
                return (
                  <>
                  <div className="items_img">
              <img src={ele.imgdata}/>
            </div>
            <div className="details">
              <Table>
                <tr>
                  <td>
                    <p><strong>Restaurant : </strong>{ele.rname}</p>
                    <p><strong>Price : </strong>₹ {ele.price}</p>
                    <p><strong>Dishes : </strong>{ele.address}</p>
                    <p><strong>Total : </strong>₹ {ele.price * ele.qnty}</p>
                    <div className="mt-2 d-flex justify-content-between align-items-center" 
                    style={{width:100,cursor:"pointer",background:"#ddd",color:"#111"}}>
                      <span style={{fontSize:24}} onClick={ele.qnty <=1 ? ()=>dlt(ele.id):()=>remove(ele)}>-</span>
                      <span style={{fontSize:20}}>{ele.qnty}</span>
                      <span style={{fontSize:24}} onClick={()=>send(ele)}>+</span>
                    </div>
                  </td>
                  <td>
                    <p><strong>Rating : </strong><span style={{background:"green",color:"#fff",padding:"2px 5px",borderRadius:"5px"}}>{ele.rating}</span></p>
                    <p><strong>Order Review : </strong>{ele.somedata}<span></span></p>
                    <p><strong>Remove : </strong><span><i className="fas fa-trash" onClick={()=>dlt(ele.id)} style={{color:"red",fontSize:20,cursor:"pointer"}} ></i></span></p>
                  </td>
                </tr>
              </Table>
            </div>
                  </>
                )
              })
            }
            
          </div>
        </section>
    </div>
  )
}

export default CardsDetails