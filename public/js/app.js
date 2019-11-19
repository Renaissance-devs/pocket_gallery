$('.select-button').on('click', function() {
  $(this).next().removeClass('hide-me');
});

if($('.gallery-select :selected').val() === 'new_gallery'){
  $('input[name="gallery"]').prop('disabled', true);
  $('#createGallery').removeClass('hide-me');
}

if($('.gallery-select :selected').val() === !'new_gallery'){
  $('input[name="gallery"]').prop('disabled', false);
  $('#createGallery').addClass('hide-me');
}
