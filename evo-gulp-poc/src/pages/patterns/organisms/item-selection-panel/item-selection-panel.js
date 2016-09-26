//--------------------------------------------------------------------------------------------------------
// Mercer Evolution v{{ evo_meta_version }}
// {{ item_selection_panel_meta_name }} v{{ item_selection_panel_meta_version }} - JS
// DATE: {{ item_selection_panel_meta_date }}
// AUTHOR: {{ evo_meta_author }}
// URL: {{ evo_meta_url }}
//--------------------------------------------------------------------------------------------------------

// ITEM SELECTION PANEL ITEM SELECTED TOGGLE - BEGINS
	var evoItemSelectionPanelItemSelected = function (){
		jQuery('[data-evo-item-selection-panel-item]').change(function() {
			jQuery(this).toggleClass('evo-item-selection-panel-item-selected');
		});
	}
	evoItemSelectionPanelItemSelected();
// ITEM SELECTION PANEL ITEM SELECTED TOGGLE - ENDS