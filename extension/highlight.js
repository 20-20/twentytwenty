
$(() => {
  $('html').mouseup(() => getSelectionText())

  function getSelectionText() {
    let text = "";
    if (window.getSelection) {
       text = window.getSelection().toString(); // string generation
    } else if (document.selection && document.selection.type != "Control") {
       text = document.selection.createRange().text;
    }
    const parentEl = window.getSelection().anchorNode.parentElement
    let innerHTML = parentEl.innerHTML
    console.log("parent inner html:", innerHTML)
    const index = innerHTML.indexOf(text);
    console.log("index", index)
    if (index >= 0) {
      parentEl.innerHTML =
        innerHTML.substring(0, index) +
        "<span class='highlight'>" +
        innerHTML.substring(index, index+text.length) +
        "</span>" +
        innerHTML.substring(index + text.length)
      console.log("ner inner html:", parentEl.innerHTML)
    }
    // $(`${parentEl}`).addClass("highlight")


    console.log("parent node AFTER:", parentEl)
    return text;
  }

})



