var q_len;
var r_cnt;

var queue_a;
var queue_b;
var proc_l;

var sdata_a;
var sdata_b;
var sdata_d;
var sdata_f;
var sdata_g;
var sdata_h;
var sdata_j;

var result;
var animation;

function rand_uniform(a, b) {
  return Math.random() * (b - a) + a;
}

function rand_exp(lambda){
    var u = Math.random();
    return Math.log(1.0-u)/-lambda;
}

function init() {  
  q_len = document.getElementById("queue-length");
  r_cnt = document.getElementById("req-count");
  result = document.getElementById("result");
  
  lambda = document.getElementById("lambda");
  queue_a = document.getElementById("queue-a");
  queue_b = document.getElementById("queue-b");
  
  sdata_a = document.getElementById("sdata-a");
  sdata_b = document.getElementById("sdata-b");
  sdata_d = document.getElementById("sdata-d");
  sdata_f = document.getElementById("sdata-f");
  
  sdata_g = document.getElementById("sdata-g");
  sdata_h = document.getElementById("sdata-h");
  sdata_j = document.getElementById("sdata-j");

}

function update_sim_data(queue, processed, lost) {
  var len = queue.length;
  sdata_b.innerHTML = len;
  sdata_d.innerHTML = processed;
  sdata_f.innerHTML = lost;
}

function get_time_generator() {
  return rand_exp(lambda.value);
}
function get_time_processor() {
  return rand_uniform(queue_a.value, queue_b.value);
}

function start_simulation() {
 
  var qlen = Number(q_len.value) | 0;
  var copy_qlen = 0;
  var rcnt = Number(r_cnt.value) | 0;
  var people = [0, 0, 0];
  var tpeople = [0.0, 0.0, 0.0];
  var people_queue = [];
  var computer = 0;
  var tcomputer = 0.0;
  var computer_quae = 0;
  var client1 = 0, client2 = 0, client3 = 0;
  var i = 0;
  var losers = 0;
  var n = 0.1;  
  client1 = 0;
  client2 = 0;
  client3 = 0;
  sdata_a.innerHTML = qlen;
  
  var fus = function(){   
    
    if(i >= rcnt){
        clearInterval(animation);
        result.innerHTML = "Success";
        return 1;
    }
  
    if(client1 - n <= 0){
        if(qlen == 0){
            losers++;
            client1 = get_time_generator();
        }
        else{
            client1 = get_time_generator();
            people_queue.push(client1);
            qlen--;            
        }
    }    
	
	if(client2 - n <= 0){
        if(qlen == 0){
            losers++;
            client2 = get_time_generator();
        }
        else{
            client2 = get_time_generator();
            people_queue.push(client2);
            qlen--;            
        }
    }    
	
	if(client3 - n <= 0){
        if(qlen == 0){
            losers++;
            client3 = get_time_generator();
        }
        else{
            client3 = get_time_generator();
            people_queue.push(client3);
            qlen--;            
        }
    }
    
    if(people_queue.length > 0)
		if(people[0] == 0){
			++people[0];
			tpeople[0] = get_time_processor();	
			client1 = people_queue.shift();
			qlen++;
			sdata_g.innerHTML = "Занято";
		}
	if(people_queue.length > 0)
		if(people[1] == 0){
			++people[1];
			tpeople[1] = get_time_processor();
			client2 = people_queue.shift();
			qlen++;     
			sdata_h.innerHTML = "Занято";            
		}
	if(people_queue.length > 0)
		if(people[2] == 0){
			++people[2];
			tpeople[2] = get_time_processor();
			client3 = people_queue.shift();
			qlen++;		
			sdata_j.innerHTML = "Занято";
		}

    client1 -= n;
    client2 -= n;
    client3 -= n;
    
    
    if(tpeople[0] - n > 0)
        tpeople[0] -= n;
    if(tpeople[1] - n > 0) 
        tpeople[1] -= n;
    if(tpeople[2] - n > 0) 
        tpeople[2] -= n;
    
    if((tpeople[0] - n <= 0)&&(people[0] == 1)){
        people[0] = 0;
        ++computer_quae;
        sdata_g.innerHTML = "Cвободно";
    }
    if((tpeople[1] - n <= 0)&&(people[1] == 1)){
        people[1] = 0;
        ++computer_quae;
        sdata_j.innerHTML = "Свободно";
    }
    if((tpeople[2] - n <= 0)&&(people[2] == 1)){
        people[2] = 0;
        ++computer_quae;
        sdata_h.innerHTML = "Свободно";
    }
    
    if((computer_quae > 0)&&(computer == 0)){
        tcomputer = 15;
        computer = 1;
        --computer_quae;
    }
    
    if(tcomputer - n > 0)
        tcomputer -= n;
    
    if((computer == 1)&&(tcomputer - n <= 0)){
        computer = 0;
        ++i;
    }
    update_sim_data(people_queue, i, losers);
  };
  
  update_sim_data(people_queue, i, losers);
  animation = setInterval(fus, 20);
  
}

function simulate() {
    start_simulation();
	
	result.innerHTML = "Process";
}

document.addEventListener("DOMContentLoaded", init, false);