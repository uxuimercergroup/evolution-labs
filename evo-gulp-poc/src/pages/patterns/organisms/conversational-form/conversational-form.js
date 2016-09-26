//--------------------------------------------------------------------------------------------------------
// Mercer Evolution v{{ evo_meta_version }}
// {{ conversational_form_meta_name }} v{{ conversational_form_meta_version }} - JS
// DATE: {{ conversational_form_meta_date }}
// AUTHOR: {{ evo_meta_author }}
// URL: {{ evo_meta_url }}
//--------------------------------------------------------------------------------------------------------

// CONVERSATIONAL FORM ITEM TOGGLE  - BEGINS
	var evoConversationalFormItemToggle = function(){
		jQuery('[data-evo-conversational-form-element]').focus(function(){
			var id = 'evo-conversational-form-item-' + jQuery(this).attr('data-evo-conversational-form-item-toggle');
			jQuery('#' + id).fadeIn(2000);
		});
	}
	evoConversationalFormItemToggle();
// CONVERSATIONAL FORM ITEM TOGGLE - ENDS