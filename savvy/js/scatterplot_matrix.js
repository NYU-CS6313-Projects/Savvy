  var colorIndexScatterplot = initColorScatterplot();
  var scatterplotColorIndexes = colorIndexScatterplot.data()[1].values;

   var axes = getScatterplotAxes();

  var matrix1 = c3.generate({
    bindto: '#scatterplot-PreGeoSum-PostGeoSum',
    data: {
      json: studentDemographics,
      // onselected: function (d) { updateSelection() },
      // onunselected: function (d) { updateSelection() },
      type: 'scatter',
      keys: {
          x: 'PreGeoSum', 
          value: ['PostGeoSum', 'ID']
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
          // rotated: true,
          x: {
            min: 0,
            show: false,
            padding: {
              left: 0,
              right: 0,
            }
          },
          y: {
            min: 0,
            show: false,
            padding: {
              left: 0,
              right: 0,
            }
          }
    },
    tooltip: {
      show: false
    },
    point: {
      show: true
    },
    legend: {
      hide: true,

    },
    point: {
      r: 1.2,
    }
  });

  //   var colorIndexScatterplot = initColorScatterplot();
  // var scatterplotColorIndexes = colorIndexScatterplot.data()[1].values;

  // var axes = getScatterplotAxes();

  var matrix2 = c3.generate({
    bindto: '#scatterplot-PreGeoSum-PrePostGeoGain',
    data: {
      json: studentDemographics,
      // onselected: function (d) { updateSelection() },
      // onunselected: function (d) { updateSelection() },
      type: 'scatter',
      keys: {
          x: 'PreGeoSum', 
          value: ['PrePostGeoGain', 'ID']
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
          // rotated: true,
          x: {
            min: 0,
            show: false,
            padding: {
              left: 0,
              right: 0,
            }
          },
          y: {
            min:0,
            show: false,
            padding: {
              left: 0,
              right: 0,
            }
          }
    },
    tooltip: {
      show: false
    },
    point: {
      show: true
    },
    legend: {
      hide: true,
    },
    point: {
      r: 1.2,
    },
  });


    var matrix3 = c3.generate({
    bindto: '#scatterplot-PreGeoSum-SIC_SUM',
    data: {
      json: studentDemographics,
      // onselected: function (d) { updateSelection() },
      // onunselected: function (d) { updateSelection() },
      type: 'scatter',
      keys: {
          x: 'PreGeoSum', 
          value: ['SIC_SUM', 'ID']
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
          // rotated: true,
          x: {
            min: 0,
            show: false,
            padding: {
              left: 0,
              right: 0,
            }
          },
          y: {
            min: 0,
            show: false,
            padding: {
              left: 0,
              right: 0,
            }
          }
    },
    tooltip: {
      show: false
    },
    point: {
      show: true
    },
    legend: {
      hide: true,
    },
    point: {
      r: 1.2,
    },
  });


  var matrix4 = c3.generate({
    bindto: '#scatterplot-PreGeoSum-IIGeo_SUM',
    data: {
      json: studentDemographics,
      // onselected: function (d) { updateSelection() },
      // onunselected: function (d) { updateSelection() },
      type: 'scatter',
      keys: {
          x: 'PreGeoSum', 
          value: ['IIGeo_SUM', 'ID']
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
          // rotated: true,
          x: {
            min: 0,
            show: false,
            padding: {
              left: 0,
              right: 0,
            }
          },
          y: {
            min: 0,
            show: false,
            padding: {
              left: 0,
              right: 0,
            }
          }
    },
    tooltip: {
      show: false
    },
    point: {
      show: true
    },
    legend: {
      hide: true,
    },
    point: {
      r: 1.2,
    },
  });


  var matrix5 = c3.generate({
    bindto: '#scatterplot-PreGeoSum-IIGC_SUM',
    data: {
      json: studentDemographics,
      // onselected: function (d) { updateSelection() },
      // onunselected: function (d) { updateSelection() },
      type: 'scatter',
      keys: {
          x: 'PreGeoSum', 
          value: ['IIGC_SUM', 'ID']
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
          // rotated: true,
          x: {
            min: 0,
            show: false,
            padding: {
              left: 0,
              right: 0,
            }
          },
          y: {
            min: 0,
            show: false,
            padding: {
              left: 0,
              right: 0,
            }
          }
    },
    tooltip: {
      show: false
    },
    point: {
      show: true
    },
    legend: {
      hide: true,
    },
    point: {
      r: 1.2,
    },
  });

   var matrix6 = c3.generate({
    bindto: '#scatterplot-PreGeoSum-BIS_SUM',
    data: {
      json: studentDemographics,
      // onselected: function (d) { updateSelection() },
      // onunselected: function (d) { updateSelection() },
      type: 'scatter',
      keys: {
          x: 'PreGeoSum', 
          value: ['BIS_SUM', 'ID']
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
          // rotated: true,
          x: {
            min: 0,
            show: false,
            padding: {
              left: 0,
              right: 0,
            },
            tick: {
              outer: false,
              culling: false
            },
          },
          y: {
            min: 0,
            show: false,
            padding: {
              left: 0,
              right: 0,
            },
            tick: {
              outer: false,
              culling: false
            }
          }
    },
    tooltip: {
      show: false
    },
    point: {
      show: true
    },
    legend: {
      hide: true,
    },
    point: {
      r: 1.2,
    },
  });