$(document).ready(function(event){
	var uid = null;
	var base = null;
	var displayname = null;
	var userprofile = null;
		var ref = new Firebase("https://philz4schoolz.firebaseio.com");
// 		ref.authWithOAuthPopup("facebook", function(error, authData) {
//   if (error) {
//     console.log("Login Failed!", error);
//   } else {
//     console.log("Authenticated successfully with payload:", authData);
//     uid = authData.uid
//     displayname = authData.facebook.displayName
//     userprofile = authData.facebook.cachedUserProfile
//     console.log(userprofile)
//     console.log(displayname)
//     displayInfo(uid)
//   }
// });
function authDataCallback(authData) {
  if (authData) {
    console.log("User " + authData.uid + " is logged in with " + authData.provider);
      


//     		// var ref = new Firebase("https://philz4schoolz.firebaseio.com");
// 	// ref.unauth()
// console.log(accessToken)
// FB.logout({access_token: accessToken}, function(response){
// 	console.log("logged out")
// })
  } else {
    console.log("User is logged out");
  }
}
var ref = new Firebase("https://philz4schoolz.firebaseio.com");
ref.onAuth(authDataCallback);

});


function displayInfo(uid){
		uid = uid;
		base = new Firebase("https://philz4schoolz.firebaseio.com/users/" + uid)
		displayProfile();
		displayRuns();
	}
	
	// base.once('value' function(snap){
	// 	var 
	// });

	function displayProfile(){
		console.log(displayname)
		$("#display-name").html(displayname)
	}
	function displayRuns(){
		console.log(uid)
	
		runBase = base.child("runs");
		runBase.on('child_added', function(snapshot) {

			var newRun = snapshot.val();
			var runContainer = $('#run-container');
			var runListItem = $('<li>', {id:snapshot.key()}).html('<div class="r-location">location: ' + newRun.location + '</div>' +
				'<div class="r-maxOrders">Max Orders: ' + newRun.maxorders + '</div>' +
				'<div class="r-owner">Coffeerunner: ' + newRun.owner + '</div>' +
				'<div class="r-time">Time: ' + newRun.time + '</div>' +
				'<div class="r-ppl-container" ></div>'+
				'<input type="text" class="person-name" class="form-input" placeholder="your name">' +
				'<input type="text" class="drink-order" class="form-input" placeholder="your order">' +
				'<button type="button" onclick="yah($(this).parent())">Yah!</button>'
				).appendTo(runContainer);
			var newRunRef = runBase.child(snapshot.key());
			var id = newRunRef.key()
			newRunRef.update({id: id});

			newRunPplRef = newRunRef.child("ppl")
			newRunPplRef.on('child_added', function(snapshot) {
				newPerson = snapshot.val()
				console.log(newPerson.personorder)
				console.log(snapshot.key())
				console.log("yeee")
				pplListItem = runListItem.find('.r-ppl-container')
				pplListItem.append("<div class='r-person'> Person: " + newPerson.personname + "</div"+
					"<div class='r-order'>" + newPerson.personorder + "</div>")
			});
		});

		$("#create-run").click(function(event){
		console.log("clicked!")
		var runLocation = $("#run-location").val();
		var runOwner= $("#run-owner").val();
		var runTime = $("#run-time").val();
		var maxOrders = $("#max-orders").val();
		console.log(runLocation);
		console.log(runOwner)
		var runBase = base.child("runs");

		var newRunRef = runBase.push({location: runLocation, maxorders: maxOrders, owner: runOwner, time: runTime, ppl:""}, function(error){
			if (error !== null) {
            	alert('Unable to push to Firebase');
      		} 
      		else {
      			console.log("success");
      			$(".form-input").val("");
      		}
		});
	});
$("#logout").click(function(){
	console.log("meh")
      	 //    FB.getLoginStatus(function(response) {
        // if (response && response.status === 'connected') {
            FB.logout(function(response) {
            	console.log("yeh")
                document.location.reload();
            // });
        }
    );
})

	};
	var uid = null;
	var base = null;
	var displayname = null;
	var userprofile = null;
	var accessToken = null;
		var ref = new Firebase("https://philz4schoolz.firebaseio.com");
		ref.authWithOAuthPopup("facebook", function(error, authData) {
  			if (error) {
    			console.log("Login Failed!", error);
  			} else {
    			console.log("Authenticated successfully with payload:", authData);
    			uid = authData.uid
    			displayname = authData.facebook.displayName
    			userprofile = authData.facebook.cachedUserProfile
    			accessToken = authData.facebook.accessToken
    			displayInfo(uid)

FB.api('/me/friends', {
	access_token: accessToken
}, function(response){
	console.log(response)
});
//     FB.getLoginStatus(function(response) {
//   if (response.status === 'connected') {
//     FB.api('/me/friends', function(response){
//       if (response && response.data){
//         console.log(response)
//       } else {
//         console.log('Something goes wrong', response);
//       }
//     });
//   }
// });

// FB.api('/me/friends', function(response){
//       if (response && response.data){
//         console.log(response)
//       } else {
//         console.log('Something goes wrong', response);
//       }
//     });
    console.log(displayname)
//     $("#logout").click(function(){
//     		// var ref = new Firebase("https://philz4schoolz.firebaseio.com");
// 	// ref.unauth()
// console.log(accessToken)
// FB.logout({access_token: accessToken})
// })

  }
}, {scope:"user_friends"});

// function logout() {
//             FB.logout(function(response) {
//               console.log("success")
//             });
//         }

function yah(elem){
	console.log(elem)
	//var firebaseID = $(elem).find('.firebase-id').text();
	var firebaseID = $(elem).attr('id');
	//console.log(ofirebaseID)
	console.log(firebaseID);
	var newOrder = $(elem).find('.drink-order').val();
	var newPerson = $(elem).find('.person-name ').val();
	var base = new Firebase("https://philz4schoolz.firebaseio.com/users/" + uid + "/runs/" + firebaseID + "/ppl")
	console.log(base)
	base.push({personname:newPerson, personorder: newOrder}, function(error){
		if(error !== null){
			alert('Unable to push to Firebase')
		}
		else{
			console.log("successsss")
			$(".form-input").val("");
		}
	})
}
