var result = null;

//文字追加ボタン
$(".button-add").on('click', function(){
  textAdd(String($(this).data('value')));
});

//ACボタン
$(".button-cut").on('click', function(){
  textDelete();
});

//平方根を求めるボタン
$(".button-sqrt").on('click', function(){
  calcsqrt();
  $(".result").val(result);
});

//10進数に変換ボタン
$(".button-to10").on('click', function(){
  calc10();
  $(".result").val(result);
});

//16進数に変換ボタン
$(".button-to16").on('click', function(){
  calc16();
  $(".result").val(result);
});

//計算実行
$(".button-calc").on('click', function(){
  calc();
  $(".result").val(result);
});

//保持・不保持ボタン
$('.button-toggle').on('click',function(){
  toggleSave();
});

//テーマ変更ボタン
$('.button-theme').on('click',function(){
  themeChange();
});

//コピーボダン
$(".button-copy").on('click', function(){
  $('.result').select();
  document.execCommand("Copy");
  statusAdd("COPIED");
});



//計算保持・不保持のトグル
//押されたいる→保持
//押されたいる→不保持
var resultSave = false;
function toggleSave() {
  if (resultSave == false) {
    resultSave = true;
    $('.button-toggleoff').addClass('button-toggleon').removeClass('button-toggleoff');
    console.log("resultSave = true");
  } else {
    resultSave = false;
    $('.button-toggleon').addClass('button-toggleoff').removeClass('button-toggleon');
    console.log("resultSave = false");
  }

}

//キー入力操作
$(document).on('keydown',function() {
  if(event.keyCode == 229 || event.keyCode == 13){ // Enter or Space
    calc();
    $(".result").val(result);　//計算実行
  } else if (event.keyCode == 74) {
    toggleSave(); //保存・不保持切り替え
  } else if (event.keyCode == 186 || event.keyCode == 106) { // *
    textAdd('×');
  } else if (event.keyCode == 191 || event.keyCode == 111) { // /
    textAdd('÷');
  } else if (event.keyCode == 110) { // .(テンキー)
    textAdd('.');
  } else if (
    event.keyCode >= 48 && 57 >= event.keyCode // 数字キー 0~9
    || event.keyCode >= 65 && 70 >= event.keyCode // A=F
    || event.key == '.' // .
    || event.key == '-' // -
    || event.key == '+' // -
    || event.key == '#' // #
    //以下テンキー用
    || event.keyCode >= 96 && 105 >= event.keyCode
  ) {
    textAdd(event.key);
  } else if (event.keyCode == 8 || event.keyCode == 46) { // Del or BackSpace
    textDelete()
  } else {
    return false;
  }
});

//表示内容削除
function textDelete(){
  $(".result").val("");
  addCount = 0;
}

//テーマ切り替え
 var themeNumber = 1;
function themeChange(){
  if (themeNumber == 1) {
    themeNumber = 2;
    $('body link').attr('href', 'theme2.css');
    statusAdd("THEME CHANGED TO 2");
    console.log("themeNumber = 2");
    document.cookie = String("Syu6sDentakuTheme.aStsL4U692xyGLVDEsPc=2; expires=Thu, 21 Mar 2019 12:00:00 GMT");
  } else {
    themeNumber = 1;
    $('body link').attr('href', 'theme1.css');
    statusAdd("THEME CHANGED TO 1");
    console.log("themeNumber = 1");
  }
  return true;
}

//文字入力
var addCount = 0;
function textAdd(resultAddText){
  if (addCount <= 12) {
    if (result != null) {
      if (resultSave == false) {
        textDelete();
        statusAdd("READY (DON'T SAVE RESULT)");
      } else {
        statusAdd("READY (SAVE RESULT)");
      }
      result = null;;
    }
    var resultBeforeAdd = String($('.result').val());
    $(".result").val(resultBeforeAdd + resultAddText);
    addCount++;
  }
}

//ステータス用変数
function statusAdd(statusAddText){
  $(".status").text(statusAddText);
}

//エスケープなど
let deleteText = ['/&/g','/</g','/>/g','/"/g',"/'/g"];
var resultAfterOrganize;
function organizer(){
  var resultBeforeOrganize = $('.result').val();
  resultAfterOrganize = resultBeforeOrganize
    .replace(deleteText.map, '')
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/１/g, '1')
    .replace(/２/g, '2')
    .replace(/３/g, '3')
    .replace(/４/g, '4')
    .replace(/５/g, '5')
    .replace(/６/g, '6')
    .replace(/７/g, '7')
    .replace(/８/g, '8')
    .replace(/９/g, '9')
    .replace(/０/g, '0');
}

//計算【通常】
function calc(){
  organizer();
  console.log(resultAfterOrganize);
  try {
    result = (new Function("return " + resultAfterOrganize))();
    statusAdd('COMPLETE');
  } catch (error) {
    result = "";
    statusAdd('ERROR');
  }
  console.log(result);
  addCount = 0;
  return result;
}

//計算【平方根を求める】
function calcsqrt(){
  organizer();
  console.log(resultAfterOrganize);
  try {
    result = Math.sqrt(Number(resultAfterOrganize));
    statusAdd('COMPLETE');
  } catch (error) {
    result = "";
    statusAdd('ERROR');
  }
  console.log(result);
  addCount = 0;
  return result;
}

//計算【16進数に変換】
function calc16() {
  organizer();
  console.log(resultAfterOrganize);
  try {
    result = Number(resultAfterOrganize).toString(16);
    statusAdd('COMPLETE');
  } catch (error) {
    result = "";
    statusAdd('ERROR');
  }
  console.log(result);
  addCount = 0;
  return result;
}

//計算【10進数に変換】
function calc10() {
  organizer();
  resultAfterOrganize = '0x' + String(resultAfterOrganize);
  console.log(resultAfterOrganize);
  try {
    result = parseInt(resultAfterOrganize, 16);
    statusAdd('COMPLETE');
  } catch (error) {
    result = "";
    statusAdd('ERROR');
  }
  console.log(result);
  addCount = 0;
  return result;
}
