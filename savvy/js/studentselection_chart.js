

var studentData1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
var studentData2 = [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26];
var studentData3 = [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39];
var studentData4 = [40, 41, 42, 43, 44, 45, 45, 47, 48, 49, 50, 51, 52];

var height = 200,
    width = 300,
    boxSize = 10,
    boxOffset = 8;

d3.select('.studentselection-chart').append('svg')
    .attr('width', width)
    .attr('height', height)
    .style('background', 'white')
    //drawing line 1 of students
    .selectAll('rect').data(studentData1)
    .enter().append('rect')
        //here the style should be defined as color if there
        //is available data, or light grey if it is null
        .style('fill', '#31a354')
        .attr('width', boxSize)
        .attr('height', boxSize)
        .attr('x', function(d,i) {
            return i * (boxSize + boxOffset);
        })
        .attr('y', 10)

//insert text 1
d3.select('svg').append('text')
    .text('Selected:' + 'XX')
    .attr('x', 0)
    .attr('y', 190)
    .attr('fill', 'black')

//insert text 2
d3.select('svg').append('text')
    .text('Total: 52')
    .attr('x', 400)
    .attr('y', 190)
    .attr('fill', 'black')


