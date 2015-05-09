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
  var scatterplotColorIndexes;

  if (colorIndexScatterplot.data()[1]) { scatterplotColorIndexes = colorIndexScatterplot.data()[1].values; } 

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
        min: 0,
        label: {
          text: axes.yName,
          position: 'inner-top'
        } 
      },
      x: {
        min: 0,
        label: {
          text: axes.xName,
          position: 'inner-right',
        }
      }
    },
    tooltip: {
            format: {
                title: function (d) { return d; },
                name: function (name, ratio, id, index) { return name },
                value: d3.format(',')
            },
            contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
                var $$ = this, config = $$.config,
                    titleFormat = config.tooltip_format_title || defaultTitleFormat,
                    nameFormat = config.tooltip_format_name || function (name) { return name; },
                    valueFormat = config.tooltip_format_value || defaultValueFormat,
                    text, i, title, value, name, bgcolor;
                for (i = 0; i < d.length; i++) {
                    if (! (d[i] && (d[i].value || d[i].value === 0))) { continue; }

                    name = nameFormat(d[i].name);
                    yValue = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
                    xValue = titleFormat ? titleFormat(d[i].x) : d[i].x;

                    text = "<table class='" + $$.CLASS.tooltip + "'>";

                    text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "' style='border-bottom: none !important; height: 25px !important; padding-bottom: 5px; '>";
                    text += "<td class='name' style='color: #767676;  font-size: 11px; border-bottom: none !important; padding-top: 8px !important; padding-left: 10px !important;'>" + axes.xName + "</td>";
                    text += "<td class='name' style='color: #767676;  font-size: 11px; border-bottom: none !important; padding-top: 8px !important; padding-left: 10px !important;'>" + axes.yName + "</td>";
                    text += "</tr>";

                    text += "<tr class='" + $$.CLASS.tooltipName + "-" + d[i].id + "' style='border-top: none !important; height: 25px !important;'>";
                    text += "<td class='value' style='text-align: left !important; font-size: 14px !important; padding-left: 10px !important; padding-top: 5px !important; padding-bottom: 8px !important'>" + xValue + "</td>";
                    text += "<td class='value' style='text-align: left !important; font-size: 14px !important; padding-left: 10px !important; padding-top: 5px !important; padding-bottom: 8px !important'>" + yValue + "</td>";
                    text += "</tr>";

                }
                return text + "</table>";
            },
            // position: function (data, width, height, element) {
            //   return {top: 500, left: 0}
            // }
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
    grid: {
      x: {
        show: true
      },
      y: {
        show: true
      }
    }
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
    // if (!scatterplotIndexes) { return [] };

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