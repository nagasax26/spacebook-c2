var posts = [];
var commentArray = [
    "My 65 year old son rates this shot very delightful :-)",
    "This experience has navigated right into my heart.",
    "Nice use of cornflower blue in this colours!",
    "Fresh work you have here.",
    "Magnificent. I approve the use of layers and typography!",
    "Aquamarine. Everything feels nice.",
    "I think I'm crying. It's that neat.",
    "This is delightful and revolutionary :-)",
    "I want to learn this kind of fold! Teach me.",
    "It's killer not just magical!",
    "Mmh wondering if this comment will hit the generateor as well..."
];

var relatedTarget;
//<input type="checkbox" class="navi-toggle" id="` + id + `">

//function's
// var generateLayout = function () {
//     var id = unikID();
//     var commentLayout =
//         `<div class="comment">
//             <i class="far fa-comment-alt feature_button" data-toggle="modal" data-target="#myModal"></i>
//             <i class="far fa-thumbs-up feature_button"></i>
//             <i class="fas fa-share-alt feature_button"></i>
//         </div>`;
//     return {
//         commentLayout: commentLayout,
//         id: id
//     }
// }

// Math.random should be unique because of its seeding algorithm.
// Convert it to base 36 (numbers + letters), and grab the first 9 characters after the decimal.
var unikID = function () {
    return   Math.random().toString(36).substr(2, 9);
};

//adding new post to array
function newPost() {
    var content = $('#post-name').val();
    var post = {
        content: content,
        id: unikID(),
        comments: []
    };
    posts.push(post);
}

//adding new comment
function newComment(postId) {
    var commentText = $('#comment-text').val();
    var commentUsername = $('#comment-username').val();
    var comment = {
        text: commentText,
        username: commentUsername
    };
    for (i in posts)
        if (posts[i].id === postId)
            posts[i].comments.push(comment);
}

//rendering
function render() {
    newPost();

    $('.posts').empty();

    for (var i = posts.length - 1; i >= 0; i--) {
        // var stored = generateLayout();

        $('.posts').append(`
         <div class="post" data-id="` + posts[i].id + '">' +
            `<div class="container">
                <div class="row">
                    <div class="col-sm-1">
                        <i class="remove fas fa-trash-alt"></i>
                    </div>
                    <div class="col-sm-1">
                        <i class="far fa-comment-alt feature_button" data-toggle="modal" data-target="#myModal"></i>
                    </div>
                    <div class="col-sm-10">
                        <span class="content">` + posts[i].content + `</span>`+ ` 
                    </div>
                </div>
            <div>
         </div>`);
    }
}

function render2() {
    for (var i = 0; i < commentArray.length; i++) {
        var post = {
            content: commentArray[i],
            id: unikID(),
            comments: []
        };
        posts.push(post);
    }

    $('.posts').empty();
    for (var i = posts.length - 1; i >= 0; i--) {
        // var stored = generateLayout();

        // $('.posts').append('<div class="post" data-id="' + posts[i].id + '">' +
        //     '<div class="clearfix"><div class="f-l"><i  class="remove fas fa-trash-alt"></i></div><div class="f-l"><span class="content">' + posts[i].content + "</div></div>" + "</span>" + stored.commentLayout + '</div>');
        $('.posts').append(`
        <div class="post" data-id="` + posts[i].id + '">' +
        `<div class="container">
            <div class="row">
                <div class="col-sm-1">
                    <i class="remove fas fa-trash-alt"></i>
                </div>
                <div class="col-sm-1">
                    <i class="far fa-comment-alt feature_button" data-toggle="modal" data-target="#myModal"></i>
                </div>
                <div class="col-sm-10">
                    <span class="content">` + posts[i].content + `</span>`+ ` 
                </div>
            </div>
        <div>
     </div>`);
    }
}

render2(); //some random data filed for testing purporse only 


//removing post
$('.posts').on('click', '.remove', function () {
    for (var i in posts) {
        if (posts[i].id === $(this).closest('.post').data().id)
            posts.splice(i, 1);
    }

    $(this).closest('.post').remove();
});

$('#form-comment').submit(function(e){
    e.preventDefault();

    var comment = $('#form-input-text').val();

    var id = unikID();

    var commentOBJ = {comment:comment, id:id };
    
    for(var i in posts){
        if(posts[i].id === relatedTarget){
            posts[i].comments.push(commentOBJ);
        }
    }

   renderComments();
    
    

    this.reset();
});


function getCommentsArray(){
    for(var i in posts){
        if(posts[i].id === relatedTarget){
            return posts[i].comments;
        }
    }
}

function renderComments(){
    $('#comments').empty();
    var comments = getCommentsArray()
    for(var i in comments){
        $('#comments').append(
            `<div data-id="`+comments[i].id+'">'+`
                <i class="remove-comment fas fa-times"></i>
                <i class="content">`+comments[i].comment+`
             </div>`
        );
    }
}


$('#myModal').on('show.bs.modal', function (e) {
    console.log(e.relatedTarget) // do something...
    //find the post that the was invoked by the modal
    relatedTarget = $(e.relatedTarget).closest('.post').data().id;
    renderComments();
  })


//render our post to the HTML DOCUMENT
// $('button:contains("Post")').on('click', render);
$('#form-post').submit(function(e){
    e.preventDefault();
    render();
    this.reset();
});


$('#comments').on('click','.remove-comment',function(){
    var id = $(this).closest('div').data().id;
    var comments = getCommentsArray();

    for(var i in comments){
        if(comments[i].id === id){
            comments.splice(i,1);
        }
    }

    $(this).closest('div').remove();
})