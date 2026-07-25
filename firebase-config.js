const firebaseConfig = {
  apiKey: "AIzaSyDUACWXkvrQN7vjaZtduNIxysQzx4wch_Q",
  authDomain: "humanos-2fac0.firebaseapp.com",
  projectId: "humanos-2fac0",
  storageBucket: "humanos-2fac0.firebasestorage.app",
  messagingSenderId: "113139668319",
  appId: "1:113139668319:web:63f5aca5025f0b678352ea",
  measurementId: "G-9PTE6PRJS4"
};

window.auth = null;
window.db = null;
window.firebaseReady = false;
window.currentUser = null;

try{
  firebase.initializeApp(firebaseConfig);
  window.auth = firebase.auth();
  window.db = firebase.firestore();
  window.firebaseReady = true;
  console.log('Firebase initialized', firebaseConfig.projectId);
}catch(e){
  console.error('Firebase initialization failed', {code:e && e.code, message:e && e.message, error:e});
  window.firebaseReady = false;
}

const isFileProtocol = window.location.protocol==='file:';
if(isFileProtocol){
  console.error('This page is being opened directly from disk over the file:// protocol. Firebase Auth requires an http:// or https:// origin, so requests to Identity Toolkit will be blocked or rejected as an invalid origin. Serve this page through a local web server (for example, run "npx serve" or "python3 -m http.server" in this folder and open it via http://localhost) instead of double clicking it.');
}

const isHubPage = !!document.getElementById('authOverlay');

function redirectToHub(){
  window.location.href = 'index.html';
}

if(window.firebaseReady){
  window.auth.onAuthStateChanged(function(user){
    window.currentUser = user;
    if(!user && !isHubPage){
      redirectToHub();
      return;
    }
    window.dispatchEvent(new CustomEvent('firebaseAuthReady', {detail:{user:user, firebaseReady:true, isFileProtocol:isFileProtocol}}));
  });
} else if(!isHubPage){
  redirectToHub();
} else {
  window.dispatchEvent(new CustomEvent('firebaseAuthReady', {detail:{user:null, firebaseReady:false, isFileProtocol:isFileProtocol}}));
}

const signOutBtn = document.getElementById('signOutBtn');
if(signOutBtn){
  signOutBtn.onclick = function(){
    if(window.firebaseReady) window.auth.signOut();
  };
}
