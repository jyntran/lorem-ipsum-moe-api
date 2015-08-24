var text = require('../data/vocabulary');

module.exports.getText = getText;

function getText(req, res) {
    var numWords, numSentences, numParagraphs;
    req.query.w ? numWords = req.query.w : numWords = 8;
    req.query.s ? numSentences = req.query.s : numSentences = 6;
    req.query.p ? numParagraphs = req.query.p : numParagraphs = 3;
    req.query.lorem ? lorem = req.query.lorem : lorem = 0;

    var result = compose(numParagraphs, numSentences, numWords, lorem);
    res.send(result);    
}

function compose(numParagraphs, numSentences, numWords, lorem) {
    var result = [];
    for (var i=0; i<numParagraphs; i++) {
        if (i==0) result.push(composeParagraph(numSentences, numWords, lorem));   
        else result.push(composeParagraph(numSentences, numWords, false));   
    }
    return result;
}

function composeParagraph(numSentences, numWords, lorem) {
     var p = '';
     for (var i=0; i<numSentences; i++) {
        if (i==0) p = p.concat(composeSentence(numWords, lorem));
        else p = p.concat(composeSentence(numWords, false));
        if (i<numSentences-1)
            p = p.concat(' ');
     }
     return p;
}

function composeSentence(numWords, lorem) {
    var s = '';
    for (var i=0; i<numWords; i++) {
        if (i==0) {
            lorem ? s = s.concat('Roremu ipusamu') : s = s.concat(capitalize(randomWord()));
        } else
            s = s.concat(randomWord());

        if (i==numWords-1)
            s = s.concat('.');
        else
            s = s.concat(' ');
    }
    return s;
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function randomWord() {
    var id = Math.floor(Math.random() * text.length);
    return text[id];
}