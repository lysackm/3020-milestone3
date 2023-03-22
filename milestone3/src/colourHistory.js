var selectedColors = [];

var colorBoxes = document.querySelectorAll('.color-box');

colorBoxes.forEach(function(colorBox) {
  colorBox.addEventListener('click', function() {
    var color = this.style.backgroundColor;
    selectedColors.push(color);
    updateSelectedColors();
  });
});

function updateSelectedColors() {
  var selectedColorsList = document.getElementById('selected-colors-list');
  selectedColorsList.innerHTML = '';
  selectedColors.forEach(function(color) {
    var li = document.createElement('li');
    li.style.backgroundColor = color;
    selectedColorsList.appendChild(li);
  });
}