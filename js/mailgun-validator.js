
//Using Mailgun validator: https://github.com/mailgun/validator-demo

// document ready
      $(document).ready(function(){

        // capture all enter and do nothing
        $('#email').focusout(function(e) {
          if(e.which == 13) {
            $('#email').trigger('focusout');
            return false;
          }
        });




        // attach jquery plugin to validate address
        $('#email').mailgun_validator({
          api_key: 'pubkey-7266a37ef78ae1a2b40bf321f0744af0',
          in_progress: validation_in_progress,
          success: validation_success,
          error: validation_error,
        });

      });



      // while the lookup is performing
      function validation_in_progress() {
/*        $('label.email').css("background-image", "url('http://mailgun.github.io/validator-demo/loading.gif')");*/
      }



      // if email successfull validated
      function validation_success(data) {
        $('label.email').css("background-image", "");
        $('#email-status').html(get_suggestion_str(data['is_valid'], data['did_you_mean']));

      }



      // if email is invalid
      function validation_error(error_message) {
        $('#email-status').html(error_message);
        $('label.email').css("background-image", "");
      }



      // suggest a valid email
      function get_suggestion_str(is_valid, alternate) {
        if (is_valid) {
          var result = '';
          $("input#email").parent().removeClass("suggestion")
          if (alternate) {
            result += '<span class="title email-warning">Does this email look correct?</span> <ul><li><input class="email-suggestion" value="' + alternate + '"></li></ul>';

            $("input#email").parent().addClass("suggestion");
                $( "button.submit" ).click(function() {
                  $('.suggestion-prompt').hide().fadeIn(500).css("display", "block");
                });
          }
          return result
        } else if (alternate) {

          return  '<span class="email-warning">Does this email look correct?</span> <ul><li><input class="email-suggestion" value="' + alternate + '"></li></ul>';

            $("input#email").parent().addClass("suggestion");
                $( "button.submit" ).click(function() {
            		    $('.suggestion-prompt').css("display", "block");
                });
          }
        else {
         /* return '<span class="error">Address is invalid.</span>'*/;
         $("input#email").parent().removeClass("suggestion")
        }
      }
