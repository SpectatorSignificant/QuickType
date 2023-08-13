const graphDiv = document.querySelector(".graph")

console.log({userTimes});

userScores = JSON.parse(userScores);
userTimes = JSON.parse(userTimes);
userTimes = userTimes.map((element) => {
    // console.log(element)
    // const date = new Date(element)
    // console.log(date);
    console.log(element, typeof(element))
    element = new Date(element)
    // console.log(`${element.getFullYear}-${element.getMonth}-${element.getDate}`);
    // return new Date(`${element.getFullYear}-${element.getMonth}-${element.getDate}`);
    return element.toLocaleString()
})
console.log(userTimes)
const data = [{
  x: userTimes,
  y: userScores,
  type: 'scatter'
}];

const layout = {
  title: 'Your Typing History',
  xaxis: {
    title: 'Day',
    showgrid: false,
    zeroline: false
  },
  yaxis: {
    title: 'Speed (WPM)',
    showline: false
  },
  width: 900,
  height: 500
};
Plotly.newPlot(graphDiv, data, layout);