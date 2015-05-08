function updateStudentSelectionChart()
{
    var group = scatterplotChart.selected();

    // Clear all
    for (i = 1; i < 53; i++)
    {
        var box = document.getElementById('s'+i);
        box.className = 'student-box';
    }

    // Apply color to selected group
    for (i = 1; i < group.length + 1; i++)
    {
        var box = document.getElementById('s'+i);
        box.className += ' student-selected';
    }

    var selectedLabel = document.getElementById('studentselection-selected');
    selectedLabel.innerHTML = "Selected: " + group.length;
}


