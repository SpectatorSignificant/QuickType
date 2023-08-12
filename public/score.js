const canvas = document.querySelector("canvas");
const graphDiv = document.querySelector(".graph")

const ctx = canvas.getContext("2d");
console.log({userScores, userTimes});

userScores = JSON.parse(userScores);
userTimes = JSON.parse(userTimes);
userTimes = userTimes.map((element) => {
    // console.log(element)
    // const date = new Date(element)
    // console.log(date);
    return `${element.getDate}-${element.getMonth}-${element.getFullYear}`;
})
console.log(userTimes)
var data = [{
  x: userScores,
  y: userTimes,
  type: 'scatter'
}];

var layout = {
  title: 'Your Typing History',
  xaxis: {
    title: 'Day',
    showgrid: false,
    zeroline: false
  },
  yaxis: {
    title: 'Speed (WPM)',
    showline: false
  }
};
Plotly.newPlot(graphDiv, data, layout);