$.Tabs = function (el) {
	// Constructor to make element into jQuery object
	// pass in element to give it access to following actions
	this.$el = $(el);
	this.$contentTabs = $("#content-tabs");
	this.$activeTab = this.$contentTabs.find(".active");

	this.$el.on("click", "a", this.switchTab.bind(this));
};

$.Tabs.prototype.switchTab = function (event) {
	event.preventDefault();
	var activeLink = $(event.currentTarget);
	var newActivePane = $(event.currentTarget).attr("href");

	this.$el.find("a").removeClass("active");
	activeLink.addClass("active");
	var $newActiveTab = this.$contentTabs.find(newActivePane);

	
	this.$activeTab.removeClass("active").addClass("transitioning");
	// Switches active to transitioning, vice versa, only once for both
	// active and non-active tabs
	this.$activeTab.one("transitionend", (function () {
		this.$activeTab.removeClass("transitioning");
		this.$activeTab = $newActiveTab;
		this.$activeTab.addClass("transitioning");
		setTimeout((function () {
			this.$activeTab.removeClass("transitioning").addClass("active");
		}).bind(this), 0);
	}).bind(this));

}

$.fn.tabs = function () {
	return this.each(function () {
		new $.Tabs(this);
	});
};


// Does this as soon as document is ready
$(function () {
	$(".tabs").tabs();
});