//--------------------------------------------------------------------------------------------------------
// Mercer Evolution v{{ evo_meta_version }} - Helpers JS Functions
// DATE: {{ evo_meta_date }}
// AUTHOR: {{ evo_meta_author }}
// URL: {{ evo_meta_url }}
//--------------------------------------------------------------------------------------------------------

// FORM HELPERS
//--------------------------------------------------------------------------------------------------------

	// FORM ELEMENT AUTOFOCUS
	var evoAutofocus = function(){
		if (!("autofocus" in document.createElement("input"))) {
			setTimeout(function(){
				jQuery("[data-evo-autofocus]").focus();
			}, 0);
		}
	}

	// Input Autofocus Init
	evoAutofocus();


// INTERACTIVE HELPERS
//--------------------------------------------------------------------------------------------------------

	// SELECT ALL CHECKBOXES TOGGLE
	var evoCheckboxesSelectAllToggle = function(){

		// This checks/unchecks all the checkboxes
		jQuery('[data-evo-checkboxes-select-all]').click(function () {
			jQuery('[data-evo-checkboxes-select-all-item]').prop('checked', this.checked);
		});

		// This is used to when user selects a checkbox in list it will uncheck the check all checkbox
		jQuery('[data-evo-checkboxes-select-all-item]').change(function () {
			var check = (jQuery('[data-evo-checkboxes-select-all-item]').filter(":checked").length == jQuery('[data-evo-checkboxes-select-all-item]').length);
			jQuery('[data-evo-checkboxes-select-all]').prop("checked", check);
		});
	}

	// Checkboxes Select All Toggle Init
	evoCheckboxesSelectAllToggle();

	// TOGGLER OFF REINIT
	var evoTogglerOffReInit = function(){
		jQuery('[data-toggler]').on('off.zf.toggler', function(){

			// ReInit equalizer on toggler off, fixes bug with toggled elements not defining height of the page
			Foundation.reInit('equalizer');

		});
	}

	// Toggler Off ReInit Init
	evoTogglerOffReInit();

	// TOGGLER ON REINIT
	var evoTogglerOnReInit = function(){
		jQuery('[data-toggler]').on('on.zf.toggler', function(){

			// ReInit equalizer on toggler on, fixes bug with toggled elements not defining height of the page
			Foundation.reInit('equalizer');

		});
	}

	// Toggler On ReInit Init
	evoTogglerOnReInit();
	