const sharedStyleSheet = `
  .interactive > .FORM,
  .interactive > .LEMMA,
  .interactive > .UPOS,
  .interactive > .DEPREL {
    cursor: pointer;
  }
  
  .FORM {
    font-size: 25px;
    z-index: 99;
  }
  
  .LEMMA {
    font-size: 20px;
    font-style: italic;
  }
  
  .UPOS, .XPOS {
    font: 20px DejaVu Sans;
  }
  
  .XPOS {
      font-style: italic;
      font-size: 20px;
  }
  
  
  .DEPREL {
    font: 20px Arial;
    font-family: sans-serif;
    z-index: 99;
  }
  
  .FEATS, .MISC {
    font-size: 15px;
  }
  
  .glossy {
    font-style: italic;
  }
  
  .arrowhead {
    stroke-width: 0.8;
  }
  
  .curve {
    stroke-width: 1.1;
    fill: none;
    z-index: 0;
  }
  
  .dragcurve {
    stroke-width: 2;
    fill: none;
  }
    `;

const lightStylesheet =
  sharedStyleSheet +
  `
    .FORM, .LEMMA {
      fill: black;
    }
    .UPOS, .DEPREL {
      fill: #4a0984;;
    }
    .FEATS, .MISC, .XPOS {
      fill: #b352ac;
    }
    .UPOS.diff,
    .DEPREL.diff {
      fill: red;
    }
    .arrowhead {
      fill: white;
    }
    .arrowhead, .curve {
      stroke: black;
    }
    .arrowhead.diff, .curve.diff {
      stroke: red;
    }
    .dragcurve, .dragarrowhead {
      stroke: #ffb424;
    }
    .glossy {
      fill: #ffb424;
    }
 `;


// Creates the style element
function createStyleElement(id, content) {
  const style = document.createElement('style');
  style.id = id;
  if (style.sheet) {
    style.sheet.insertRule(content);
  } else {
    style.appendChild(document.createTextNode(content));
  }
  return style;
}

/**
 * Appends CSS content to the head of the site for dependencytreejs
 * @param stylesheet css stylesheet rules string with normal css syntax
 * @param force set to `true` you want to overwrite current dependencytreejs stylesheet
 */
function setStyleSheet(stylesheet, force) {
  const id = 'dependencytreejs-stylesheet';
  // remove current dependencytreejs style sheet if exist
  const dependencytreeStylesheet = document.getElementById(id);
  if (dependencytreeStylesheet !== null && dependencytreeStylesheet.parentElement !== null && force) {
    dependencytreeStylesheet.parentElement.removeChild(dependencytreeStylesheet);
  }
  const head = document.head || document.getElementsByTagName('head')[0];
  head.appendChild(createStyleElement(id, stylesheet));
}



// set the stylesheet for dependency tree
dependencytreejs.setStyleSheet(lightStylesheet, true);