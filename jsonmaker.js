// Your code goes here


// if error it's not:
// the function calling
// /g for replacing all " with \"

function returnJSON(chapter) {
  var title = chapter.slice(chapter.indexOf('Chapter'));
  var title = title.slice(title.indexOf('</a>') + 6, title.indexOf('</h3>') - 1);
  title = title.replace(/\r?\n|\r/g, "");
  title = title.trim();
  title = title.replace(/\\/g, '\\');
  title = title.replace(/"/g, '\\"');
  if (chapter.indexOf('class="notes module"') != -1) {
    var begin_notes = chapter.slice(chapter.indexOf('class="notes module"') + 21, chapter.indexOf('<!--main content-->') - 35);
    begin_notes = begin_notes.replace(/\r?\n|\r/g, "");
    begin_notes = begin_notes.trim();
    begin_notes = begin_notes.replace(/\\/g, '\\');
    begin_notes = begin_notes.replace(/"/g, '\\"');
    if (begin_notes.indexOf("/works/") != -1) {
      var update = begin_notes.slice(begin_notes.indexOf("/works/"), begin_notes.lastIndexOf('#chapter'));
      var jump = begin_notes.slice(begin_notes.lastIndexOf("#chapter") + 1, begin_notes.lastIndexOf('">') - 1);
      begin_notes = begin_notes.replace(update, "");
    }
  }
  else {var begin_notes = ''}
  content = chapter.substr(chapter.indexOf('Chapter Text</h3>') + 17, chapter.indexOf("<!--/main-->") - (chapter.indexOf('Chapter Text</h3>') + 26)); 
  content = content.replace(/\r?\n|\r/g, "");
  content = content.replace(/\\/g, '\\');
  content = content.replace(/"/g, '\\"');
  var checkForEnd = chapter.slice(chapter.lastIndexOf("<!--/main-->"), chapter.length);
  if (checkForEnd.lastIndexOf('role="complementary') != -1) {
    var end_notes = chapter.slice(chapter.lastIndexOf('role="complementary"') + 21, chapter.lastIndexOf('<!-- end of cache -->') - 33);
    if (jump != undefined) {
      end_notes = end_notes.replace('class="heading"', 'class="heading" id="' + jump + '"');
    }
    end_notes = end_notes.replace(/\r?\n|\r/g, "");
    end_notes = end_notes.trim();
    end_notes = end_notes.replace(/\\/g, '\\');
    end_notes = end_notes.replace(/"/g, '\\"');
  }
  else {var end_notes = '';}
  var json = `{"title": "${title}", "note_begin": "${begin_notes}","content": "${content}","note_end": "${end_notes}"}`;
  return json;
}
function nthIndex(str, pat, n){
    var L= str.length, i= -1;
    while(n-- && i++<L){
        i= str.indexOf(pat, i);
        if (i < 0) break;
    }
    return i;
}
function changeChapter(num) {
  current = Number(document.getElementById('change').innerHTML);
  current += num;
  if (current < 0) {current = 0;}
  document.getElementById('change').innerHTML = current;
}

function convert(chapter) {
  
  var html = document.getElementById('takefrom').value;
  if (html.indexOf('<style type="text/css">') != -1) {
  var css = html.slice(html.indexOf('<style type="text/css">') + 23, html.lastIndexOf('</style>') - 1);
  
  css = css.replace(/\r?\n|\r/g, "");
  css = css.trim();
  css = css.replace(/\\/g, '\\');
  css = css.replace(/"/g, '\\"');
  }
  else {
    css = "";
  }
  let summary = html.slice(html.indexOf('<div class="summary module" role="complementary">') + 49, html.indexOf('</blockquote>') + 13);
  summary = summary.replace(/\r?\n|\r/g, "");
  summary = summary.trim();
  summary = summary.replace(/\\/g, '\\');
  summary = summary.replace(/"/g, '\\"');
  let json = `{ "css": "${css}", "summary": "${summary}", "chapters": [`;
  html = html.slice(html.indexOf("<!-- This partial requires local variable 'chapter' -->"), html.indexOf("<!-- END work -->"));
  if (chapter > 0) {
    json = returnJSON(html.slice(nthIndex(html, "<!-- This partial requires local variable 'chapter' -->", chapter), nthIndex(html, "<!-- end of cache -->", chapter)));
    if (chapter != (html.match(/<!-- This partial requires local variable 'chapter' -->/g) || []).length) {
      json += ",";
    }
    else {json += "]}"}
  }
  return json;

}

function metaConvert() {
  var chapters = document.getElementById('takefrom').value;
  amtChapters = (chapters.match(/<h3 class="title">/g) || []).length;
  var returnValue = "";
  for (let i = 0; i <= amtChapters; i++) {
    returnValue += convert(i);
  }
  if (amtChapters == 0) {
    returnValue += `${returnJSON(chapters.slice(chapters.indexOf('<!-- BEGIN section where work skin applies -->') + '<!-- BEGIN section where work skin applies -->'.length, chapters.indexOf('<!-- END work -->')))}]}`;
  }
  document.getElementById('puthere').value = returnValue;
  document.getElementById('puthere').select()
  document.execCommand('copy')
}
/*
html = html.slice(nthIndex(html, '<div class="chapter preface group" role="complementary">', chapter));*/