import React, { useState, useEffect } from 'react';
import { auth } from "../../firebase";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";

const ForgotPassword = ({history}) => {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const {user} = useSelector((state) => ({ ...state }));

    useEffect(() => {
      if(user && user.token)  history.push("/");// eslint-disable-next-line 
    }, [user]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
            handleCodeInApp: true
        }
        await auth.sendPasswordResetEmail(email, config)
        .then(() =>{
            setEmail("");
            setLoading(false);
            toast.success("Check your email for password reset link");

        }).catch((error) =>{
            setLoading(false);
            toast.error(error.message);
    });
    }
    return (
        <div className="container col-md-6 offset-md-3 p-5"> 
            {loading ? (<h4 className="text-danger">Loading...</h4> ) : (
                <h4 className="text-center">Login</h4>
            )}

            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    className="form-control"
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}  
                    autoFocus
                    />
                    <button 
                        className="btn btn-raised mt-3"
                        disabled={!email}>Submit</button>
            </form>
        </div>
    )
}

export default ForgotPassword;