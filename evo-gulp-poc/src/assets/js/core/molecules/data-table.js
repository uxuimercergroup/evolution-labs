//--------------------------------------------------------------------------------------------------------
// Mercer Evolution v{{ evo_meta_version }} - Data Table JS
// DATE: {{ evo_meta_date }}
// AUTHOR: {{ evo_meta_author }}
// URL: {{ evo_meta_url }}
//--------------------------------------------------------------------------------------------------------

// Data table defaults
var evoDataTableDefaults = {
	searching: true, // Filtering on/off
	paging: true, // Pagination + show entries select on/off
	info: true, // Entries info (Showing 10 of 14 etc.) on/off
	order: [[0, 'asc']], // Sort order: first column of data sorted ascending by default
	language: {
	    sSearch: '', // Label text next to quick filter input box, blank by default
	    searchPlaceholder: "Filter" // Quick filter input placeholder text, "Filter" bvy default
	}
};

// Data table function:
// Pass data attribute value of data table object and any data table options you want to add/override
var evoDataTable = function(objectDataValue, options) {
	
	// Variable to define data table object based on data attribute value
	var dataTableDataValue = jQuery('[data-evo-data-table='+objectDataValue+']');

	// Apply data table and any default or custom data table options
	dataTableDataValue.DataTable(jQuery.extend({},evoDataTableDefaults,options));
};