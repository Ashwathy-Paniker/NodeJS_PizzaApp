
import React,{useState} from 'react'
import { login } from '../config/MyService'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
export default function Login() {
    const [state,setState]=useState({email:'',password:'',name:'',age:''});
    const handler=(event)=>{
        const {name,value}=event.target;
        setState({...state,[name]:value})
    }
    const History = useHistory();
    const postRegis=(event)=>{
        event.preventDefault();
        login(state)
        .then(res=>{
            console.log(res.data.msg)
            if(res.data.err==0){
               localStorage.setItem("_token",res.data.token);
               localStorage.setItem("userdetails",state.email);
               History.push("/Dash")
            }
            if(res.data.err==1){
                console.log(res.data)
            }
        })
    }
    return (
        <div style={{backgroundImage: "url('https://png.pngtree.com/thumb_back/fw800/back_our/20190620/ourmid/pngtree-pizza-food-graphic-literary-green-leaf-wood-grain-brown-background-image_160656.jpg')", height:"auto"}}>
            <br/><br/>
            <div className="container  bg-light col-5 cardL">
            <h1 className="text-center">Sign In</h1>
            <br/><br/>
            <form method="post" onSubmit={postRegis}>
            <div className="form-group">
                    <h5> NAME</h5>
                    <input type="text" name="name" className="form-control" onChange={handler}/>
                </div><br/><br/>
                <div className="form-group">
                    <h5> EMAIL</h5>
                    <input type="email" name="email" className="form-control" onChange={handler}/>
                </div><br/><br/>
                <div className="form-group">
                    <h5> PASSWORD</h5>
                    <input type="password" name="password" className="form-control" onChange={handler}/>
                </div><br/>
                <div className="text-center">
                <input type="submit" value="LOGIN" className="btn btn-dark text-center"/></div>
            </form><br/><br/>
            <p className="text-center">Click here to <Link to="/Reg">Register</Link></p>
            </div>
        </div>
        
    )
}

