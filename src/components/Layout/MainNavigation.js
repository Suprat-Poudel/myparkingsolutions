import { Link } from 'react-router-dom';
import { useContext , useState} from 'react';
import AuthContext from '../../store/AuthContext';
import classes from './MainNavigation.module.css';

const MainNavigation = (props) => {
  const[dispname, setDispName]=useState('')
  const authCtx= useContext(AuthContext);
   const isLoggedIn= authCtx.isLoggedIn;
   const logoutHandler=()=>{
     authCtx.logout();
   }
   const requestOptions={
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({
      idToken: authCtx.token
    })
  }

  
  fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyD8QDTrddis-y7KdoWZawqFlGr5Iz_M3q4', requestOptions)
  .then(response => response.json())
  .then((data)=>{
    console.log(data)
    if(isLoggedIn){
    let name=data.users[0].displayName;
    setDispName(name);
    console.log(data.users[0].dispname);
    }
  })
  
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>My Parking App</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
          <li>
            <Link to='/auth'>Login/SignUp</Link>
          </li>)}
          {isLoggedIn && (
          <li className={classes.name}>
            Hi, {dispname}!
          </li>
          )}
          {isLoggedIn && (
          <li>
            <Link to='/user-details'>Profile</Link>
          </li>
          )}
          {isLoggedIn && (
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>)}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
