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

Replaces the built-in color scale function. Function takes no arguments, and returns a [d3.scale](https://github.com/d3/d3-scale) function. Example:

```js
heatmap.colorScale(d3.scale.linear()
    .domain([0, 65 / 2, 65])
    .range(['#FFFFFF', '#ff5032', '#e50914'])
);
```

If called with no arguments, `colorScale` will return the heatmap _colorScale_ function.
