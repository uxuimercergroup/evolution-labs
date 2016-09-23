//--------------------------------------------------------------------------------------------------------
// Mercer Evolution v{{ evo_meta_version }} - Autocomplete JS
// DATE: {{ evo_meta_date }}
// AUTHOR: {{ evo_meta_author }}
// URL: {{ evo_meta_url }}
//--------------------------------------------------------------------------------------------------------

// Autocomplete defaults
var evoAutocompleteDefaults = {
	autoFocus: true, // If set to true the first item will automatically be focused when the menu is shown.
	delay: 0, // The delay in milliseconds between when a keystroke occurs and when a search is performed. A zero-delay makes sense for local data (more responsive), but can produce a lot of load for remote data, while being less responsive.
	minLength: 3 // The minimum number of characters a user must type before a search is performed. Zero is useful for local data with just a few items, but a higher value should be used when a single character search could match a few thousand items.
};

// Autocomplete function:
// Pass data attribute value of autocomplete object and any autocomplete options you want to add/override
var evoAutocomplete = function(objectDataValue, options) {
	
	// Variable to define autocomplete object based on data attribute value
	var autocompleteDataValue = jQuery('[data-evo-autocomplete='+objectDataValue+']');
	
	// Apply autocomplete and any default or custom autocomplete options
	autocompleteDataValue.autocomplete(jQuery.extend({},evoAutocompleteDefaults,options));

};