var animationTimeout = null;
var wallpaperPosition = 0;
var trainPosition = 0;
var tracksPosition = 0;
var firstLoad = true;
var canvasImageToSave = null;
var myAudio = new Audio('thomas.mp3'); 

var subscriptions = [
	"man",
	"man 2",
	"man 3"
];

function initialize() {
	startKinect();
	thomasEasterEgg();
	initScreen1();
}

function goToScreen1() {
	console.log("goToScreen1");
	$(".wagons").empty()
	$(".screen1").fadeIn( 1000, function() {
		$(".screen3").css('display', 'none');
		initScreen1();
	});
}

function initScreen1() {
	console.log("initScreen1");
	$.ajax({
		type: "get",
		url: "https://project.cmi.hr.nl/2016_2017/medialab_ns_t3/api/getSubscriptions.php",
		dataType: "json",
		data: { 
			workshopId: 1
		}
	}).done(function(result) {
		subscriptions = result.subscriptions;
		console.log(subscriptions);
		doAnimations();
	});

	$(".poseBtn").on('click', function(event) {
		event.preventDefault();
		clearTimeout(animationTimeout);
		goToScreen2();
	});

	var fadeTextTimeout = setTimeout(function() {
		$(".successText").fadeOut( 1000, function() {
			$(".workshopText").fadeIn( 1000, function() {
				
			});
		});
	}, 5000);
	
	if(firstLoad) {
		firstLoad = false;
		$(".workshopText").css('display', 'block');
		clearTimeout(fadeTextTimeout);
	}
}

function goToScreen2() {
	console.log("goToScreen2");
	$(".countDown").text(5);
	$(".screen2").css('display', 'block');
	$(".screen1").fadeOut( 1000, function() {
		$(".screen1").css('display', 'none');
		initScreen2();
	});
}

function initScreen2() {
	console.log("initScreen2");
	// start drawing on canvas
	var counter = 5;
	var interval = setInterval(function() {
		counter--;
		$(".countDown").text(counter);
		if (counter == 0) {
			takeImage();
			clearInterval(interval);
		}
	}, 1000);
}

function goToScreen3() {
	console.log("goToScreen3");
	$("#emailInput").val("");
	$(".screen3").css('display', 'block');
	$(".screen2").fadeOut( 1000, function() {
		$(".screen2").css('display', 'none');
		initScreen3();
	});
}

function initScreen3() {
	console.log("initScreen3");
	$("#emailInput").focus();
	$("#emailInput").on('propertychange change click input paste', function(event) {
		if(isEmailValid($("#emailInput").val())) {
			$(".emailEnterText").css('opacity', 1);
		} else {
			$(".emailEnterText").css('opacity', 0);
		}
	});

	$("#emailInput").on('keyup', function(event) {
		event.preventDefault();
		if(event.which == 13 && isEmailValid($("#emailInput").val())) {
			console.log("valid enterPress");
			//send data and go to next screen
			
			$.ajax({
				type: "post",
				url: "https://project.cmi.hr.nl/2016_2017/medialab_ns_t3/api/saveCanvas.php",
				dataType: "json",
				data: { 
					imgBase64: canvasImageToSave,
					email: $("#emailInput").val()
				}
			}).done(function(result) {
				console.log(result);
				
			});

			$(".successText").css('display', 'block');
			$(".workshopText").css('display', 'none');
			goToScreen1();
		}
	});
}

function isEmailValid(email) {
	console.log("isEmailValid");
	var emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return emailRegex.test(email);
}

function takeImage() {
	console.log("takeImage");
	$(".screen2").fadeOut( 100, function() {
		// cancel drawing on canvas
		var canvas = $("#poseCanvas")[0];
		canvasImageToSave = canvas.toDataURL();

		$(".screen2").fadeIn( 100, function() {
			setTimeout(function() {
				goToScreen3();
			}, 1000);
		});
		

	});
}

function doAnimations() {
	console.log("doAnimations");
	moveWallpaper();
	moveTrain();
	moveTracks();
	animationTimeout = setTimeout(function() {
		doAnimations();
	}, 1000);
}

function moveWallpaper() {
	wallpaperPosition += 20;
	$(".wallpaper").css('background-position', wallpaperPosition + 'px center');
}

function moveTrain() {
	$(".wagon").each(function() {
		$(this).css('right', "+=320");
	});

	if(trainPosition > subscriptions.length - 1) {
		trainPosition = 0;
	}

	if($('.wagon').length > 40) {
		$('.wagon').first().remove();
	}

	if(subscriptions.length > 0) {
		$(".wagons").append('<div class="wagon animated"><img class="wagonPersonImg" src="https://project.cmi.hr.nl/2016_2017/medialab_ns_t3/canvas_uploads/' + subscriptions[trainPosition].skeletonImage + '"><img class="wagonCartImg" src="./img/kar-los.png"><div class="wagonCity">' + subscriptions[trainPosition].city + '</div></div>');
	}

	trainPosition++;
}

function moveTracks() {
	tracksPosition += 50;
	$(".tracks").css('background-position', tracksPosition + 'px center');
}

function startKinect() {
	var url = window.location.href;
	if(url.indexOf('project.cmi.hr.nl') === -1) {
		(function (Kinect, KinectUI) {var sensor = Kinect.sensor(Kinect.DEFAULT_SENSOR_NAME)
			console.log("startKinect");
			var uiAdapter = KinectUI.createAdapter(sensor)

			userViewerCanvasElement = document.getElementById("poseCanvas");
			uiAdapter.bindStreamToCanvas(Kinect.USERVIEWER_STREAM_NAME, userViewerCanvasElement);
		})(Kinect, KinectUI);
	}
}

function thomasEasterEgg() {
	var url = window.location.href;
	if(url.indexOf('?thomas') !== -1) {
		myAudio.addEventListener('ended', function() {
			this.currentTime = 0;
			this.play();
		}, false);
		myAudio.play();
		$("body").on('click', function(event) {
			if(myAudio.paused) {
				myAudio.play();
			}
			$("body").off('click');
		});
	}
}

$( document ).ready(function() {
	initialize();
	console.log("initialize");
});