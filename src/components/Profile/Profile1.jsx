import classes from './ProfileForm.module.css';
import { useRef, useContext } from 'react';
import AuthContext from '../../store/AuthContext';
const ProfileForm = () => {

  const newPassword=useRef();
  const authCtx=useContext(AuthContext)
  const submitHandler= event=>{
    event.preventDefault();
    const enteredNewPassword= newPassword.current.value;
    console.log(enteredNewPassword)
    //user validation
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDFG9Et7fD8qJPxqrWth2acaONY8CxpIcM',{
      method:'POST',
      body:JSON.stringify({
        idToken:authCtx.token,
        password:enteredNewPassword,
        returnSecureToken:false
      }),
      headers:{
        'Content-Type': 'application/json'
      }

    }).then(res=>{
      //asumption:always succed
      alert("Password Change ")
    })
  }
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength='7' ref={newPassword} required/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
