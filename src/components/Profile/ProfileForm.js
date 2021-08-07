import classes from './ProfileForm.module.css';
import { useRef, useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import swal from 'sweetalert';
const ProfileForm = () => {

  const newEmail=useRef();
  const authCtx=useContext(AuthContext)
  const submitHandler= event=>{
    event.preventDefault();
    const enterEmail= newEmail.current.value;
    console.log(enterEmail)
    //user validation
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyD8QDTrddis-y7KdoWZawqFlGr5Iz_M3q4',{
      method:'POST',
      body:JSON.stringify({
        requestType:"PASSWORD_RESET",
        email:enterEmail
      }),
      headers:{
        'Content-Type': 'application/json'
      }

    }).then(res=>{
      //asumption:always succed
      if(!res.ok){
        throw Error(res.statusText);
      }
      
      swal("Email Sent!", "Password Reset Verification link sent to your Email!", "success");
      return res.json();
      
    }).catch(err=>{
      console.log("Error")
      swal(" Invalid Email!", "Please enter a valid Email", "error");
    })
     
  }
  return (
    <>
    <section className={classes.profile}>
      <h1>Reset Password Page</h1>
      </section>
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-email'>Enter Email</label>
        <input type='email' id='new-email' ref={newEmail} required/>
      </div>
      <div className={classes.action}>
        <button>Submit</button>
      </div>
    </form>
    </>
  );
}

export default ProfileForm;
