// d3Chart.js
export const createD3Chart = function(el, props, state) {
  //Initialise the svg element
  var svg = d3.select(el).append("svg")
    .attr("id","plan")
    .attr("viewBox","0 0 1000 1000")
    .attr("preserveAspectRatio","xMidYMid meet")
    .on("mousedown", mouseDown)
    .on("mouseup", mouseUp)
    .on("click", mouseClick)
    .append("g")
      .call(d3.behavior.zoom().scaleExtent([1, 3]).on("zoom", zoom))
    .append("g")
      .attr("id", "inside");


  //Click listenners
  function mouseDown() {
    console.log(d3.mouse(this));
  }
   
  function mouseUp() {
    console.log("mouseUp");
  }
   
  function mouseClick() {
    console.log("mouseClick");
  }

  //Draw the elements here
  $(function(){
    $("#inside").load("./res/planC.svg", function(){
      var circle = d3.select("#inside").append("circle")
              .attr("id", "marker")
                        .attr("cx", state.mainWino.get('x'))
                        .attr("cy", state.mainWino.get('y'))
                        .attr("r", 15);
      var indicatorOne = d3.select("#inside").append("circle")
              .attr("id", "i1")
                        .attr("cx", 0)
                        .attr("cy", 0)
                        .attr("r", 10);
      var indicatorTwo = d3.select("#inside").append("circle")
              .attr("id", "i2")
                        .attr("cx", 0)
                        .attr("cy", 0)
                        .attr("r", 10);
    }); 
  });

  //Allow pinch-to-zoom, scroll zoom, pan.
  function zoom() {
    svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  };

  updateD3Chart(el, state);
};

//Update the elements depending of the state.
export const updateD3Chart = function(el, state) {
  d3.select('#marker').attr('cx', state.mainWino.get('x'))
                      .attr('cy', state.mainWino.get('y'))
  if(state.event.size != 0){
    console.log('size');
    console.log(state.event);
    if(state.event.type == 'scale'){
      d3.select('#i1').attr('cx', state.event.data.firstPoint.get(0))
                      .attr('cy', state.event.data.firstPoint.get(1));

      d3.select('#i2').attr('cx', state.event.data.secondPoint.get(0))
                      .attr('cy', state.event.data.secondPoint.get(1));
    }
  }
};
