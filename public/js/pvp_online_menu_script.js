
function create_new_online_game() {
  $('.step_1_create_or_select').addClass('hidden');
  $('.step_2_create_game').removeClass('hidden');
};

function select_game_to_join() {
  $('.step_1_create_or_select').addClass('hidden');
  $('.step_2_join_game').removeClass('hidden');
}

function back_to_step_2() {
  $('.step_1_create_or_select').removeClass('hidden');
  $('.step_2_join_game').addClass('hidden');
  $('.step_2_create_game').addClass('hidden');
}
