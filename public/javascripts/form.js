var temp=$('#must1').html();
var temp2=$('#form2').html();

$(document).ready(function(){


	refresh_userlist();
	$('#form1').ajaxForm({beforeSubmit:form1Request, success:form1Response});
	$('#form2').ajaxForm({beforeSubmit:form2Request, success:form2Response});
});

function form1Request()  { 

}

function form1Response(responseText)  { 

	if(responseText=="1"){
		$('#form1 input[type=reset]').click();
		refresh_userlist();
		alert("User Successfully added");
	}else{
		alert("Email already exist");
	}

}

function form2Request()  { 

}

function form2Response(responseText)  { 

	if(responseText=="1"){
		$('#form2 input[type=reset]').click();
		refresh_userlist();
		alert("User Successfully updated");
		$('#editmodel').modal('hide');
	}else{
		alert("Email already exist");
	}

}



function refresh_userlist() {
	$.ajax({
	    url: '/userlist',
	    data: {"user": "all"},
	    type: 'GET',
	    success: function(data) {
	       var data2={};
			data2.users=data;
			var output=Mustache.render(temp,data2);
			$('#must1').html(output);
	    }
	});

}

function delete_user(userid){

	$.ajax({
	    url: '/userlist',
	    data: {"slno": userid},
	    type: 'DELETE',
	    success: function(result) {
	       refresh_userlist();	
 	       alert("user Successfully removed");
	    }
	});

}

function edit_user(userid){
	$.ajax({
	    url: '/userlist',
	    data: {"user": userid},
	    type: 'GET',
	    success: function(data) {
	       var data2={};
			data2.users=data;
			var output=Mustache.render(temp2,data[0]);
			$('#form2').html(output);
			$('#form2 input[type=reset]').click();
			$('#editmodel').modal('show');
	    }
	});
}