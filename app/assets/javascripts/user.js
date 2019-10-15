$(document).on('turbolinks:load', function(){

  var search_list = $("#user-search-result");
  var member_list = $("#member_append");

  function appendUsers(user){
      var html = 
        `<div class="chat-group-user clearfix">
          <p class="chat-group-user__name">${user.name}</p>
            <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
        </div>`;
        search_list.append(html);
  }

  function appendMembers(name, user_id) {
      var html =
      `<div class="chat-group-user clearfix">
          <input name="group[user_ids][]" type="hidden" value="${user_id}">
          <p class=‘chat-group-user__name’>${ name }</p>
          <a class=user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn 削除</a>
        </div>`;
          member_list.append(html);
  }

  function appendErrMsgToHTML(msg){
      var html = 
          `<div class="chat-group-user clearfix">
              <p class="chat-group-user__name">${msg}</p>
          </div>`;
          search_list.append(html);
  }
  $('#user-search-field').on('keyup', function(e){
  var input = $("#user-search-field").val();

  $.ajax({
      type: 'GET',
      url:  '/users',
      data: { keyword: input },
      dataType: 'json'
  })

  .done(function(users){

      if (input.length === 0) {
          $('#user-search-result').empty();
        }

      else if (input.length !== 0){
          $('#user-search-result').empty();
          users.forEach(function(user){
              appendUsers(user)
          });
      }

      else {
          $('#user-search-result').empty();
          appendErrMsgToHTML("一致するユーザーが見つかりません");
      }
  })

  .fail(function() {
      alert('ユーザー検索に失敗しました');
  });
  });
  
  $(document).on("click", '.user-search-add', function () {
    console.log("ok")
      var name = $(this).data("user-name");
      var user_id = $(this).data("user-id");
      $(this).parent().remove();
      //appendUsers(name, user_id);
      console.log(name)
      appendMembers(name,user_id);

    });
})
