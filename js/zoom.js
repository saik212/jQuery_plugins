$.Zoom = function (el) {
	this.$el = $(el);
	this.$width = this.$el.width();
	this.$height = this.$el.height();

	// Get image to be magnified
	this.$image = this.$el.children('.zoom-pic');

	// Get lens element
	this.$lens = this.$el.children('.mag-lens');

	this.$el.on("mousemove", ".zoom-pic", this.magnify.bind(this));
};

$.Zoom.prototype.magnify = function (event) {
	event.preventDefault();

	// if (!this.imgWidth && this.imgHeight) {
		var lensImg = new Image();
		lensImg.src = this.$image.attr('src');
		this.$lens.append(lensImg);

		this.imgWidth = lensImg.width;
		this.imgHeight = lensImg.height;
	// } else {
		var lensOffset = this.$el.offset();

		var mX = event.pageX - lensOffset.left;
		var mY = event.pageY - lensOffset.top;
		
		if ( (mX < this.$width) && (mY < this.$height) && (mX > 0) && (mY > 0) ) {
			this.$lens.fadeIn(100);
		} else {
			this.$lens.fadeOut(100);
		}

		if (this.$lens.is(':visible')){
			var rX = Math.round( mX/this.$image.width()*this.imgWidth - this.$lens.width()/2 ) -1;
			var rY = Math.round( mY/this.$image.height()*this.imgHeight - this.$lens.height()/2 ) -1;
			var bgp = rX +"px " + rY +"px";

			var pX = mX - this.$lens.width()/2;
			var pY = mY - this.$lens.height()/2;
		}
	
		this.$lens.css({
			left: pX,
			top: pY,
			backgroundPosition: bgp
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