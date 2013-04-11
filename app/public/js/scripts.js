$(function(io, $) {

var socket = io.connect('http://192.168.11.4:3000/chat'),
btnFrame = $("#btn-container .frame"),
msgList = $("#msg"),
$COLOR_CODE = ["#cccccc", "#ff0000", "#660066", "#3300cc", "#336600", "#33cc00", "#ffff00", "#ff6600", "#000000"],
$BTN_MAX = 9,
btn_html = "";

for(var i = 0; i < $BTN_MAX; i++) {
	btn_html += '<div style="background:'+ $COLOR_CODE[i] +';" id="'+ i +'" class="btn">'+ i +'</div>';
}
btnFrame.append(btn_html);

var btnPush = $("#btn-container .btn");

socket.on('connected', function() {
	console.log('connected');
});

// ------------------------------
// 送信
// ------------------------------
btnPush.on("click", function(e){
	chat("まうお", e.target.id);
});

function chat(name, no) {
	socket.json.emit('send', {
		'name': name,
		'no': no,
		'message': no + 'バアァァァァァーーーーン！！！！'
	});
}

// ------------------------------
// 受信
// ------------------------------
socket.on('message', function(data) {
	if (data) {
		console.log(data);
		update(data);
	}
});

function update(data) {
	msgList.text(data.name + ":" + data.message);
}

}(io, jQuery));