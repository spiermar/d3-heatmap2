# d3-heatmap

A D3.js plugin that produces heatmaps.

## Installing

If you use NPM, `npm install d3-heatmap`. Otherwise, download the [latest release](https://github.com/spiermar/d3-heatmap/releases/latest).

## API Reference

<a href="#title" name="title">#</a> heatmap.<b>title</b>(<i>[title]</i>)

Heatmap title. Defaults to _empty_ if not set. If called with no arguments, `title` will return the heatmap title. 

<a href="#subtitle" name="subtitle">#</a> heatmap.<b>subtitle</b>(<i>[subtitle]</i>)

Heatmap subtitle. Defaults to _empty_ if not set. If called with no arguments, `subtitle` will return the heatmap subtitle. 

<a href="#legendLabel" name="legendLabel">#</a> heatmap.<b>legendLabel</b>(<i>[label]</i>)

Heatmap label legend. Defaults to _empty_ if not set. If called with no arguments, `legendLabel` will return the heatmap label legend. 

<a href="#width" name="width">#</a> heatmap.<b>width</b>(<i>[width]</i>)

Heatmap width in _px_. Defaults to 960px if not set. If called with no arguments, `width` will return the heatmap width. 

<a href="#margin" name="margin">#</a> heatmap.<b>margin</b>(<i>[object]</i>)

Heatmap title. Defaults to the values below if not set.

```js
{
    top: 20,
    right: -50,
    bottom: 50,
    left: 50
}
```

If called with no arguments, `margin` will return the heatmap margin object. 

<a name="colorScale" href="#colorScale">#</a> heatmap.<b>colorScale</b>(<i>[function]</i>)

Replaces the built-in color scale function. The scale function takes no arguments, and returns a [d3.scale](https://github.com/d3/d3-scale) function. Example:

```js
heatmap.colorScale(d3.scaleLinear()
    .domain([0, 65 / 2, 65])
    .range(['#FFFFFF', '#ff5032', '#e50914'])
);
```

If called with no arguments, `colorScale` will return the heatmap _colorScale_ function.

<a name="xAxisScale" href="#xAxisScale">#</a> heatmap.<b>xAxisScale</b>(<i>[array]</i>)

Heatmap xAxis scale domain, in a value scale array format. Defaults to `null` if not set, which displays the xAxis labels instead of the scale.

```js
heatmap.yAxisScale([0, 1000]);
```

If called with no arguments, `xAxisScale` will return the heatmap xAxis scale domain array.

<a name="yAxisScale" href="#yAxisScale">#</a> heatmap.<b>yAxisScale</b>(<i>[array]</i>)

Heatmap yAxis scale domain, in a value scale array format. Defaults to `null` if not set, which displays the yAxis labels instead of the scale.

```js
heatmap.yAxisScale([0, 100]);
```

If called with no arguments, `yAxisScale` will return the heatmap yAxis scale domain array.

<a name="xAxisLabelFormat" href="#xAxisLabelFormat">#</a> heatmap.<b>xAxisLabelFormat</b>(<i>[function]</i>)

Heatmap xAxis label formatter function. The label formatter function takes a single argument, the label array value, and returns a label string. Defaults to `function (d) { return d }` if not set, which displays the value in the xAxis labels array.

```js
heatmap.xAxisLabelFormat(function (d) { return d + ' sec' });
```

If called with no arguments, `xAxisLabelFormat` will return the heatmap xAxis label formatter function.

<a name="yAxisLabelFormat" href="#yAxisLabelFormat">#</a> heatmap.<b>yAxisLabelFormat</b>(<i>[function]</i>)

Heatmap yAxis label formatter function. The label formatter function takes a single argument, the label array value, and returns a label string. Defaults to `function (d) { return d }` if not set, which displays the value in the yAxis labels array.

```js
heatmap.yAxisLabelFormat(function (d) { return d + ' bucket' });
```

If called with no arguments, `yAxisLabelFormat` will return the heatmap yAxis label formatter function.

<a name="xAxisTickFormat" href="#xAxisTickFormat">#</a> heatmap.<b>xAxisTickFormat</b>(<i>[function]</i>)

Heatmap xAxis tick format function. The tick format function takes a single argument, the tick value, and returns a formatted tick. Defaults to `d3.format('.0f')` if not set.

```js
heatmap.xAxisTickFormat(d3.format('.0f'));
```

If called with no arguments, `xAxisTickFormat` will return the heatmap xAxis tick format function.

<a name="yAxisTickFormat" href="#yAxisTickFormat">#</a> heatmap.<b>yAxisTickFormat</b>(<i>[function]</i>)

Heatmap yAxis tick format function. The tick format function takes a single argument, the tick value, and returns a formatted tick. Defaults to `d3.format('.2s')` if not set.

```js
heatmap.yAxisTickFormat(d3.format('.2s'));
```

If called with no arguments, `yAxisTickFormat` will return the heatmap yAxis tick format function.

<a href="#xAxisHide" name="xAxisHide">#</a> heatmap.<b>xAxisHide</b>(<i>[bool]</i>)

Hide xAxis label. Defaults to `false` if not set. If called with no arguments, `xAxisHide` will return the status of the xAxis label. 

<a href="#yAxisHide" name="yAxisHide">#</a> heatmap.<b>yAxisHide</b>(<i>[bool]</i>)

Hide yAxis label. Defaults to `false` if not set. If called with no arguments, `yAxisHide` will return the status of the yAxis label. 

<a href="#legendHide" name="legendHide">#</a> heatmap.<b>legendHide</b>(<i>[bool]</i>)

Hide heatmap legend. Defaults to `false` if not set. If called with no arguments, `legendHide` will return the status of the heatmap legend.

<a name="onClick" href="#onClick">#</a> heatmap.<b>onClick</b>(<i>[function]</i>)

Defines a function that will be executed when the user clicks on a frame. Function takes 3 arguments, the value, the column index and row index respectively.

```js
heatmap.onClick(function (d, i, j) {
    console.info("Clicked on row " + j + ", column " + i + ", value " + d);
});
```

If called with no arguments, `onClick` will return the click handler.

<a name="onMouseOver" href="#onMouseOver">#</a> heatmap.<b>onMouseOver</b>(<i>[function]</i>)

Defines a function that will be executed when the user hovers the mouse over a frame. Function takes 3 arguments, the value, the column index and row index respectively.

```js
heatmap.onMouseOver(function (d, i, j) {
    document.getElementById("details").innerHTML = "column: " + i + ", row: " +  j + ", value: " + d
});
```

If called with no arguments, `onMouseOver` will return the click handler. 