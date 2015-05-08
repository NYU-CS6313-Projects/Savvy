function initColorScatterplot()
{
  console.log("generating base scatterplot");

  var axes = getScatterplotAxes();

  var colorIndexScatterplot = c3.generate({
    bindto: '.ss',
    data: {
      json: studentDemographics,
      type: 'scatter',
      keys: {
          x: axes.xKey, 
          value: [axes.yKey, 'ID']
      },
      hide: ['ID'],
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
    }
  }});

  return colorIndexScatterplot;
}

function getConditionForStudent(id)
{
  for (student in studentDemographics)
  {
    if (id == studentDemographics[student].ID)
    {
      return studentDemographics[student].Condition;
    }
  }
}


function updateScatterplot()
{
  var colorIndexScatterplot = initColorScatterplot();
  var scatterplotColorIndexes = colorIndexScatterplot.data()[1].values;

  var axes = getScatterplotAxes();

  scatterplotChart = c3.generate({
    bindto: '.scatterplot-chart',
    data: {
      json: studentDemographics,
      // onselected: function (d) { updateSelection() },
      // onunselected: function (d) { updateSelection() },
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
      color: function (color, d) {
            
          
          var pointIndex = d.index;
          var studentID;

          // ** Get student ID
          for (colorIndex in scatterplotColorIndexes)
          {
            if (pointIndex == scatterplotColorIndexes[colorIndex].index) {
              studentID = scatterplotColorIndexes[colorIndex].value;
            }
          }

          // ** Get condition for studentID
          var condition = getConditionForStudent(studentID);

          // console.log(pointIndex + " - " + studentID + " - " + condition);

          if (condition == "Aligned Badges")
          {
            return badgeColor;
          }
          else
          {
            return noBadgeColor;
          }

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
  });

  
  updateSelection();

  return scatterplotChart;

}


function updateSelection()
{
  selectedStudents = getScatterplotSelection();
  updateStudentSelectionChart();
  updateGameKeyMetrics(selectedStudents);
  updateGameKeyCharts(selectedStudents);
  updateGroupSummaryCharts();
}


function getScatterplotSelection()
{
  var scatterplotSelectionIDS = [];
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
          scatterplotSelectionIDS.push(scatterplotIndexes[scatterplotIndex].value);
        }
      }

    }
  }

  studentIDS = getStudentsWithID(scatterplotSelectionIDS);
  return studentIDS;
}


function updateConditionSelection() {

  var badgesChecked = document.getElementById("badgesChecked").checked;
  var noBadgesChecked = document.getElementById("noBadgesChecked").checked;

  alert ("badges: " + badgesChecked + " - no badges: " + noBadgesChecked);


}