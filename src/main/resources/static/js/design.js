$(document).ready(function(){
    //modal_lay
    $("#modal, .modal_close").on('click',function(){
        $("#modal").fadeOut(300);
        $(".modal_wrap").fadeOut(300);
    });
});

//modal_lay
function openModal(modalname){
    document.get
    $("#modal").fadeIn(300);
    $("."+modalname).fadeIn(300);
}