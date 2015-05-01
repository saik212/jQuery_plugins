$.Zoom = function (el) {
	this.$el = $(el);
	this.$width = this.$el.width();
	this.$height = this.$el.height();

	// Get image to be magnified
	this.$image = this.$el.children('.small-pic');

	// Get lens element
	this.$lens = this.$el.children('.lens');
	// Get the lens image
	// this.$zoomImage = this.$lens.children('.zoom-pic');
	this.$el.on("mousemove", this.magnify.bind(this));
	// this.$el.on("mouseleave", '.small-pic', this.leaveZoom.bind(this));
};

$.Zoom.prototype.leaveZoom = function (event) {
	this.$lens.fadeOut(100);
};

$.Zoom.prototype.magnify = function (event) {
	event.preventDefault();

	// Image offset
	var offset = this.$el.offset();

	// Grab mouse coordinates
	var mX = event.pageX;
	var mY = event.pageY;

	// Mouse offsets
	var mXOff = mX - (this.$lens.width()/2);
	var mYOff = mY - (this.$lens.height()/2);
	// Center magnifier element at mouse coordinates
	// Allow magnifier element to movie with mouse
	this.$lens.css({
		"left": mXOff,
		"top": mYOff,
		"background-image": "url(" + this.$image.attr('src') + ")",
		"background-size": (1.5 * this.$image.width()) + "px " + (1.5 * this.$image.height()) + "px",
		"background-position": "-" + (1.0 * mXOff) + "px -" + (1.0 * mYOff) + "px",
		// "background-position": "-" + mXOff + "px -" + mYOff + "px",
		"background-repeat": "no-repeat"
	});
};

$.fn.zoom = function () {
	return this.each(function () {
		new $.Zoom(this);
	});
};

$(function () {
	$('.zoom').zoom();
});