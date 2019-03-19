$(document).ready(function(){	
	$("#btn-signup").click(function(){
		const url = "/register";

		var register_data = {
			fname: $("#firstName").val(),
			lname: $("#lastName").val(),
			uname: $("#userName").val(),
			email: $("#Email").val(),
			pwd: $("#Password").val(),
			type: "0",
		}
		
		if(validate(register_data)){
			if(register_data.pwd != $("#rPassword").val()){
				alert("Password doesn't match");
				return false;
			}
			$.post(url, register_data, function(res, status){
				if(res.code == "error"){
					swal('Aww snap!', res.msg, res.code);
				}
				else{
					swal('Thank You!', res.msg, res.code);
				}
				clear_form();
			});
		}
	});


	function validate(register_data) {
		if(register_data.fname === ""){
			swal("Missing Details", "Please fill first name field", "error");
			return false;
		}
		if(register_data.lname === ""){
			swal("Missing Details", "Please fill last name field", "error");
			return false;
		}
		if(register_data.uname === ""){
			swal("Missing Details", "Please fill username field", "error");
			return false;
		}
		if(register_data.email === ""){
			swal("Missing Details", "Please fill email field", "error");
			return false;
		}
		if(register_data.pwd === ""){
			swal("Missing Details", "Please fill password field", "error");
			return false;
		}
		if($("#rPassword").val() === ""){
			swal("Missing Details", "Please fill retype password field", "error");
			return false;
		}
		return true;
	}
	
	function clear_form() {
		$("#firstName").val('');
		$("#lastName").val('');
		$("#userName").val('');
		$("#Email").val('');
		$("#Password").val('');
		$("#rPassword").val('');		
	}

});

