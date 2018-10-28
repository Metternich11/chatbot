$(document).ready(() => {
	$('#text').keypress((event) => {
		if (event.which == 13) {
			event.preventDefault();
			$('#press').click();  //fire click
		}
	});

	$('#press').click(() => {
		var message = $('#text').val().replace(/\<\w+\>/g,"");
		$('#text').val('');
		if (message.length != 0) {
			send_message(message,"user");
			setTimeout(function(){ bot_reply(); }, 2000);
		}
	})

	$('#press2').click( () => {
		$('#imgLoad').click();
	}); 


	$("#imgLoad").change(function () {
        readURL(this);
    }); 

	function send_message(message, who) {
		var chatRecord = $('.chat-record').html();
		$('.chat-record').html(chatRecord + gen_message(message, who)); //put user message in chat
		$('.chat-record').scrollTop($('.chat-record').prop('scrollHeight')); //autoscroll
	} 
	
var jj = 0;
	function bot_reply() {
		if (botMessages.length == 0) {
			botMessages = botMessages_old;
			botMessages_old = [];
			jj = 0;
			console.log(botMessages_old);
		}
		i = Math.floor(Math.random() * botMessages.length);
		let message = botMessages[i];
		botMessages_old[jj] = botMessages[i];
		jj++;
		botMessages.splice(i, 1);
		send_message(message,"bot");
	}

	function gen_message(message,person) {
		if (person == "user") {
			var chat_class = "user'";
			var img_src = "src='bilder/human.png'";
			var img_class = "'profile human'";
			var arrow_class = "'user_arrow'";
			var time_class = "'user_time";
		}
		else if (person == "bot") {
			var chat_class = "bot'";
			var img_src = "src='bilder/bot.png'";
			var img_class = "'profile bot'";
			var arrow_class = "'bot_arrow'";
			var time_class = "'bot_time";
		}

		else {return "ERROR";}
		return "<div class='chat "+chat_class+"><img "+img_src+" class="+img_class+"' profile'><div class= "+arrow_class+"></div><p class='message'>"+message+"<small class="+time_class+" datum'>"+zeit()+"</small></p></div>";
	}

	function zeit() {
	let d = new Date();
	let hours = d.getHours().toString();

	let minutes = d.getMinutes().toString();
	if (minutes.length == 1) {
		minutes = "0"+minutes;
	}
	return hours+":"+minutes;
}
    var pic_count = 0;
 	function readURL(input) {
 		if (input.files && input.files[0]) {
	 		let tmp = "imag" + String(pic_count);
	 		console.log(tmp);
	 		var pic = "<img id=" + tmp + " src='' height='100px' width='100px'>"
	 		send_message(pic,"user");
	    	var reader = new FileReader();
	    	reader.onload = function(e) {
	      	$('#'+tmp).attr('src', e.target.result);
	      	pic_count++;
   		 	}

   	 		reader.readAsDataURL(input.files[0]);
 		}	
};

});