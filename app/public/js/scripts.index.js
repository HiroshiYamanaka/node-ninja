$(function(io, $) {

var socket = io.connect('http://localhost:3000/chat'),
$BOARD = $("#board"),
$STAMP = $('<div class="stamp"></div>'),
$COLOR_CODE = ["#cccccc", "#ff0000", "#660066", "#3300cc", "#336600", "#33cc00", "#ffff00", "#ff6600", "#000000"];

// 接続
socket.on('connected', function() {
	console.log('connected');
});

// ------------------------------
// 受信
// ------------------------------
socket.on('message', function(data) {
	if (data) {
		update(data);
	}
});

function update(data) {
	var div = $STAMP.clone().css({background: $COLOR_CODE[data.no], zoom: 0.4}).animate({zoom:1}, 500, "easeOutBounce");
	$BOARD.prepend(div);
}

}(io, jQuery));