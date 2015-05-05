var studentData = [];

d3.csv('/output2.csv', function(data) {
    for (object in data) {
        studentData.push(data[object])
    }
    console.log(data)
    var totalTime = 0

    for (object in studentData) {
        console.log(object.playTime)
    }
    console.log(totalTime)
    });



    

var studentData1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var studentData2 = [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
var studentData3 = [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39];
var studentData4 = [40, 41, 42, 43, 44, 45, 45, 47, 48, 49, 50, 51, 52];

var svgHeight = 250,
    svgWidth = 1000;

d3.select('#chart').append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)
    .style('background', 'white')

//insert Title
d3.select('svg').append('text')
    .text('GAME: KEY METRICS')
    .attr('x', 20)
    .attr('y', 40)
    .attr('fill', 'black') .attr('font-size', '30px')

//insert text 1
d3.select('svg').append('text')
    .text('Total Time')
    .attr('x', 20)
    .attr('y', 120)
    .attr('fill', 'black')

//insert totalTime
d3.select('svg').append('text')
    .text('1000')
    .attr('x', 20) .attr('y', 200)
    .attr('fill', 'black') .attr('font-size', '50px') .attr('font-weight', 'bold')

//draw line separator 1
d3.select('svg').append('line')
    .attr('x1', 180) .attr('y1', 100)
    .attr('x2', 180) .attr('y2', 210)
    .attr('stroke-width', 2) .attr('stroke', 'black');

//insert text 2
d3.select('svg').append('text')
    .text('Deaths')
    .attr('x', 220) .attr('y', 120)
    .attr('fill', 'black')

//insert deaths
d3.select('svg').append('text')
    .text('50')
    .attr('x', 220) .attr('y', 200)
    .attr('fill', 'black') .attr('font-size', '50px') .attr('font-weight', 'bold')

//draw line separator 2
d3.select('svg').append('line')
    .attr('x1', 360) .attr('y1', 100)
    .attr('x2', 360) .attr('y2', 210)
    .attr('stroke-width', 2) .attr('stroke', 'black');

//insert text 3
d3.select('svg').append('text')
    .text('Angles Unlocked')
    .attr('x', 420) .attr('y', 120)
    .attr('fill', 'black')

//insert Angles Unlocked
d3.select('svg').append('text')
    .text('25')
    .attr('x', 420) .attr('y', 200)
    .attr('fill', 'black') .attr('font-size', '50px') .attr('font-weight', 'bold')


//draw line separator 3
d3.select('svg').append('line')
    .attr('x1', 600) .attr('y1', 100)
    .attr('x2', 600) .attr('y2', 210)
    .attr('stroke-width', 2) .attr('stroke', 'black');

//insert text 4
d3.select('svg').append('text')
    .text('Badges Earned')
    .attr('x', 620) .attr('y', 120)
    .attr('fill', 'black')

//insert Badges Earned
d3.select('svg').append('text')
    .text('14')
    .attr('x', 620) .attr('y', 200)
    .attr('fill', 'black') .attr('font-size', '50px') .attr('font-weight', 'bold')

//draw line separator 4
d3.select('svg').append('line')
    .attr('x1', 790) .attr('y1', 100)
    .attr('x2', 790) .attr('y2', 210)
    .attr('stroke-width', 2) .attr('stroke', 'black');

//insert text 5
d3.select('svg').append('text')
    .text('Badge Opt-in/out')
    .attr('x', 820) .attr('y', 120)
    .attr('fill', 'black')

//insert bar1
rect1Height = 50
rectWidth = 30
d3.select('svg').append('rect')
    .attr('width', rectWidth) .attr('height',rect1Height)
    .attr('x', 860) .attr('y', 210-rect1Height)
    .attr('fill', 'green')

//insert barText1
d3.select('svg').append('text')
    .text(rect1Height)
    .attr('text-anchor', 'middle')
    .attr('x', 860+(rectWidth/2)) .attr('y', 205)
    .attr('fill', 'white')

//insert bar2
rect2Height= 25
d3.select('svg').append('rect')
    .attr('width', rectWidth) .attr('height',rect2Height)
    .attr('x', 900) .attr('y', 210-rect2Height)
    .attr('fill', 'red')

//insert barText2
d3.select('svg').append('text')
    .text(rect2Height)
    .attr('text-anchor', 'middle')
    .attr('x', 900+(rectWidth/2)) .attr('y', 205)
    .attr('fill', 'white')
