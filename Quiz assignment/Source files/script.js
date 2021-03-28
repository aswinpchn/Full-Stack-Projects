console.log('Log');

let current_page = 'login.html';
let math_score = 0
let reading_score = 0
let audio_score = 0

changeFrame = (frame) => {
  $('#myFrame').attr("src", frame);
}

$(document).ready(function(){
  console.log('Document loaded');
  $("#myFrame").attr("src", current_page);

  
  $('#myFrame').load(function(){

    var iframe = $('#myFrame').contents();

    iframe.find("#login_button").click(() =>{
      changeFrame('one.html');
    });

    iframe.find("#one_button_submit").click(() =>{
      if (iframe.find('input:checked')[0].id == 'flexRadioDefault1') {
        math_score ++;
      }
      changeFrame('two.html');
    });

    iframe.find("#one_button_clear").click(() =>{
      iframe.find('input:checked').removeAttr('checked');
    });

    iframe.find("#two_button_submit").click(() =>{
      if (iframe.find('input:checked')[0].id == 'flexRadioDefault1') {
        math_score ++;
      }
      changeFrame('three.html');
    });

    iframe.find("#two_button_clear").click(() =>{
      iframe.find('input:checked').removeAttr('checked');
    });

    iframe.find("#three_button_submit").click(() =>{
      if (iframe.find('input:checked')[0].id == 'flexRadioDefault1' && iframe.find('input:checked')[1].id == 'flexRadioDefault5') {
        reading_score ++;
      }
      changeFrame('four.html');
    });

    iframe.find("#three_button_clear").click(() =>{
      iframe.find('input:checked').removeAttr('checked');
    });

    iframe.find("#four_button_submit").click(() =>{
      if (iframe.find('input:checked')[0].id == 'flexRadioDefault1') {
        audio_score ++;
      }

      changeFrame('survey.html');
    });

    iframe.find("#four_button_clear").click(() =>{
      iframe.find('input:checked').removeAttr('checked');
    });

    iframe.find("#survery_button_submit").click(() =>{
      changeFrame('summary.html');

      setTimeout(() => {
        iframe = $('#myFrame').contents();
        console.log(iframe.find('#math'));
        iframe.find('#math').append('Number of questions correct:' + math_score)
        iframe.find('#reading').append('Number of questions correct:' + reading_score)
        iframe.find('#audio').append('Number of questions correct:' + audio_score)
      }, 2000)
    });

  });

});
