async function loadPosts() {
  let urlBase = 'https://jsonplaceholder.typicode.com';
  var newsFeed = document.getElementById('newsFeed');

  let posts = await fetchPosts(urlBase);
  let users = await fetchUsers(urlBase);

  for (i=0; i<posts.length/4; i++){

    var userId = posts[i].userId;
    var id = posts[i].id;
    var title = posts[i].title;
    var content = posts[i].body;


    newsFeed.innerHTML += '<div class="box">' +
                            '<div class="box-user" >' +
                              '<img class="rounded-img" src="images/avatar.png"/>' +
                              '<span class="username">' +
                                users[userId - 1].username +
                              '</span>'+
                            '</div>' +
                            '<div class="box-title">' +
                              title  +
                            '</div>' +
                            '<div class="box-body">' +
                              content +
                            '</div>' +
                            '<div class="box-comments" id="commentSection' + id + '">' +
                            '</div>'+
                          '</div>'
    fetchComments(id);
  }

}

async function fetchUsers(urlBase){
  let url = urlBase + '/users';
  let response = await fetch(url);

  if(response.ok){
    let results = await response.json();
    return results;
  }else{
    return "Error";
  }
}

async function fetchPosts(urlBase){
  let url = urlBase + '/posts';
  let response = await fetch(url);

  if(response.ok){
    let results = await response.json();
    return results;
  }else{
    return "Error";
  }
}

async function fetchComments(postId){
  let url = 'https://jsonplaceholder.typicode.com/comments?postId='+ postId;
  let response = await fetch(url);
  var commentSection = document.getElementById('commentSection' + postId);

  if(response.ok){
    let results = await response.json();
    for (i=0; i<results.length; i++){
      comment = results[i].name;

      commentSection.innerHTML += '<div class="comments">' +
                                    comment +
                                  '</div>';
    }
  }
}
