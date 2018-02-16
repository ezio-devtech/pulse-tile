import $ from 'jquery';

export function removeTags(targetId){
  // Bind remove events
  $(`#${targetId}`).find('a.remove').each(function(){
    // Remove binding is already assigned
    $(this).unbind('click');

    // Re-bind
    $(this).click(function(){
      $(this).closest('span').remove();

      // Store Structured
      setStructured(targetId);
    });
  });

}

export function setStructured(targetId, cb){
  // Parse the text box for all tags
  const tags = [];
  const target = $(`#${targetId}`);

  target.contents().each(function(){
    let newTag;
    if( $(this).hasClass('tag') ){

      const editable = $(this).find('.editable');
      if( $(editable).length > 0 ){
        // Contains structured data
        newTag = {
          id: $(this).attr('data-id'),
          value: editable.html()
        }
      } else {
        // Just a typed phrase
        newTag = {
          id: $(this).attr('data-id')
        }
      }

      // Found in array
      const found = false;

      if( !found ){
        tags.push(newTag);
      }
    } else   {
      // It's text
      const newTag = {
        phrase: this.wholeText
      };

      tags.push(newTag);
    }
  });

  //Update the structured box for output
  $( '#' + target.attr('data-structured') ).val( JSON.stringify(tags) );
  $('#plain-data').val( strip(target.html(), cb) );
}

function setCaret(el, focus) {
  const range = document.createRange();
  const sel = window.getSelection();
  range.setStart(focus.node, focus.offset);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
  el.focus();
}

// Credit: http://stackoverflow.com/questions/6690752/insert-html-at-caret-in-a-contenteditable-div
export function pasteHtmlAtCaret(html, targetId, focus) {
  const parentNode = document.getElementById(targetId);
  const lastChildNode = parentNode.lastChild;
  const insertNodeBlock = document.getElementById("temp");
  // SG: Switch focus to target before inserting
  parentNode.focus();

  let sel, range;
  /* istanbul ignore if  */
  if (window.getSelection) {
    // IE9 and non-IE
    if (focus.offset && focus.node) {
      setCaret(parentNode, focus);
    }
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();

      // Range.createContextualFragment() would be useful here but is
      // only relatively recently standardized and is not supported in
      // some browsers (IE9, for one)
      let el = document.createElement("div");
      el.innerHTML = html + ' ';
      let frag = document.createDocumentFragment(), node, lastNode;
      while ( (node = el.firstChild) ) {
        lastNode = frag.appendChild(node);
      }

      if (sel.focusOffset === 0 && lastChildNode) {
        range.selectNode(insertNodeBlock);
      }

      range.insertNode(frag);

      // Preserve the selection
      if (lastNode) {
        range = range.cloneRange();
        range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  } else if (document.selection && document.selection.type !== "Control") {
    // IE < 9
    document.selection.createRange().pasteHTML(html);
  }
}

export function strip (html, cb) {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  const resultText = tmp.textContent||tmp.innerText;

  if (typeof cb === 'function') {
    cb(tmp.innerHTML);
  }

  return tmp.textContent||tmp.innerText;

}