
function create_new_online_game() {
  $('.step_1_create_or_select').addClass('hidden');
  $('.step_2_create_game').removeClass('hidden');
};

function select_game_to_join() {
  $('.step_1_create_or_select').addClass('hidden');
  $('.step_2_join_game').removeClass('hidden');
};

function back_to_step_2() {
  $('.step_1_create_or_select').removeClass('hidden');
  $('.step_2_join_game').addClass('hidden');
  $('.step_2_create_game').addClass('hidden');
};

function create_game_step_3() {
  //create a room and join it.
  socket.emit('create', $('.new_group_name').val());
};

function select_game_to_join_step_3() {
  // join existing room
  socket.emit('join_room', $('.join_group_name').val());
};
