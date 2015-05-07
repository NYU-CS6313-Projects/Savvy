function updateGameKeyMetrics(data)
{

	var playTime = document.getElementById("metric-playtime");
	var repeats = document.getElementById("metric-repeats");
	var steps = document.getElementById("metric-steps");
	var deaths = document.getElementById("metric-deaths");
	var anglesUnlocked = document.getElementById("metric-anglesunlocked");
	var badgesEarned = document.getElementById("metric-badgesearned");


	playTime.innerHTML = getAttribute('playTime', data).sum;
	repeats.innerHTML = getAttribute('playCount', data).sum;
	steps.innerHTML = getAttribute('steps', data).sum;
	deaths.innerHTML = getAttribute('deaths', data).sum;
	anglesUnlocked.innerHTML = getAttribute('anglesUnlocked', data).sum;
	badgesEarned.innerHTML = getAttribute('badgesEarned', data).sum;

}

function updateGameKeyCharts(data)
{
	
}