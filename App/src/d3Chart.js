import {List, Map} from 'immutable';

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
    let coord = d3.mouse(d3.select('#inside').node());
    //console.log(coord);
    state.onMapClick({type: 'MAP_CLICK', x: coord[0], y: coord[1]});
  }
   
  //placeholders
  function mouseUp() {
  }
  function mouseClick() {
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
                        .attr("r", 0);
      var indicatorTwo = d3.select("#inside").append("circle")
              .attr("id", "i2")
                        .attr("cx", 0)
                        .attr("cy", 0)
                        .attr("r", 0);
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

    if(state.event.get('type') == 'scale'){
      //If we are using the scale tool
      if(state.event.get('data').get('firstPoint') != ''){
        //If first point is already defined
        d3.select('#i1').attr('cx', state.event.get('data').get('firstPoint').get(0))
                        .attr('cy', state.event.get('data').get('firstPoint').get(1))
                        .attr('r', 4);
        if(state.event.get('data').get('secondPoint') != ''){
          //If second point is already defined
          d3.select('#i2').attr('cx', state.event.get('data').get('secondPoint').get(0))
                          .attr('cy', state.event.get('data').get('secondPoint').get(1))
                          .attr('r', 4);
        }
      }else{
        //If both are not defined, we clear them, reducing their radius to 0.
        d3.select('#i1').attr('r', 0);
        d3.select('#i2').attr('r', 0);
      }

    }else{
        //Reset every components related to events if we aren't in an event.
        d3.select('#i1').attr('r', 0);
        d3.select('#i2').attr('r', 0);
      }
  }
};
