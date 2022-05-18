import path from "path";
import { readFileSync, writeFileSync } from "fs";
const __dirname = path.resolve();

const fileReader = (fileName) => {
    let data = readFileSync(path.join(__dirname, `./Data/${fileName}`));
    data = data.toString();
    data = JSON.parse(data);
    return data;
};

const fileWriter = (fileName, dataToWrite) => {
    writeFileSync(path.join(__dirname, `./Data/${fileName}`), JSON.stringify(dataToWrite, null, "\t"));
};

const makeid = () => {
    var text = "";
    var possible = "0123456789abcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 15; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
};

function getDigit(number)
{
if (number < 9)
    return number;
return Math.floor(number / 10) + number % 10;
}
 
// Return the number of digits in d
function getSize(d)
{
let num = d.toString();
return num.length;
}
 
// Return the first k number of digits from
// number. If the number of digits in number
// is less than k, return number.
function getPrefix(number,k)
{
if (getSize(number) > k)
{
    let num = number.toString();
    return parseInt(num.substring(0, k));
}
return number;
}
 
// Return true if the digit d is a prefix for number
function prefixMatched(number,d)
{
return getPrefix(number, getSize(d)) == d;
}
 
// Get the result from Step 2
function sumOfDoubleEvenPlace(number)
{
let sum = 0;
let num = number.toString() ;
for (let i = getSize(number) - 2; i >= 0; i -= 2)
    sum += getDigit((num.charCodeAt(i) - '0'.charCodeAt(0)) * 2);
 
return sum;
}
 
// Return sum of odd-place digits in number
function sumOfOddPlace(number)
{
let sum = 0;
let num = number.toString();
for (let i = getSize(number) - 1; i >= 0; i -= 2)
    sum += num.charCodeAt(i) - '0'.charCodeAt(0);
return sum;
}
 
// Return true if the card number is valid
function isValid(number)
{
return (getSize(number) >= 13 &&
        getSize(number) <= 16) &&
    (prefixMatched(number, 4) ||
    prefixMatched(number, 5) ||
    prefixMatched(number, 37) ||
    prefixMatched(number, 6)) &&
    ((sumOfDoubleEvenPlace(number) +
    sumOfOddPlace(number)) % 10 == 0);
}

export const cardChecker = (req, res) => {
    const cardData = req.body;
    let response = {
        id: makeid(),
        result : false,
        url : "https://ik.imagekit.io/arunishshekhar/3c5a73ecb7e5b92a5614bf63d2abd0b0_lDaPygHRN_.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1652888833180"
    }
    if (isValid(cardData["number"]*1))
    {
        res.send({...response, result: true,
        url: "https://ik.imagekit.io/arunishshekhar/ba7_FgyN84opE.jpg?ik-sdk-version=javascript-1.4.3&updatedAt=1652888997757"})
    }
    else {
        res.send(response)
    }

}
