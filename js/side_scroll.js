$.Sidescroll = function (el) {
	this.$el = $(el);
	this.$pics = $(".pics").children();
	// set default pic
	this.$activePic = this.$pics.first();
	this.$activePic.addClass("scroll-active");
	this.activeIdx = 0;
	this.transitioning = false;

	$("a.scroll-left").click(this.scroll.bind(this));
	$("a.scroll-right").click(this.scroll.bind(this));
}

$.Sidescroll.prototype.scroll = function (event) {
	event.preventDefault();

	if (this.transitioning) {return;}
	this.transitioning = true;
	// set direction
	var newSide = "left";
	var oldSide = "right";
	var dir = -1;
	if ($(event.target).attr('class') === "scroll-left") { 
		dir = 1;
		newSide = "right";
		oldSide = "left";
	}

	// set new active index
	var $currentPic = $(this.$pics[this.activeIdx]);
	var newActiveIdx = (this.activeIdx + this.$pics.length + dir) % this.$pics.length;
	this.activeIdx = newActiveIdx;
	var $nextPic = $(this.$pics[newActiveIdx]);

	// set new active pic
	$nextPic.addClass("scroll-active").addClass(newSide);
	$currentPic.one("transitionend", (function () {
		$currentPic.removeClass("scroll-active").removeClass(oldSide);
		this.transitioning = false;
	}).bind(this));

	setTimeout((function () {
		$currentPic.addClass(oldSide);
		$nextPic.removeClass(newSide);
	}).bind(this), 100);

	this.$activePic = $nextPic
}

$.fn.sideScroll = function () {
	return this.each(function () {
		new $.Sidescroll(this);
	});
};


// Does this as soon as document is ready
$(function () {
	$(".sidescroll").sideScroll();
});