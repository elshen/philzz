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

		var newRunRef = runBase.push({location: runLocation, maxorders: maxOrders, owner: runOwner, time: runTime}, function(error){
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
			$('<li>', {id:snapshot.name(), }).html('<div class="r-location">' + newRun.location + '</div>' +
				'<div class="r-maxOrders">' + newRun.maxorders + '</div>' +
				'<div class="r-owner">' + newRun.owner + '</div>' +
				'<div class="r-time">' + newRun.time + '</div>' 
				).appendTo(runContainer);
			var newRunRef = runBase.child(snapshot.name());
			var id = newRunRef.name()
			newRunRef.update({id: id});
		});
	};
});