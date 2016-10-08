var text = require('../data/vocabulary').text;
var nsfw = require('../data/vocabulary').nsfw;

module.exports.getText = getText;

function getText(req, res) {
    var query = processQuery(req.query);
    var result = compose(query.p, query.s, query.w, query.lorem, query.nsfw, query.format);
    res.send(result);    
}

function processQuery(query){
    var result = {};
    query.w ? result.w = query.w : result.w = 8;
    query.s ? result.s = query.s : result.s = 6;
    query.p ? result.p = query.p : result.p = 3;
    query.lorem == "true" ? result.lorem = true : result.lorem = false;
    query.nsfw == "true" ? result.nsfw = true : result.nsfw = false;
    query.format ? result.format = query.format : result.format = "json";
    return result;
}

function compose(numParagraphs, numSentences, numWords, lorem, nsfw, format) {
    var result;
    if (format == "text" || format == "html") {
	result = '';
        for (var i=0; i<numParagraphs; i++) {
            format == "text" ? result = result.concat('') : result = result.concat('<p>');
            if (i==0) result = result.concat(composeParagraph(numSentences, numWords, lorem, nsfw));   
            else result = result.concat(composeParagraph(numSentences, numWords, false, nsfw));   
            format == "text" ? result = result.concat('\n\n') : result = result.concat('</p>');
        }        
    } else {
        result = [];
        for (var i=0; i<numParagraphs; i++) {
            if (i==0) result.push(composeParagraph(numSentences, numWords, lorem, nsfw));   
            else result.push(composeParagraph(numSentences, numWords, false, nsfw));   
        }
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
            lorem ? s = s.concat('Roremu ipusamu') : s = s.concat(capitalize(randomWord(nsfw)));
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
    if (nsfwOn) {
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
