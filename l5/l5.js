var q_len;
var r_cnt;

var result;

function rand_uniform(a, b) {
  return ((Math.random() * (b - a)) | 0) + a;
}

function init() {  
  q_len = document.getElementById("inlength");
  r_cnt = document.getElementById("outlength");
  result = document.getElementById("result");

}

function get_time_generator() {
  return rand_uniform(8, 12);
}
function get_time_processor1() {
  return rand_uniform(15, 25);
}
function get_time_processor2() {
  return rand_uniform(30, 50);
}
function get_time_processor3() {
  return rand_uniform(20, 60);
}

function start_simulation() {
 
  var qlen = Number(q_len.value) | 0;
  var copy_qlen = 0;
  var rcnt = Number(r_cnt.value) | 0;
  var people = [0, 0, 0];
  var tpeople = [0.0, 0.0, 0.0];
  var computer = [0, 0];
  var tcomputer = [0.0, 0.0]
  var computer_quae = [0, 0];
  var client = 0;
  var i = 0;
  var losers = 0;
  var n = 0.01;
  
  client = 0;
  while ((i < rcnt)&&(qlen > 0)){
	
	if(client - n <= 0){
	  qlen--;
	  copy_qlen++;
	  if(people[0] == 0){
		++people[0];
		tpeople[0] = get_time_processor1();	
		client = get_time_generator();
	  }else{
		  if(people[1] == 0){
			++people[1];
			tpeople[1] = get_time_processor2();
			client = get_time_generator();			
		  }else{
			  if(people[2] == 0){
				++people[2];
				tpeople[2] = get_time_processor3();
				client = get_time_generator();				
			  }else{
				 ++losers;
				 client = get_time_generator();
			  }
		  }
	  } 
    }else{
		client -= n;
	}
	
	if(tpeople[0] - n > 0)
		tpeople[0] -= n;
	if(tpeople[1] - n > 0) 
		tpeople[1] -= n;
	if(tpeople[2] - n > 0) 
		tpeople[2] -= n;
	
	if((tpeople[0] - n <= 0)&&(people[0] == 1)){
		people[0] = 0;
		++computer_quae[0];
	}
	if((tpeople[1] - n <= 0)&&(people[1] == 1)){
		people[1] = 0;
		++computer_quae[0];
	}
	if((tpeople[2] - n <= 0)&&(people[2] == 1)){
		people[2] = 0;
		++computer_quae[1];
	}
	
	if((computer_quae[0] > 0)&&(computer[0] == 0)){
		tcomputer[0] = 15;
		computer[0] = 1;
		--computer_quae[0];
	}
	if((computer_quae[1] > 0)&&(computer[1] == 0)){
		tcomputer[1] = 30;
		computer[1] = 1;
		--computer_quae[1];
	}
	
	if(tcomputer[0] - n > 0)
		tcomputer[0] -= n;
	if(tcomputer[1] - n > 0) 
		tcomputer[1] -= n;
	
	if((computer[0] == 1)&&(tcomputer[0] - n <= 0)){
		computer[0] = 0;
		++i;
	}
	if((computer[1] == 1)&&(tcomputer[1] - n <= 0)){
		computer[1] = 0;
		++i;
	}
	
  }
  return losers/copy_qlen;
  
}

function simulate() {
    var avg = 0;
	for (var k = 0; k < 100; k++) {
	  avg += start_simulation();
	}
	avg /= 100;
	result.innerHTML = avg.toString();
}

document.addEventListener("DOMContentLoaded", init, false);