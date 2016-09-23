//--------------------------------------------------------------------------------------------------------
// Mercer Evolution v{{ evo_meta_version }} - Slider JS
// DATE: {{ evo_meta_date }}
// AUTHOR: {{ evo_meta_author }}
// URL: {{ evo_meta_url }}
//--------------------------------------------------------------------------------------------------------

// Define slider defaults
var evoSliderDefaults = {
	animate: true, // Animated slide on/off
	min: 0, // Min value to show on slider
	max: 100, // Max value to show on slider
	orientation: "horizontal", // Orientation: horizontal (default) or vertical
	step: 1, // Determines the size or amount of each interval or step the slider takes between the min and max
	value: 50 // Start value for the slider handle
};

// Slider function:
// Pass data attribute value of slider object and any slider options you want to add/override
var evoSlider = function(objectDataValue, options) {
	
	// Variable to define slider object based on data attribute value
	var sliderDataValue = jQuery('[data-evo-slider='+objectDataValue+']');

	// Apply slider and any default or custom slider options
	sliderDataValue.slider(jQuery.extend({},evoSliderDefaults,options));
};


// Define slider range defaults
var evoSliderRangeDefaults = {
	animate: true, // Animated slide true/false
	min: 0, // Min value to show on slider
	max: 100, // Max value to show on slider
	orientation: "horizontal", // Orientation: horizontal (default) or vertical
	range: true, // Range slider true/false
	step: 1, // Determines the size or amount of each interval or step the slider takes between the min and max
	values: [10, 80] // Start values for the sliders handles
};

// Slider range function:
// Pass data attribute value of slider range object and any slider range options you want to add/override
var evoSliderRange = function(objectDataValue, options) {
	
	// Variable to define slider range object based on data attribute value
	var sliderDataValue = jQuery('[data-evo-slider='+objectDataValue+']');

	// Apply slider range and any default or custom slider range options
	sliderDataValue.slider(jQuery.extend({},evoSliderRangeDefaults,options));

	// Apply slider range label values to the corresponding slider range input of the slider range object
	sliderDataValue.slider({
		slide: function(event, ui) {
			sliderDataValue.parent().find('.evo-slider-range-input').val(ui.values[0]+"%"+" - "+ui.values[1]+"%");
		}
	});
};

// Define slider range - single handle defaults
var evoSliderRangeSingleHandleDefaults = {
	animate: true, // Animated slide true/false
	min: 0, // Min value to show on slider
	max: 100, // Max value to show on slider
	orientation: "horizontal", // Orientation: horizontal (default) or vertical
	step: 1, // Determines the size or amount of each interval or step the slider takes between the min and max
	value: 10 // Start value for the slider handle
};

// Slider range - single handle function:
// Pass data attribute value of slider range - single handle object and any slider range - single handle options you want to add/override
var evoSliderRangeSingleHandle = function(objectDataValue, options) {
	
	// Variable to define slider range - single handle object based on data attribute value
	var sliderDataValue = jQuery('[data-evo-slider='+objectDataValue+']');

	// Apply slider range - single handle and any default or custom slider range - single handle options
	sliderDataValue.slider(jQuery.extend({},evoSliderRangeSingleHandleDefaults,options));

	// Apply slider range - single handle label values to the corresponding slider range - single handle input of the slider range - single handle object
	sliderDataValue.slider({
		slide: function(event, ui) {
			sliderDataValue.parent().find('.evo-slider-range-input').val(ui.value+"%");
		}
	});
};

// Slider ticks:
// Defines the custom implementation of the built-in slider widget.
jQuery.widget('app.slider', jQuery.ui.slider, {

	// The new "ticks" option defaults to false.
	options: {
		ticks: false
	},

	// Called when the slider is instantiated.
	_create: function() {

	// Call the original constructor, creating the slider normally.
	this._super();

	// If the "ticks" option is false or the "step" option is
	// less than 5, there's nothing to do.
	if ( !this.options.ticks || this.options.step < 5 ) {
		return;
	}

	// Setup some variables for rendering the tick marks below the slider.
	var cnt = this.options.min + this.options.step,
	left;

	while (cnt < this.options.max) {

		// Compute the "left" CSS property for the next tick mark.
		left = (cnt / this.options.max * 100).toFixed(2) + '%';

		// Creates the tick div, and adds it to the element. It adds the
		// "evo-slider-tick-marker" class, which has common properties for each tick.
		// It also applies the computed CSS properties, "left".
		jQuery('<div/>').addClass('evo-slider-tick-marker')
		.appendTo(this.element)
		.css({left: left});

		cnt += this.options.step;
		}
	}
});