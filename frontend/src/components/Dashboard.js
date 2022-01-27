import React, { useEffect, useState } from 'react'
import { getPosts } from '../config/MyService'
import { connect } from "react-redux";
import jwt_decode from 'jwt-decode';
import { useSelector, useDispatch } from "react-redux";
import {MdOutlineAddShoppingCart} from "react-icons/md";


function Dashboard(props) {
  const [postdata, setPostdata] = useState([])
  const [uid,setUid]=useState('')
  const cart = useSelector((state) => state.cartItems);
  console.log(cart);
  const dispatch = useDispatch();
 
  useEffect(()=>{
      
    if(localStorage.getItem('_token')!=undefined){
        let token=localStorage.getItem('_token');
        let decode=jwt_decode(token);
        console.log(decode)
        setUid(decode.uid)
        getPosts()
        .then(res=>{
            console.log(res.data);
            if(res.data.err==0){
                setPostdata(res.data.data);
            }
        })
    }
 },[])
  console.log(postdata)
  return (
    <div className="container-fluid" style={{backgroundImage: "url('https://png.pngtree.com/thumb_back/fw800/back_our/20190620/ourmid/pngtree-pizza-food-graphic-literary-green-leaf-wood-grain-brown-background-image_160656.jpg')"}}>
    <div className="container" ><br/>
      {/* {postdata[0].name} */}
     <h2 className="text-white">Hey,{uid}!</h2>
      <div className=" row" >
        {postdata.map((val, index) =>
          <div className=" container col-md-4">
            <div className="card1" >
              <img src={val.image} className="card-img-top" alt="..." height="200px" />
              <div className="card-body">
                <h5 className="card-title">{val.name}</h5>
                <h6><p className="card-text">Rs.{val.price}</p></h6>
                <a className="btn btn-warning" style={{"border-radius": "12px"}} onClick={() =>
                  props.cart(
                    val._id,
                    val.image,
                    val.name,
                    val.price
                  )
                }><h6><MdOutlineAddShoppingCart/> &nbsp; Add to cart</h6></a>
              </div>
            </div>
          </div>)}

      </div>
      </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    mycounter: state.count,
  };
};

const mapDispatchTopProps = (dispatch) => {
  return {
    cart: function (_id, image, name, price) {
      dispatch({
        type: "CART",
        payload: {
          id: _id,
          image: image,
          name: name,
          price: price
        },
      });
    },
  };
};
export default connect(mapStateToProps, mapDispatchTopProps)(Dashboard);
