
function visualize() {
    // get the body element
    var body = document.querySelector('body');
    // check the existence of class svg-container, if it exists, remove it.
    // avoid plot the same thing at each click
    const svgElement = document.getElementById("svg-container");
    if (svgElement) {
      svgElement.remove();
    }
    // create a container element to hold the SVG plots
    var svgContainer = document.createElement('div');
    svgContainer.setAttribute("id", "svg-container");
    svgContainer.style.display = 'flex';
    svgContainer.style.flexDirection = 'column';

    // create an array of svg plots for each sentence
    const input = document.getElementById("input-box").value;
    const sentences = input.trim().split("\n\n");
    const sentenceSVGOptions = dependencytreejs.defaultSentenceSVGOptions();
    // you can set it as true to enable drag arrow (not working)
    sentenceSVGOptions.interactive = false; 
    sentenceSVGOptions.tokenSpacing = 100;
    sentenceSVGOptions.arcHeight = 40;
    sentenceSVGOptions.featuresHorizontalSpacing = 25;
    
    // create the SVG object
    for(let i = 0; i < sentences.length; i++){
      const tr = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      const reactiveSentence = new dependencytreejs.ReactiveSentence();
      
      // replace multiple consecutive whitespaces with tab
      if (/ {2,}|\t{2,}/.test(sentences[i])) {
        sentences[i] = sentences[i].replace(/ {2,}|\t{2,}/g, '\t');
      }
      // read conll data into reactiveSentence
      reactiveSentence.fromSentenceConll(sentences[i]);
      console.log(reactiveSentence);
      // build svg object from reactiveSentence
      const sentenceSVG = new dependencytreejs.SentenceSVG(
          tr, reactiveSentence, sentenceSVGOptions
          );

      // create a wrapper element to hold the SVG plot
      var wrapper = document.createElement('div');

      // adjust this value to set the space between svg plots
      wrapper.style.marginBottom = '-700px';
      wrapper.appendChild(tr);
      // append the wrapper to the container
      svgContainer.appendChild(wrapper);
    }
    // append the container to the body
    body.appendChild(svgContainer);
}
