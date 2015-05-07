// var chart = c3.generate({
//     bindto: '.chapter1-chart',
//     data: {
//         url: 'data/ch1Data.csv',
        
//         keys: {
//             value: ['Level', 'playTime']
//         }
//     },
//     bar: {
//         width: {
//             ratio: 0.5 // this makes bar width 50% of length between ticks
//         }
//         // or
//         //width: 100 // this makes bar width 100px
//     },
// });
var _dataPath = 'data/ch1Data.csv';

var myChart = d3.csv( _dataPath, function ( d ) {

  var data = d;

  // if ( configdata.axis.x.source_units == "meses" && configdata.axis.x.units == "años" )
  // {
  //   data[ configdata.axis.x.property_key ] = data[ configdata.axis.x.property_key ] / 12;
  // }
//   data = csv.filter(function(key) { 
//     // return key != "Chapter" && key != "L" && key != "M" && key != "S" ;
//     return key != "Chapter" ;
// });

  return data;

}, function( error, data ) {

  if (!error)
  {

    // var percentiles = [];
    // configdata.percentilesData.forEach( function( p ) {
    //   percentiles.push( p.name );
    // });

    // var x_axis_label = configdata.axis.x.label + ' (' + configdata.axis.x.units + ')';
    // var y_axis_label = configdata.axis.y.label + ' (' + configdata.axis.y.units + ')';

    var chart = c3.generate({
      bindto: '.chapter2-chart',
      data: {
        json: data,
        type: 'bar',
        keys: {
            x: 'Level',
            value: ['playTime']
        }
      },
      axis: {
        y: {
          label: 'Playtime'
        },
        x: {
          label: 'Chapter 1'
        }
      },
      tooltip: {
        show: true
      },
      point: {
        show: false
      },
    });

  }
});