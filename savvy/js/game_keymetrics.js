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
	var metricKeys = ['playTime', 'playCount', 'steps', 'deaths', 'anglesUnlocked', 'badgesEarned'];

	for (metric in metricKeys)
	{

		var data = getConditionSummary(metricKeys[metric], data);

		var chart = c3.generate({
	          bindto: '#chart-'+metricKeys[metric],
	          data: {
		        columns: data.values,
			    type: 'bar',
			    labels: true,
			    colors: {
			    	'No badges': '#d95f02',
				    'Badges': '#1b9e77',
				  },
			  },
			  axis: {
			  	rotated: true,
				  x: {
				    show: false
				  },
				  y: {
				    show: false,
				  }
			  },
	          bar: {
	            width: {
				    ratio: 0.7
				}
	          },
	          legend: {
	            hide: true,
	          },
	          tooltip: {
	          	show: false
	          }
	    });
	}
}