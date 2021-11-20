import firebase from 'firebase/compat/app';
import "firebase/auth";
import  firebaseConfig from '../Login/firebase.config';
import { getAuth,signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , updateProfile } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";


export const initializeLoginFramwork =()=>{
     firebase.initializeApp(firebaseConfig);
}


export const handleGoogleSignIn =()=>{
     const auth = getAuth();
     const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider)
     .then(res => {
      const {displayName ,photoURL, email} = res.user;
      const signInUser = {
        isSignIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      }
      return signInUser;
       })
     .catch((error) => {
       console.log(error);
       console.log(error.message);
     })
}

export const handleFbSignIn =()=>{
const fbProvider = new FacebookAuthProvider();
const auth = getAuth();
return signInWithPopup(auth, fbProvider)
.then((result) => {
     const user = result.user;
     user.success = true;
     return user;
     
     })
     .catch((error) => {
     
     });
}

export const handleSignOut =()=>{
     const auth = getAuth();
     return signOut(auth).then(res => {
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
   return signOutUser;
   }).catch((error) => {
   // An error happened.
   });
   }



   export const creatEmail =(name , email , password)=>{
     const auth = getAuth();
     return createUserWithEmailAndPassword(auth, email, password)
       .then(res => {
         const newUserInfo = res.user;
         newUserInfo.error = '';
         newUserInfo.success =true;
         updateUserName(name);
         return newUserInfo;
       })
       .catch(error => {
         const newUserInfo = {};
         newUserInfo.error =  error.message;
         newUserInfo.success =false;
         return newUserInfo; 
       });
   }

   export const signInEmail =(email, password) => {
     const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password)
      .then(res => {
   const newUserInfo = res.user;
   newUserInfo.error = '';
   newUserInfo.success =true;
   return newUserInfo;
     })
     .catch((error) => {
       const newUserInfo = {};
       newUserInfo.error =  error.message;
       newUserInfo.success =false;
      return newUserInfo;
     });
   }

   export const updateUserName = name =>{
     const auth = getAuth();
     updateProfile(auth.currentUser, {
     displayName: name 
             }).then(() => {
               console.log('user name successfully')
             }).catch((error) => {
               console.log(error)
             });
      }