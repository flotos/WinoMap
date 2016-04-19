// d3Chart.js
export const createD3Chart = function(el, props, state) {
  var svg = d3.select(el).append("svg")
    .attr("id","plan")
    .attr("viewBox","0 0 1000 1000")
    .attr("preserveAspectRatio","xMidYMid meet")
    .append("g")
      .call(d3.behavior.zoom().scaleExtent([1, 3]).on("zoom", zoom))
    .append("g")
      .attr("id", "inside");

  $(function(){
    $("#inside").load("./res/planC.svg", function(){
      var circle = d3.select("#inside").append("circle")
              .attr("id", "marker")
                        .attr("cx", state.mainWino.get('x'))
                        .attr("cy", state.mainWino.get('y'))
                        .attr("r", 15);
    }); 
  });

  function zoom() {
    svg.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  };

  updateD3Chart(el, state);
};

export const updateD3Chart = function(el, state) {
  d3.select('#marker').attr('cx', state.mainWino.get('x'))
                      .attr('cy', state.mainWino.get('y'))
};
