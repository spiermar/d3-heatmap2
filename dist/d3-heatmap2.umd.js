(function(global, factory) {
  typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require("d3-selection"), require("d3-format"), require("d3-scale"), require("d3-array"), require("d3-axis")) : typeof define === "function" && define.amd ? define(["exports", "d3-selection", "d3-format", "d3-scale", "d3-array", "d3-axis"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.heatmap = {}, global.d3, global.d3, global.d3, global.d3, global.d3));
})(this, (function(exports2, d3Selection, d3Format, d3Scale, d3Array, d3Axis) {
  "use strict";
  var __vite_style__ = document.createElement("style");
  __vite_style__.textContent = ".columnLabel, .rowLabel {\n    font-size: 1.0rem;\n    fill: #AAAAAA;\n    font-weight: 300;\n}\n\n.title {\n    font-size: 2.8rem;\n    fill: #4F4F4F;\n    font-weight: 300;\n}\n\n.subtitle {\n    font-size: 1.4rem;\n    fill: #AAAAAA;\n    font-weight: 300;\n}\n\n.axis path, .axis tick, .axis line {\n      fill: none;\n      stroke: none;\n  }\n\ntext {\n      font-size: 1.2rem;\n      fill: #AAAAAA;\n      font-weight: 400;\n}\n\n.legendTitle {\n      font-size: 1.3rem;\n      fill: #4F4F4F;\n      font-weight: 400;\n}/*$vite$:1*/";
  document.head.appendChild(__vite_style__);
  function cantorPair(x, y) {
    var z = (x + y) * (x + y + 1) / 2 + y;
    return z;
  }
  function heatmap() {
    var svg = null;
    var legendElement = null;
    var columns = 0;
    var rows = 0;
    var title = "";
    var subtitle = "";
    var legendLabel = "";
    var width = 960;
    var height = 500;
    var legendWidth = null;
    var legendHeight = 75;
    var margin = {
      top: 20,
      right: 0,
      bottom: 0,
      left: 0
    };
    var legendMargin = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    };
    var gridSize = null;
    var colorScale = null;
    var xAxisScale = null;
    var yAxisScale = null;
    var xAxisTickFormat = d3Format.format(".0f");
    var yAxisTickFormat = d3Format.format(".2s");
    var xAxisScaleTicks = 20;
    var yAxisScaleTicks = 20;
    var xAxisLabels = null;
    var yAxisLabels = null;
    var xAxisLabelFormat = function(d) {
      return d;
    };
    var yAxisLabelFormat = function(d) {
      return d;
    };
    var legendScaleTicks = 5;
    var legendTickFormat = d3Format.format(".0f");
    var clickHandler = null;
    var mouseOverHandler = null;
    var mouseOutHandler = null;
    var highlight = [];
    var highlightColor = "#936EB5";
    var highlightOpacity = "0.4";
    var invertHighlightRows = false;
    var gridStrokeOpacity = 0.6;
    var nullValueColor = "#CCCCCC";
    function click(d, i, j) {
      if (typeof clickHandler === "function") {
        clickHandler(d, i, j);
      }
    }
    function mouseOver(d, i, j) {
      if (typeof mouseOverHandler === "function") {
        mouseOverHandler(d, i, j);
      }
    }
    function mouseOut(d, i, j) {
      if (typeof mouseOutHandler === "function") {
        mouseOutHandler(d, i, j);
      }
    }
    function getHighlightFrames() {
      var highlightFrames = [];
      for (var k in highlight) {
        if (highlight[k].start[0] <= highlight[k].end[0]) {
          for (var i = highlight[k].start[0]; i <= highlight[k].end[0]; i++) {
            var j = null;
            if (i > highlight[k].start[0] && i < highlight[k].end[0]) {
              for (j = 0; j < rows; j++) {
                highlightFrames.push([i, j]);
              }
            } else if (i === highlight[k].start[0]) {
              if (!invertHighlightRows) {
                if (i === highlight[k].end[0]) {
                  if (highlight[k].start[1] <= highlight[k].end[1]) {
                    for (j = highlight[k].start[1]; j <= highlight[k].end[1]; j++) {
                      highlightFrames.push([i, j]);
                    }
                  } else {
                    console.log("Error: Start row is higher than end row. No reverse range highlight.");
                  }
                } else {
                  for (j = highlight[k].start[1]; j < rows; j++) {
                    highlightFrames.push([i, j]);
                  }
                }
              } else {
                if (i === highlight[k].end[0]) {
                  if (highlight[k].start[1] >= highlight[k].end[1]) {
                    for (j = highlight[k].start[1]; j >= highlight[k].end[1]; j--) {
                      highlightFrames.push([i, j]);
                    }
                  } else {
                    console.log("Error: Start row is higher than end row. No reverse range highlight.");
                  }
                } else {
                  for (j = highlight[k].start[1]; j >= 0; j--) {
                    highlightFrames.push([i, j]);
                  }
                }
              }
            } else {
              if (!invertHighlightRows) {
                for (j = highlight[k].end[1]; j >= 0; j--) {
                  highlightFrames.push([i, j]);
                }
              } else {
                for (j = highlight[k].end[1]; j < rows; j++) {
                  highlightFrames.push([i, j]);
                }
              }
            }
          }
        } else {
          console.log("Error: Start column is higher than end column. No reverse range highlight.");
        }
      }
      return highlightFrames;
    }
    function updateHighlight() {
      if (svg && rows && gridSize) {
        var highlightFrames = getHighlightFrames();
        var frames = svg.selectAll("g.highlight").data(highlightFrames, function(d) {
          return cantorPair(d[0], d[1]);
        });
        frames.exit().remove();
        frames.enter().append("g").attr("class", "highlight").append("rect").attr("x", function(d) {
          return d[0] * gridSize + 3;
        }).attr("y", function(d) {
          return d[1] * gridSize;
        }).attr("width", gridSize).attr("height", gridSize).style("fill", highlightColor).style("fill-opacity", highlightOpacity).style("pointer-events", "none");
      } else {
        console.log("Error: Can't update highlight. Heatmap was not initialized.");
      }
    }
    function heatmap2(selection) {
      var data = selection.datum();
      columns = data.length;
      rows = data[0].length;
      var calculatedMargin = Object.assign({}, margin);
      if (title) {
        calculatedMargin.top = margin.top + 50;
      }
      if (subtitle) {
        calculatedMargin.top = margin.top + 20;
      }
      if (yAxisScale || yAxisLabels) {
        calculatedMargin.left = margin.left + 50;
      }
      gridSize = (width - calculatedMargin.left - calculatedMargin.right) / columns;
      var height2 = gridSize * (rows + 2);
      var max = 0;
      for (var i = 0; i < data.length; i++) {
        for (var j = 0; j < data[i].length; j++) {
          if (data[i][j] > max) {
            max = data[i][j];
          }
        }
      }
      if (!colorScale) {
        colorScale = d3Scale.scaleLinear().domain([0, max / 2, max]).range(["#FFFFDD", "#3E9583", "#1F2D86"]);
      }
      svg = selection.append("svg").attr("width", width + calculatedMargin.left + calculatedMargin.right + 9).attr("height", height2 + calculatedMargin.top + calculatedMargin.bottom).append("g").attr("transform", "translate(" + calculatedMargin.left + "," + calculatedMargin.top + ")");
      var fontSize = Math.min(gridSize, 10);
      if (yAxisScale || yAxisLabels) {
        if (yAxisScale) {
          var y = d3Scale.scaleLinear().domain(yAxisScale).range([gridSize * rows, 0]);
          svg.append("g").attr("transform", "translate(3, 0)").attr("class", "rowLabel axis").call(d3Axis.axisLeft(y).ticks(yAxisScaleTicks).tickFormat(yAxisTickFormat));
        } else {
          svg.selectAll(".rowLabel").data(yAxisLabels).enter().append("text").text(yAxisLabelFormat).attr("x", 0).attr("y", function(d, i2) {
            return i2 * gridSize;
          }).style("text-anchor", "end").style("font-size", fontSize + "px").attr("transform", "translate(-6," + gridSize / 1.2 + ")").attr("class", "rowLabel mono axis");
        }
      }
      if (xAxisScale || xAxisLabels) {
        if (xAxisScale) {
          var x = d3Scale.scaleLinear().domain(xAxisScale).range([0, width - calculatedMargin.left - calculatedMargin.right]);
          svg.append("g").attr("transform", "translate(3, 3)").attr("class", "columnLabel axis").call(d3Axis.axisTop(x).ticks(xAxisScaleTicks).tickFormat(xAxisTickFormat));
        } else {
          var approxTextHeight = 1.40333 * fontSize;
          svg.selectAll(".columnLabel").data(xAxisLabels).enter().append("text").text(xAxisLabelFormat).attr("y", function(d, i2) {
            return i2 * gridSize;
          }).attr("x", 0).style("text-anchor", "beginning").style("font-size", fontSize + "px").attr("transform", "translate(" + (gridSize + approxTextHeight) / 2 + ", -6) rotate(270)").attr("class", "columnLabel mono axis");
        }
      }
      svg.selectAll("g.column").data(data).enter().append("g").each(function(d, i2) {
        d3Selection.select(this).selectAll("rect").data(d).enter().append("rect").attr("x", function(d2) {
          return i2 * gridSize + 3;
        }).attr("y", function(d2, j2) {
          return j2 * gridSize;
        }).attr("class", "bordered").attr("width", gridSize).attr("height", gridSize).style("stroke", "white").style("stroke-opacity", gridStrokeOpacity).style("fill", function(d2) {
          return d2 == null ? nullValueColor : colorScale(d2);
        }).style("pointer-events", "all").on("mouseover", function(d2, j2) {
          return mouseOver(d2, i2, j2);
        }).on("mouseout", function(d2, j2) {
          return mouseOut(d2, i2, j2);
        }).on("click", function(d2, j2) {
          return click(d2, i2, j2);
        });
      });
      if (highlight && highlight.length > 0) {
        updateHighlight();
      }
      if (title) {
        svg.append("text").attr("class", "title").attr("x", width / 2).attr("y", -60).style("text-anchor", "middle").text(title);
      }
      if (subtitle) {
        svg.append("text").attr("class", "subtitle").attr("x", width / 2).attr("y", -40).style("text-anchor", "middle").text(subtitle);
      }
      if (legendElement) {
        if (!legendWidth) {
          legendWidth = Math.min(width * 0.8, 400);
        }
        var legendSvg = d3Selection.select(legendElement).append("svg").attr("width", legendWidth + legendMargin.left + legendMargin.right + 16).attr("height", legendHeight + legendMargin.top + legendMargin.bottom).append("g").attr("transform", `translate(${legendMargin.left + 8}, ${legendMargin.top})`);
        var countScale = d3Scale.scaleLinear().domain([0, max]).range([0, width]);
        var numStops = 10;
        var countRange = countScale.domain();
        var countPoint = [];
        countRange[2] = countRange[1] - countRange[0];
        for (var z = 0; z < numStops; z++) {
          countPoint.push(z * countRange[2] / (numStops - 1) + countRange[0]);
        }
        legendSvg.append("defs").append("linearGradient").attr("id", "legend-traffic").attr("x1", "0%").attr("y1", "0%").attr("x2", "100%").attr("y2", "0%").selectAll("stop").data(d3Array.range(numStops)).enter().append("stop").attr("offset", function(d, i2) {
          return countScale(countPoint[i2]) / width;
        }).attr("stop-color", function(d, i2) {
          return colorScale(countPoint[i2]);
        });
        var legendWrapper = legendSvg.append("g").attr("class", "legendWrapper").attr("transform", "translate(0, 20)");
        legendWrapper.append("rect").attr("class", "legendRect").attr("x", 0).attr("y", 0).attr("width", legendWidth).attr("height", 10).style("fill", "url(#legend-traffic)");
        legendWrapper.append("text").attr("class", "legendTitle").attr("x", legendWidth / 2).attr("y", -10).style("text-anchor", "middle").text(legendLabel);
        var xScale = d3Scale.scaleLinear().range([-legendWidth / 2, legendWidth / 2]).domain([0, max]);
        var xAxis = d3Axis.axisBottom().ticks(legendScaleTicks).scale(xScale).tickFormat(legendTickFormat);
        legendWrapper.append("g").attr("class", "axis").attr("transform", `translate(${legendWidth / 2}, 10)`).call(xAxis);
      }
    }
    heatmap2.title = function(_) {
      if (!arguments.length) {
        return title;
      }
      title = _;
      return heatmap2;
    };
    heatmap2.subtitle = function(_) {
      if (!arguments.length) {
        return subtitle;
      }
      subtitle = _;
      return heatmap2;
    };
    heatmap2.legendLabel = function(_) {
      if (!arguments.length) {
        return legendLabel;
      }
      legendLabel = _;
      return heatmap2;
    };
    heatmap2.legendTickFormat = function(_) {
      if (!arguments.length) {
        return legendTickFormat;
      }
      legendTickFormat = _;
      return heatmap2;
    };
    heatmap2.width = function(_) {
      if (!arguments.length) {
        return width;
      }
      width = _;
      return heatmap2;
    };
    heatmap2.height = function(_) {
      if (!arguments.length) {
        return height;
      }
      height = _;
      return heatmap2;
    };
    heatmap2.margin = function(_) {
      if (!arguments.length) {
        return margin;
      }
      margin = _;
      return heatmap2;
    };
    heatmap2.colorScale = function(_) {
      if (!arguments.length) {
        return colorScale;
      }
      colorScale = _;
      return heatmap2;
    };
    heatmap2.xAxisScale = function(_) {
      if (!arguments.length) {
        return xAxisScale;
      }
      xAxisScale = _;
      return heatmap2;
    };
    heatmap2.yAxisScale = function(_) {
      if (!arguments.length) {
        return yAxisScale;
      }
      yAxisScale = _;
      return heatmap2;
    };
    heatmap2.xAxisScaleTicks = function(_) {
      if (!arguments.length) {
        return xAxisScaleTicks;
      }
      xAxisScaleTicks = _;
      return heatmap2;
    };
    heatmap2.yAxisScaleTicks = function(_) {
      if (!arguments.length) {
        return yAxisScaleTicks;
      }
      yAxisScaleTicks = _;
      return heatmap2;
    };
    heatmap2.xAxisLabelFormat = function(_) {
      if (!arguments.length) {
        return xAxisLabelFormat;
      }
      xAxisLabelFormat = _;
      return heatmap2;
    };
    heatmap2.yAxisLabelFormat = function(_) {
      if (!arguments.length) {
        return yAxisLabelFormat;
      }
      yAxisLabelFormat = _;
      return heatmap2;
    };
    heatmap2.xAxisTickFormat = function(_) {
      if (!arguments.length) {
        return xAxisTickFormat;
      }
      xAxisTickFormat = _;
      return heatmap2;
    };
    heatmap2.yAxisTickFormat = function(_) {
      if (!arguments.length) {
        return yAxisTickFormat;
      }
      yAxisTickFormat = _;
      return heatmap2;
    };
    heatmap2.legendScaleTicks = function(_) {
      if (!arguments.length) {
        return legendScaleTicks;
      }
      legendScaleTicks = _;
      return heatmap2;
    };
    heatmap2.onClick = function(_) {
      if (!arguments.length) {
        return clickHandler;
      }
      clickHandler = _;
      return heatmap2;
    };
    heatmap2.onMouseOver = function(_) {
      if (!arguments.length) {
        return mouseOverHandler;
      }
      mouseOverHandler = _;
      return heatmap2;
    };
    heatmap2.onMouseOut = function(_) {
      if (!arguments.length) {
        return mouseOutHandler;
      }
      mouseOutHandler = _;
      return heatmap2;
    };
    heatmap2.xAxisLabels = function(_) {
      if (!arguments.length) {
        return xAxisLabels;
      }
      xAxisLabels = _;
      return heatmap2;
    };
    heatmap2.yAxisLabels = function(_) {
      if (!arguments.length) {
        return yAxisLabels;
      }
      yAxisLabels = _;
      return heatmap2;
    };
    heatmap2.gridStrokeOpacity = function(_) {
      if (!arguments.length) {
        return gridStrokeOpacity;
      }
      gridStrokeOpacity = _;
      return heatmap2;
    };
    heatmap2.highlightColor = function(_) {
      if (!arguments.length) {
        return highlightColor;
      }
      highlightColor = _;
      return heatmap2;
    };
    heatmap2.highlightOpacity = function(_) {
      if (!arguments.length) {
        return highlightOpacity;
      }
      highlightOpacity = _;
      return heatmap2;
    };
    heatmap2.setHighlight = function(_) {
      if (!arguments.length) {
        return highlight;
      }
      highlight = _;
      return heatmap2;
    };
    heatmap2.invertHighlightRows = function(_) {
      if (!arguments.length) {
        return invertHighlightRows;
      }
      invertHighlightRows = _;
      return heatmap2;
    };
    heatmap2.updateHighlight = updateHighlight;
    heatmap2.nullValueColor = function(_) {
      if (!arguments.length) {
        return nullValueColor;
      }
      nullValueColor = _;
      return heatmap2;
    };
    heatmap2.legendElement = function(_) {
      if (!arguments.length) {
        return legendElement;
      }
      legendElement = _;
      return heatmap2;
    };
    heatmap2.legendWidth = function(_) {
      if (!arguments.length) {
        return legendWidth;
      }
      legendWidth = _;
      return heatmap2;
    };
    heatmap2.legendHeight = function(_) {
      if (!arguments.length) {
        return legendHeight;
      }
      legendHeight = _;
      return heatmap2;
    };
    heatmap2.legendMargin = function(_) {
      if (!arguments.length) {
        return legendMargin;
      }
      legendMargin = _;
      return heatmap2;
    };
    return heatmap2;
  }
  exports2.default = heatmap;
  Object.defineProperties(exports2, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
}));
