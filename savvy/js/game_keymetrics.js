function updateGameKeyMetrics(data)
{

	var playTime = document.getElementById("metric-playtime");
	var repeats = document.getElementById("metric-repeats");
	var steps = document.getElementById("metric-steps");
	var deaths = document.getElementById("metric-deaths");
	var anglesUnlocked = document.getElementById("metric-anglesunlocked");
	var badgesEarned = document.getElementById("metric-badgesearned");

	var commaFormat = d3.format(',');


	playTime.innerHTML = commaFormat(getAttribute('playTime', data)[statisticalValue]);
	repeats.innerHTML = commaFormat(getAttribute('playCount', data)[statisticalValue]);
	steps.innerHTML = commaFormat(getAttribute('steps', data)[statisticalValue]);
	deaths.innerHTML = commaFormat(getAttribute('deaths', data)[statisticalValue]);
	anglesUnlocked.innerHTML = commaFormat(getAttribute('anglesUnlocked', data)[statisticalValue]);
	badgesEarned.innerHTML = commaFormat(getAttribute('badgesEarned', data)[statisticalValue]);

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
			    	'No badges': noBadgeColor,
				    'Badges': badgeColor,
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