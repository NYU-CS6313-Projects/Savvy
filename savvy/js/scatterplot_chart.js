function updateScatterplot()
{

  var axes = getScatterplotAxes();

  var scatterplotChart = c3.generate({
    bindto: '.scatterplot-chart',
    data: {
      json: studentDemographics,
      type: 'scatter',
      keys: {
          x: axes.xKey,
          value: [axes.yKey]
      }
    },
    axis: {
      y: {
        label: {
          text: axes.yName,
          position: 'inner-top'
        } 
      },
      x: {
        label: {
          text: axes.xName,
          position: 'inner-right',
        }
      }
    },
    tooltip: {
      show: true
    },
    point: {
      show: false
    },
    legend: {
      hide: true,

    }
  });

  return scatterplotChart;

}


