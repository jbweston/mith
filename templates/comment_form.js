
$(document).ready(function() {
	function generateMailToLink()
	{
        var email = '{{PELICAN_COMMENT_SYSTEM_EMAIL}}'
		var subject = 'Comment for \'{{ article.slug }}\'' ;

		var d = new Date();
		var body = ''
			+ 'date: ' + d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + '\n'
			+ 'author: ' + $("#commentForm_inputName").val() + '\n';

		var replyto = $('#commentForm_replyto').val();
		if (replyto.length != 0)
		{
			body += 'replyto: ' + replyto + '\n'
		}

		body += '\n'
			+ $("#commentForm_inputText").val() + '\n'

		var link = 'mailto:' + email + '?subject='
			+ encodeURIComponent(subject)
			+ "&body="
			+ encodeURIComponent(body);
		return link;
	}



    // set up unobtrusive javascript
    // activate reply links in comments
    $('.comment-reply-link').show().on("click",
        function( event )
        {
            that = $(this) ;
            var link = decodeURIComponent(that.attr('slug')) ;
            var author = that.attr('author') ;
            $('#commentForm_replyto').val(link) ;  // set hidden form field
            $('#comment-reply-link').attr('href', '#comment-'+link) ;
            $('#comment-reply-link').text(author) ;
            $('#comment-reply-field').show() ;  // show "replying to" text
        }
    ) ;
    // set stop reply click action
    $('#comment-stop-reply').on("click",
        function ( event )
        {
            event.preventDefault() ;
            $('#commentForm_replyto').val(null) ; // unset hidden form field
            $('#comment-reply-field').hide() ;  // show "replying to" text
        }
    ) ;
    // show form div
    $('#comment-form-js').show() ;
    // set form submit action
	$('#commentForm').on("submit",
		function( event )
		{
			event.preventDefault();
			$(location).attr('href', generateMailToLink());
		}
	);

});
