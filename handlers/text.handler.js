var text = require('../data/vocabulary').text;
var nsfw = require('../data/vocabulary').nsfw;

module.exports.getText = getText;

function getText(req, res) {
    var numWords, numSentences, numParagraphs;
    var lorem, nsfw;
    req.query.w ? numWords = req.query.w : numWords = 8;
    req.query.s ? numSentences = req.query.s : numSentences = 6;
    req.query.p ? numParagraphs = req.query.p : numParagraphs = 3;
    req.query.lorem ? lorem = req.query.lorem : lorem = 0;
    req.query.nsfw ? nsfw = req.query.nsfw : nsfw = 0;

    var result = compose(numParagraphs, numSentences, numWords, lorem, nsfw);
    res.send(result);    
}

function compose(numParagraphs, numSentences, numWords, lorem, nsfw) {
    var result = [];
    for (var i=0; i<numParagraphs; i++) {
        if (i==0) result.push(composeParagraph(numSentences, numWords, lorem, nsfw));   
        else result.push(composeParagraph(numSentences, numWords, false, nsfw));   
    }
    return result;
}

function composeParagraph(numSentences, numWords, lorem, nsfw) {
     var p = '';
     for (var i=0; i<numSentences; i++) {
        if (i==0) p = p.concat(composeSentence(numWords, lorem, nsfw));
        else p = p.concat(composeSentence(numWords, false, nsfw));
        if (i<numSentences-1)
            p = p.concat(' ');
     }
     return p;
}

function composeSentence(numWords, lorem, nsfw) {
    var s = '';
    for (var i=0; i<numWords; i++) {
        if (i==0) {
            lorem==1 ? s = s.concat('Roremu ipusamu') : s = s.concat(capitalize(randomWord(nsfw)));
        } else
            s = s.concat(randomWord(nsfw));

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

function randomWord(nsfwOn) {
    if (nsfwOn==1) {
        var list = text.concat(nsfw);
        console.log(list)
        var id = Math.floor(Math.random() * list.length);
        return list[id];
    } 
    else {
        var id = Math.floor(Math.random() * text.length);
        return text[id];
    }
}