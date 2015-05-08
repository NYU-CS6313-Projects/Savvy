function updateGameKeyMetrics(data)
{

	var playTime = document.getElementById("metric-playtime");
	var repeats = document.getElementById("metric-repeats");
	var steps = document.getElementById("metric-steps");
	var deaths = document.getElementById("metric-deaths");
	var anglesUnlocked = document.getElementById("metric-anglesunlocked");
	var badgesEarned = document.getElementById("metric-badgesearned");

	var commaFormat = d3.format(',');


	playTime.innerHTML = commaFormat(getAttribute('playTime', data).sum);
	repeats.innerHTML = commaFormat(getAttribute('playCount', data).sum);
	steps.innerHTML = commaFormat(getAttribute('steps', data).sum);
	deaths.innerHTML = commaFormat(getAttribute('deaths', data).sum);
	anglesUnlocked.innerHTML = commaFormat(getAttribute('anglesUnlocked', data).sum);
	badgesEarned.innerHTML = commaFormat(getAttribute('badgesEarned', data).sum);

}

function updateGameKeyCharts(data)
{
	var metricKeys = ['playTime', 'playCount', 'steps', 'deaths', 'anglesUnlocked', 'badgesEarned'];

	for (metric in metricKeys)
	{
		// console.log("** updating : " + metricKeys[metric]);

		var metricData = getConditionSummary(metricKeys[metric], data);

		var chart = c3.generate({
	          bindto: '#chart-'+metricKeys[metric],
	          data: {
		        columns: metricData.sum,
			    type: 'bar',
			    labels: {
			    	format: d3.format(',')
			    },
			    colors: {
			    	'No badges': '#d95f02',
				    'Badges': '#1b9e77',
				  },
			  },
			  axis: {
			  	rotated: true,
				  x: {
				    show: false,
				  },
				  y: {
				    show: false
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