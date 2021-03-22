
function addStyle(css) { 
      
  head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');

head.appendChild(style);

style.type = 'text/css';
if (style.styleSheet){
  // This is required for IE8 and below.
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}
} 
function createArray(length) {
    var arr = new Array(length || 0), 
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}
var fullStory = false;
var storyArray;
function storySelect(book) {
  try {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {     
          document.getElementById('title').innerHTML   = "";
          document.getElementById('begin').innerHTML   = "";
          document.getElementById('end').innerHTML     = "";
          document.getElementById('content').innerHTML = "";
          document.getElementById('full').innerHTML    = "";
          const story = JSON.parse(this.responseText);
          addStyle(story.css);
          var amtChapters = Object.keys(story.chapters).length; //creates a variable with the amount of chapters there are in a given story
          storyArray = createArray(amtChapters, 4);
          for (var i = 0; i < amtChapters; i++) {
            storyArray[i][0] = story.chapters[i].title;
            storyArray[i][1] = story.chapters[i].note_begin;
            storyArray[i][2] = story.chapters[i].content;
            storyArray[i][3] = story.chapters[i].note_end;
          }
          let selections = [document.getElementById('selector1'), document.getElementById('selector2')];
          for (let i = 0; i < 2; i++) {
            document.getElementById(`${selections[i].id}`).innerHTML = "";
          }
          let none = document.createElement('option');
          none.value = null;
          none.innerHTML = "Select an option";
          selections[0].appendChild(none);
          selections[1].appendChild(none.cloneNode(true));
          for (let i = 0; i < amtChapters; i++) {
            var opt = document.createElement('option');
            opt.value = i;
            opt.innerHTML = `Chapter ${i + 1}${storyArray[i][0] ? ': ' + storyArray[i][0] : ''}`;
            selections[0].appendChild(opt);
            selections[1].appendChild(opt.cloneNode(true));
          }
          if (amtChapters > 1) {
          let full = document.createElement('option');
          full.value = "full";
          full.innerHTML = "Full story";
          selections[0].appendChild(full);
          selections[1].appendChild(full.cloneNode(true));
          }
          document.getElementById('summary').innerHTML = `<hr>${story.summary}<hr>`;
        }
      };
  xhttp.open("GET", `stories/${book}.json`, true);
  xhttp.send();
  }
  catch(err) {
    document.getElementById('content').innerHTML = `${err.name}: ${err.stack}`;
  }
}


function buttonMove(increment) {
  if (document.getElementById('selector1') != "full") {
  maxchap = document.getElementById('selector1').length - 2;
  var selObjectVal = Number(document.getElementById('selector1').value) + increment;
  if (selObjectVal < 0) {selObjectVal = 0;}
  else if (selObjectVal > maxchap) {selObjectVal = maxchap;}
  }
  else {
    selObjectVal = 0;
  }
  document.getElementById('selector1').selectedIndex = selObjectVal + 1;
  document.getElementById('selector2').selectedIndex = selObjectVal + 1;
  selection(document.getElementById('selector1'));
}

function y() {
  if (document.getElementById('password').value == atob(atob(atob(btoa(atob((atob(atob(atob(atob(atob(atob(atob(atob(atob("Vm0wd2QyUXlWa2hWV0doVVYwZG9jRlZ0TVc5V1JteDBaRWhrVlUxV2NEQlVWbHBQVjBaYWMySkVUbGhoTVVwVVZqQmFTMlJIVmtWUmJVWlhWbXhzTTFadGNFSmxSbVJJVm10a1dHSkdjRTlaVjNSR1pVWmtWMXBJY0d4U2JHdzBWMnRvVjJGR1NuUlZiRkpoVmpOU1IxcFZXbXRXTVd0NllVWlNUbFpYZHpCV01uUnZVakZWZVZOcmJGSmhlbXhYV1d4b2IwMHhjRmRYYlhSWFRWaENTbGt3WkRSVk1rcFhVMnR3VjJKSFVYZFdha1phWlZaT2NscEdhR2xTTW1ob1YxWlNTMkl4U2tkalJtUllZbGhTV0ZSV1duZE5SbFowWlVaT1ZXSlZjRWRaTUZwelZqRmFObEZZYUZabGEzQklXWHBHVDJSV1VuUmpSazVwVmpKb2RsWnRNWGRVTWtsNVVtdGtXR0pIVWxsWmEyaERZekZXZEUxV1RrNVNiRm93V2xWak5XRkdXbk5qU0d4WFRWWktSRlpxUVhoa1ZsWjFWMnhhYUdFeGNIbFdWRUpoVkRKT2RGSnJhR2hTYkVwVVZteG9RMWRXV1hoYVJFSmFWakZHTkZZeGFHOVdiVXBJVld4c1dtSkdXbWhXTUZwelkyeHdSMVJ0ZUZkaVIzY3hWMnhXVjFReFdYZE5XRXBYWVdzMVlWUlZXbmRXUmxweFVtMUdWMDFyTlVoV1J6RkhWVEZLVjJORlZsZGlSMUV3VlZSR1lWWnJNVlpXYXpWVFVrVkZOUT09")))))))))))))))) {
    document.getElementById('box').innerHTML = atob('PGhlYWRlcj48aDI+SSBvd24gbm90aGluZyBoZXJlLiBUaGVzZSBhcmUgcmVob3N0ZWQgc3RvcmllcyBmcm9tIG90aGVyIHNpdGVzLjwvaDI+IDxoMj5Vc2UgdGhlIHNlbGVjdGlvbiBib3hlcyB0byBzZWxlY3QgYSBzdG9yeSBhbmQgYSBjaGFwdGVyLjwvaDI+PC9oZWFkZXI+IDxtYWluPjxwPiA8c2VsZWN0IG9uY2hhbmdlPSJzdG9yeVNlbGVjdCh0aGlzLnZhbHVlKSIgaWQ9InN0b3J5U2VsZWN0b3IiPiA8b3B0aW9uIHZhbHVlPSJudWxsIj5Ob25lPC9vcHRpb24+PG9wdGlvbiB2YWx1ZT0iYWlyIj5Bc3Ryb2xvZ3kgaW4gUmV2ZXJzZTwvb3B0aW9uPjxvcHRpb24gdmFsdWU9ImJvdGEiPmJyZWF0aGUgb24gdGhlIGFzaGVzPC9vcHRpb24+IDxvcHRpb24gdmFsdWU9ImVuZGFuZ2VyZWQiPkVuZGFuZ2VyZWQ8L29wdGlvbj48b3B0aW9uIHZhbHVlPSJmaXp6Ij50aGUgZml6emNvdXJzZTwvb3B0aW9uPiA8b3B0aW9uIHZhbHVlPSJsb3NzIj5MaWtlIE9uZSBTdW5kZXJlZCBTdGFyPC9vcHRpb24+IDxvcHRpb24gdmFsdWU9InNsYnRoIj5TaGl0LCBMZXQncyBCZSBUcm9sbCBIZXJvZXM8L29wdGlvbj4gPG9wdGlvbiB2YWx1ZT0iaWl0ZiI+SXJvbnMgSW4gVGhlIEZpcmU8L29wdGlvbj4gPG9wdGlvbiB2YWx1ZT0ib21lbGV0dGUiPk9tZWxldHRlIFJvdXRlPC9vcHRpb24+IDxvcHRpb24gdmFsdWU9InNicyI+U2VhbSBCeSBTZWFtPC9vcHRpb24+IDxvcHRpb24gdmFsdWU9InRuYiI+VGhlIE5lb24gQmlibGU8L29wdGlvbj4gPG9wdGlvbiB2YWx1ZT0idHZnIj5UaGUgVmllbm5hIEdhbWU8L29wdGlvbj4gPC9zZWxlY3Q+PC9wPiA8cCBpZD0ic3VtbWFyeSI+PC9wPiA8c2VsZWN0IG9uY2hhbmdlPSJzZWxlY3Rpb24odGhpcykiIGlkPSdzZWxlY3RvcjEnPiA8b3B0aW9uPlNlbGVjdCBhIHN0b3J5LCBwbGVhc2UhPC9vcHRpb24+IDwvc2VsZWN0PiA8YnV0dG9uIHN0eWxlPSJmbG9hdDogbGVmdDsib25jbGljaz0iYnV0dG9uTW92ZSgtMSkiIGlkPSdiYWNrJz5MYXN0IENoYXB0ZXI8L2J1dHRvbj48YnV0dG9uIHN0eWxlPSJmbG9hdDogcmlnaHQ7IiBvbmNsaWNrPSJidXR0b25Nb3ZlKDEpIiBpZD0nZm9yd2FyZCc+TmV4dCBDaGFwdGVyPC9idXR0b24+IDxociBzdHlsZT0id2lkdGg6IDUwJTsiPiA8c2VjdGlvbiBpZD0id29ya3NraW4iIHN0eWxlPSJ0ZXh0LWFsaWduOiBsZWZ0OyI+IDxwIGlkPSJ0aXRsZSI+PC9wPiA8cCBpZD0iYmVnaW4iID48L3A+IDxwIGlkPSJjb250ZW50IiBzdHlsZT0idGV4dC1hbGlnbjogbGVmdDsiPjwvcD4gPHAgaWQ9ImZ1bGwiPjwvcD4gPHAgaWQ9ImVuZCI+PC9wPiA8L3NlY3Rpb24+IDxociBzdHlsZT0id2lkdGg6IDUwJTsiPiA8c2VsZWN0IG9uY2hhbmdlPSJzZWxlY3Rpb24odGhpcykiIGlkPSdzZWxlY3RvcjInPiA8b3B0aW9uPlNlbGVjdCBhIHN0b3J5LCBwbGVhc2UhPC9vcHRpb24+IDwvc2VsZWN0PiA8YnV0dG9uIHN0eWxlPSJmbG9hdDogbGVmdDsib25jbGljaz0iYnV0dG9uTW92ZSgtMSkiIGlkPSdiYWNrJz5MYXN0IENoYXB0ZXI8L2J1dHRvbj48YnV0dG9uIHN0eWxlPSJmbG9hdDogcmlnaHQ7IiBvbmNsaWNrPSJidXR0b25Nb3ZlKDEpIiBpZD0nZm9yd2FyZCc+TmV4dCBDaGFwdGVyPC9idXR0b24+PC9tYWluPiA8cD48L3A+');
  }
}
function selection(selObject) {
  try {
  selObjectVal = selObject.value;
  if (selObjectVal == "full") {
    document.getElementById('title').style.display = "none";
    document.getElementById('begin').style.display = "none";
    document.getElementById('end').style.display = "none";
    document.getElementById('content').style.display = "none";
    document.getElementById('full').style.display = "block";
    var fullStory = "";
    for (var i = 0; i < storyArray.length; i++) {
      if (storyArray[i][0]) {
        fullStory = fullStory + "<h2>" + storyArray[i][0] + "</h2>";
      } else {
        fullStory = fullStory + '<h2 style="font-family: Western;">' + "Chapter " + (i + 1) + "</h2>";
      }
      if (storyArray[i][1]) {
      fullStory = fullStory +  "<p>" + storyArray[i][1] + "</p>" + "<hr>"; 
      }
      fullStory = fullStory + storyArray[i][2];
      if (storyArray[i][3]) {
        fullStory = fullStory + "<hr>" + "<p>" + storyArray[i][3] + "</p>";
      }
      fullStory = fullStory + "<hr>"
    }
    document.getElementById('full').innerHTML = fullStory;
    selObjectVal = document.getElementById('selector').length - 1;
  }
  else {
    selObjectVal = Number(selObjectVal);
    document.getElementById('title').style.display = "block";
    document.getElementById('begin').style.display = "block";
    document.getElementById('end').style.display = "block";
    document.getElementById('content').style.display = "block";
    document.getElementById('full').style.display = "none";
 
  if (storyArray[selObjectVal][0]) {
    document.getElementById('title').innerHTML = "<h2>" + storyArray[selObjectVal][0] + "</h2>";
  } else {
    document.getElementById('title').innerHTML = "<h2>" + "Chapter " + (selObjectVal + 1) + "</h2>";
  }
  if (storyArray[selObjectVal][1]) {
    document.getElementById('begin').style.display = "block";
    document.getElementById('begin').innerHTML = storyArray[selObjectVal][1] + "<hr>"; 
  }else {
    document.getElementById('begin').style.display = "none";
  }
    document.getElementById('content').innerHTML = storyArray[selObjectVal][2];
  if (storyArray[selObjectVal][3]) {
    document.getElementById('end').style.display = "block";
    document.getElementById('end').innerHTML = "<hr>" + storyArray[selObjectVal][3];
  }else{
    document.getElementById('end').style.display = "none";
  }
  console.log( storyArray[selObjectVal][0]);
  if (storyArray[selObjectVal][0]) {
  window.document.title = storyArray[selObjectVal][0];
  }
  else {
    let str = selObject.children[selObject.selectedIndex].innerHTML;
    window.document.title = str.substr(0, str.length - 2);
  }
  }
  document.getElementById('selector1').scrollIntoView();
  document.getElementById('selector1').selectedIndex = selObjectVal + 1;
  document.getElementById('selector2').selectedIndex = selObjectVal + 1;
  }
  catch(err) {
    document.getElementById('content').innerHTML = `${err.name}: ${err.stack}`;
    console.log(`${err.name}: ${err.message}`);
  }
}