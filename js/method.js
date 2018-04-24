"use strict";

function main(){
    let kGramms = document.getElementById("deniedKGramms").value;
    let inputText = document.getElementById("inputText").value;
    if (kGramms == null)
        sayOpennedText(100);
    else {
        let listOfKGramms = parseKGrammsToList(kGramms + '\n');
        //printInPageList(listOfKGramms);
        if (inputText != null){
            sayOpennedText(checkForTheOpenness(inputText, listOfKGramms) / inputText.length);
        }
    }
}

/*
    realisation of algorithm KMP
*/
function checkForTheOpenness(inputText, listOfKGramms) {
    let countOfRepeatsAllPatterns = 0;
    for (let i = 0; i < listOfKGramms.length; ++i)
        countOfRepeatsAllPatterns += searchPatternInText(listOfKGramms[i], inputText) * listOfKGramms[i].length;

    return countOfRepeatsAllPatterns;
}

/**
 * @param pattern we search this int the text
 * @param text input text
 * @return count of repeats of pattern int the text
 */
function searchPatternInText(pattern, text){
    let prefFuncPattern = findPrefixFunction(pattern);
    let countOfRepeatsOnePattern = 0;
    let k = 0;
    for (let i = 0; i < text.length; ++i){
        while (pattern[k] != text[i] && k > 0){
            k = prefFuncPattern[k - 1];
        }
        if (pattern[k] == text[i]){
            k++;
            if (k == pattern.length){
                countOfRepeatsOnePattern++;
                k = prefFuncPattern[k - 1];
            }
        }else
            k = 0;
    }
    return countOfRepeatsOnePattern;
}


/**
 * search prefix-function
 * @param text - string
 * @return prefix function
 */
function findPrefixFunction(text){
    var prefFunc = [text.length];
    prefFunc[0] = 0;
    let x = 0;
    for (let i = 1; i < text.length; ++i){
        x = prefFunc[i - 1];
        while (text[x] != text[i] && x > 0){
            x = prefFunc[x - 1];
        }
        if (text[x] == text[i]){
            prefFunc[i] = x + 1;
        }else{
            prefFunc[i] = 0;
        }
    }

    return prefFunc;
}

/*
    take string with k-gramms
    return list of k-gramms
*/
function parseKGrammsToList(kGramms){
    var newLine = "";
    var listOfKGramms = [];
    for (let i = 0; i < kGramms.length; ++i){
        if (kGramms[i] != '\n')
            newLine += kGramms[i];
            else {
                listOfKGramms.push(newLine);
                newLine = "";
            }
    }
    return listOfKGramms;
}

function sayOpennedText(persentage){
    alert("With " + persentage * 100 + "% probability this text is close");
}
