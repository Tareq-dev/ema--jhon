import {useState} from 'react';
import {useContext } from 'react';
import {UserContext} from '../../App';
import {  useHistory ,useLocation } from 'react-router';
import {  creatEmail, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramwork, signInEmail } from '../LoginManager/LoginManager';



function Login() {
  const [newUser , setNewUser] = useState(false)
  const [user, setUser] = useState({
  isSignIn: false,
  name:'',
  email:'',
  photo:''
})
initializeLoginFramwork();
const [loggedInUser, setLoggedInUser] = useContext(UserContext);

const history = useHistory();
const location = useLocation();
let { from } = location.state || { from: { pathname: "/" } };


const googleSignIn =()=>{
  handleGoogleSignIn()
  .then(res => {
    setUser(res);
    setLoggedInUser(res);
    history.replace(from);
  })
}

const fbSignIn =()=>{
  handleFbSignIn()
  .then(res=>{
    setUser(res);
    setLoggedInUser(res);
    history.replace(from);
  })
}

const signOut =()=>{
 handleSignOut()
.then(res => {
      setUser(res);
    setLoggedInUser(res);
  })
}
        const handleBlur =(event) => {
        let isFormValid = true;
        if(event.target.name === "email"){
        isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
       }

       if (event.target.name === "password"){
       const isPasswordValid = event.target.value.length > 6;
        const passwordHasNumber = /\d{1}/.test(event.target.value);
        isFormValid = isPasswordValid && passwordHasNumber;
       }
       if(isFormValid){
         const newUserInfo ={...user};
         newUserInfo[event.target.name] = event.target.value;
         setUser(newUserInfo);
       }
     }

      
    const handleSubmit =(e)=> {
     if(newUser && user.email && user.password){
       creatEmail(user.name, user.email, user.password)
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      });
      }
     
     e.preventDefault();
    }
  
    if(!newUser && user.email && user.password){
      signInEmail(user.email, user.password)
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
        })
     }
    
     
  
     
     
  return (
    <div style={{textAlign:'center'}}>
      {
        user.isSignIn?  <button onClick={signOut}>Sign Out</button> :
        <button onClick={googleSignIn}>Sign In</button>
      }
      <br/>
      <button onClick={fbSignIn}>Sign In By Facebook</button>
      {
        user.isSignIn &&
        <div>
        <p>Welcome, {user.name}</p>
        <p>Your Email Address:  {user.email}</p>
        <img src={user.photo} alt="" />
        </div>
      }
      <h1>Our Own Authentication</h1>
      <input type="checkbox" onChange={()=> setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
      {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="Write your Name" required />}
      <br/>
      <input type="text" name="email" onBlur={handleBlur} placeholder="Write your email" required />
      <br/>
      <input type="password" name="password" onBlur={handleBlur} placeholder="Enter your password" required />
      <br/>
      <input type="submit" value={newUser ? 'Sign Up': 'Sign In'} />
      </form>
      <p style={{color:'red'}}>{user.error}</p>
    
     {
       user.success &&  <p style={{color:'green'}}>User  {newUser ? 'Created' : 'Logged In' } successfully</p>
     }
    </div>
  );
    }

export default Login;
