const alarmTimeInput = document.getElementById("alarmTime");
const setAlarmButton = document.getElementById("setAlarm");
const stopAlarmButton = document.getElementById("stopAlarm");

let alarmTimeout;
let audioInstance;

setAlarmButton.addEventListener("click", () =>{
	const timeParts = alarmTimeInput.value.split(":");
	const alarmTime = new Date();
	alarmTime.setHours(parseInt(timeParts[0], 10));
	alarmTime.setMinutes(parseInt(timeParts[1], 10));
	alarmTime.setSeconds(0);

	const currentTime = new Date();

	if (alarmTime > currentTime) {
		if (alarmTimeout) {
			clearTimeout(alarmTimeout);
		}

		const timeDifference = alarmTime - currentTime;
		alarmTimeout = setTimeout(() => {
			playAlarm();
		}, timeDifference);

		setAlarmButton.disabled = true;
		stopAlarmButton.disabled = false;

	}else {
		alert("Nmms elige bien ni q viajaramos en el tiempo");
	}
});


stopAlarmButton.addEventListener("click", () => {
	stopAlarm();
});

function playAlarm() {
	audioInstance = new Audio("alarm.mp3");
	audioInstance.loop = true;
	audioInstance.play();
	stopAlarmButton.disabled = false;
}

function stopAlarm() {
	clearTimeout(alarmTimeout);
	stopAlarmButton.disabled = true;
	setAlarmButton.disabled = false;

	if (audioInstance) {
		audioInstance.pause();
		audioInstance.currentTime = 0;
	}
}