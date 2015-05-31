$(document).ready(function(event){
	console.log("yo")
	var base = new Firebase("https://philz4schoolz.firebaseio.com/")
	displayRuns()
	// base.once('value' function(snap){
	// 	var 
	// });
	$("#create-run").click(function(event){
		console.log("clicked!")
		event.preventDefault();
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
	function displayRuns(){
		runBase = base.child("runs");
		runBase.on('child_added', function(snapshot) {

			var newRun = snapshot.val();
			var runContainer = $('#run-container');
			var runListItem = $('<li>', {id:snapshot.key()}).html('<div class="r-location">location: ' + newRun.location + '</div>' +
				'<div class="r-maxOrders">max orders: ' + newRun.maxorders + '</div>' +
				'<div class="r-owner">Coffeerunner: ' + newRun.owner + '</div>' +
				'<div class="r-time">Time: ' + newRun.time + '</div>' +
				'<div class="r-ppl-container"></div>'+
				'<input type="text" class="person-name" class="form-input" placeholder="your name">' +
				'<input type="text" class="drink-order" class="form-input" placeholder="your order">' +
				'<h2>I want in on this run!</h2><button type="button" onclick="yah($(this).parent())">Yah!</button>'
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
				pplListItem.append("<div class='r-person'> " + newPerson.personname + "</div")
			});
		});

	};
});

function yah(elem){
	console.log(elem)
	//var firebaseID = $(elem).find('.firebase-id').text();
	var firebaseID = $(elem).attr('id');
	//console.log(ofirebaseID)
	console.log(firebaseID);
	var newOrder = $(elem).find('.drink-order').val();
	var newPerson = $(elem).find('.person-name ').val();
	var base = new Firebase("https://philz4schoolz.firebaseio.com/runs/" + firebaseID + "/ppl")
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
