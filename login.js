$(document).ready(function(event){
	var ref = new Firebase("https://philz4schoolz.firebaseio.com");
ref.authWithOAuthPopup("facebook", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
    uid = authData.uid
    console.log(uid)
    window.location.href="main.html"
  }
});
})
