$(document).ready(function() {
	$(window).on('resize', function() {
		changeNavbarStyle();
	});
});

function changeNavbarStyle() {
	var w = $(document).width();
	if(w < 992) {
		$('.navbar').addClass('bg-info');
		$('.navbar').removeClass('bg-transparent');
	}
	else {
		$('.navbar').removeClass('bg-info');
		$('.navbar').addClass('bg-transparent');
	}
}