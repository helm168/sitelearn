(function() {
  var eles = document.querySelectorAll('.js-to-wrap');
  var idx, ln, ele;
  ln = eles.length;
  for(idx = 0; idx < ln; idx++) {
    ele = eles[idx];
    CodeMirror.fromTextArea(ele, {});
  }
})();