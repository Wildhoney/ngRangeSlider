ngRangeSlider
===================

![Travis](http://img.shields.io/travis/Wildhoney/ngRangeSlider.svg?style=flat)
&nbsp;
![npm](http://img.shields.io/npm/v/ng-range-slider.svg?style=flat)
&nbsp;
![License MIT](http://img.shields.io/badge/License-MIT-lightgrey.svg?style=flat)
&nbsp;
![Experimental](http://img.shields.io/badge/%20!%20%20-experimental-blue.svg?style=flat)

* **Heroku**: [http://ng-range-slider.herokuapp.com/](http://ng-range-slider.herokuapp.com/)
* **Bower:** `bower install ng-range-slider`

`ngRangeSlider` is an experimental module for two reasons: it uses the [`input range`](http://caniuse.com/#search=range) element &ndash; and secondly, `ngRangeSlider` goes one step further to stack each `input` using special CSS selectors.

Module was created due to an observation on the limitation of `input range` elements &ndash; they are restricted to only one handle. Essentially `ngRangeSlider` is a HTML5 implementation of [jQuery's range slider](http://jqueryui.com/slider/#range).

<img src="http://i.imgur.com/MlXBnBx.png" alt="Screenshot" width="350" />

---

# Getting Started

With `ngRangeSlider` the CSS is just as important as the JavaScript. Without the CSS the `input range` elements will still have a direct relationship, but they will not be stacked.

For the styles please refer to the `Default.css` document in the example, as this provides a fairly comprehensive list of the styles to be applied to the `input range` elements.

`ngRangeSlider` is a typical Angular directive which requires an `ng-model` attribute which it will write the range to in the form of `{ from: 0, to: 10 }`.

```html
<section data-range-slider ng-model="range"></section>
```

You're also able to apply the `min`, `max`, and `step` attributes &ndash; and these may also be changed after the directive has been initialised.

```html
<section data-range-slider ng-model="range" min="minValue" max="maxValue"></section>
```

Each and every time the value of the range has been updated the `ng-model` will be updated. In our case using the example above it will write to `$scope.range`.

```html
Current range is {{range.from}} to {{range.to}}!
```

