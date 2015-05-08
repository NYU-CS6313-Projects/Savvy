function updateScatterplot()
{

  var axes = getScatterplotAxes();

  scatterplotChart = c3.generate({
    bindto: '.scatterplot-chart',
    data: {
      json: studentDemographics,
      // onselected: function (d) { updateSelection() },
      onunselected: function (d) { updateSelection() },
      type: 'scatter',
      keys: {
          x: axes.xKey, 
          value: [axes.yKey, 'ID']
      },
      selection: {
        enabled: true,
        draggable: true,
      },
      hide: ['ID'],
      // color: function (color, d) {
      //       // d will be 'id' when called for legends
      //       // console.log("new point - " + d.id + " value - " + d.value);
      //       console.log(d);
      //       console.log("--")
      //       gimmeMore(d);
      //       console.log(color);
      //       // return d3.rgb(color).darker(d.value / 150);
      //       var cc = d3.select(d3.selectAll("circle")[0][d.index]).style("fill", "rgba(31, 119, 180, 1)");

      //       return cc;
      // }
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
  });

  
  updateSelection();

  return scatterplotChart;

}


function updateSelection()
{
  console.log(" // updating selection");

  selectedStudents = getScatterplotSelection();

  // console.log(studentIDS);

  updateGameKeyMetrics(selectedStudents);
  updateGameKeyCharts(selectedStudents);
  updateGroupSummaryCharts();
}


function getScatterplotSelection()
{
  var ids = [];
  var studentIDS = [];

  if(scatterplotChart.data())
  {
    var scatterplotIndexes = scatterplotChart.data()[1].values;
    var selectedGroup = scatterplotChart.selected();

    for (student in selectedGroup) {
      var index = selectedGroup[student].index;
      
      for (scatterplotIndex in scatterplotIndexes)
      {
        if (index == scatterplotIndexes[scatterplotIndex].index) {
          ids.push(scatterplotIndexes[scatterplotIndex].value);
        }
      }

    }
  }

  studentIDS = getStudentsWithID(ids);
  return studentIDS;
}
