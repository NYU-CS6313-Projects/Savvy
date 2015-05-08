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
          value: [axes.yKey], 
      },
      color: function (color, d) {
            // d will be 'id' when called for legends
            // console.log("new point - " + d.id + " value - " + d.value);
            console.log(d);
            console.log("--")
            gimmeMore(d);
            console.log(color);
            // return d3.rgb(color).darker(d.value / 150);
            var cc = d3.select(d3.selectAll("circle")[0][d.index]).style("fill", "rgba(31, 119, 180, 1)");

            return cc;
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
      show: true
    },
    legend: {
      hide: true,

    },
    point: {
      r: 3,
    },
     onclick: function(d,i){
            //console.log(d);
            alert(d)
    },
    
  });

  return scatterplotChart;

}

function gimmeMore(dataPoint)
{
  console.log(studentDemographics[dataPoint.index]);
}
