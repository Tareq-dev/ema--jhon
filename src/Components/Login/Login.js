import {useState} from 'react';
import * as firebase from 'firebase/app';
import "firebase/auth";
import  firebaseConfig from './firebase.config';
import { getAuth,signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import {useContext } from 'react';
import {UserContext} from '../../App';
import { navigate, useNavigate } from 'react-router';


firebase.initializeApp(firebaseConfig);

function Login() {
  const [newUser , setNewUser] = useState(false)
const [user, setUser] = useState({
  isSignIn: false,
  name:'',
  email:'',
  photo:''
})

const [loggedInUser, setLoggedInUser] = useContext(UserContext);

const navigate = useNavigate();



          // GOOGLE SIGNIN PROCCESS

const Gprovider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();


const handleSignIn =()=>{
const auth = getAuth();
signInWithPopup(auth, Gprovider)
.then(res => {
 const {displayName ,photoURL, email} = res.user;
 const signInUser = {
   isSignIn: true,
   name: displayName,
   email: email,
   photo: photoURL
 }
 setUser(signInUser);
 console.log(displayName ,photoURL, email);
  })
.catch((error) => {
  console.log(error);
  console.log(error.message);
});
}

  const handleSignOut =()=>{
  const auth = getAuth();
  signOut(auth).then(res => {
  const signOutUser ={
  isSignIn:false,
  name:'',
  password:'',
  photo:'',
  email:'',
  error:'',
  success: false,
  newUser: ''
}
setUser(signOutUser);
}).catch((error) => {
// An error happened.
});
console.log("clicked");
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

                                 // handleSubmit



    const handleSubmit =(event)=> {
     if(newUser && user.email && user.password){
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then(res => {
          const newUserInfo = {...user};
          newUserInfo.error = '';
          newUserInfo.success =true;
          setUser(newUserInfo);
          updateUserName(user.name);
        })
        .catch(error => {
          const newUserInfo = {...user};
          newUserInfo.error =  error.message;
          newUserInfo.success =false;
          setUser(newUserInfo);
          
        });
     }

                                      // For SignIn Proccess
        
     if(!newUser && user.email && user.password){
      const auth = getAuth();
      signInWithEmailAndPassword(auth, user.email, user.password)
       .then(res => {
    const newUserInfo = {...user};
    newUserInfo.error = '';
    newUserInfo.success =true;
    setUser(newUserInfo);
    setLoggedInUser(newUserInfo);
    navigate('/shipment',{
     replace: true,
});
    console.log('sign in user info', res.user);
      })
      .catch((error) => {
        const newUserInfo = {...user};
        newUserInfo.error =  error.message;
        newUserInfo.success =false;
        setUser(newUserInfo);
      });

     }
     event.preventDefault();
     }

                                      //  updateUserName

    const updateUserName = name =>{
      
    
  const auth = getAuth();
  updateProfile(auth.currentUser, {
  displayName: name 
          }).then(() => {
            console.log('user name successfully')
          }).catch((error) => {
            console.log(error)
          });
                  }
                                      // Facebook


    const handleFbSignIn =()=>{

    const auth = getAuth();
    signInWithPopup(auth, fbProvider)
    .then((result) => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        
      });
      
    }

  return (
    <div style={{textAlign:'center'}}>
      {
        user.isSignIn?  <button onClick={handleSignOut}>Sign Out</button> :
        <button onClick={handleSignIn}>Sign In</button>
      }
      <br/>
      <button onClick={handleFbSignIn}>Sign In By Facebook</button>
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
