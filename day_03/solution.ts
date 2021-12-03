/* From https://adventofcode.com/2021/day/3 
 Day 3: Binary Diagnostic 
You need to use the binary numbers in the diagnostic report to generate two new binary numbers (called the gamma rate and the epsilon rate). The power consumption can then be found by multiplying the gamma rate by the epsilon rate.
Each bit in the gamma rate can be determined by finding the most common bit in the corresponding position of all numbers in the diagnostic report. For example, given the following diagnostic report:
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010
Considering only the first bit of each number, there are five 0 bits and seven 1 bits. Since the most common bit is 1, the first bit of the gamma rate is 1.
The most common second bit of the numbers in the diagnostic report is 0, so the second bit of the gamma rate is 0.
The most common value of the third, fourth, and fifth bits are 1, 1, and 0, respectively, and so the final three bits of the gamma rate are 110.
So, the gamma rate is the binary number 10110, or 22 in decimal.
The epsilon rate is calculated in a similar way; rather than use the most common bit, the least common bit from each position is used. So, the epsilon rate is 01001, or 9 in decimal. Multiplying the gamma rate (22) by the epsilon rate (9) produces the power consumption, 198.
Use the binary numbers in your diagnostic report to calculate the gamma rate and epsilon rate, then multiply them together. What is the power consumption of the submarine? (Be sure to represent your answer in decimal, not binary.)
*/
import { getPuzzleInput, getEntriesFromInput } from '../tools.ts';
function getListOfBitsFromEntries(entries:string[]):number[][]{
    const list_of_bits = entries.map((entry)=>{
        const bits = entry.split('').map(bit=>parseInt(bit));
        return bits;
    });
    return list_of_bits;
}
function calculateFrequentBits(list_of_bits:number[][], most=true):number[]{
    const tiebreaker_bit = 0;
    let count_ones = list_of_bits[0].map(_bit=>0);
    count_ones = list_of_bits.reduce((count_ones, bits)=>{
        bits.forEach((bit, index)=>{
            count_ones[index] = count_ones[index] + bit;
        });
        return count_ones;
    }, count_ones);
    const half = list_of_bits.length / 2;
    const counts_over_half = count_ones.map(count=>count/half);
    const frequent_bits = counts_over_half.map(count_over_half=>{
        if(count_over_half == 1){ return tiebreaker_bit; }
        else if(count_over_half < 1){ return most? 0 : 1; }
        else{ return most? 1 : 0; }
    });
    return frequent_bits;
}
function convertToDecimal(bits:number[]):number{
    return parseInt(bits.map(bit=>bit.toString()).join(''), 2)
}

function testFirstChallenge(){
    const entries = [
    '00100', '11110', '10110', '10111', '10101', '01111', 
    '00111', '11100', '10000', '11001', '00010', '01010'
    ];
    const list_of_bits = getListOfBitsFromEntries(entries);
    const gamma = calculateFrequentBits(list_of_bits);
    const epsilon = calculateFrequentBits(list_of_bits, false);
    const multiplication =  convertToDecimal(gamma) * convertToDecimal(epsilon);
    return multiplication === 198;
}
async function solveFirstChallenge(){
    const input = await getPuzzleInput();
    if(typeof input === 'boolean'){ return false; }
    const entries = getEntriesFromInput(input);
    const list_of_bits = getListOfBitsFromEntries(entries);
    const gamma = calculateFrequentBits(list_of_bits);
    const epsilon = calculateFrequentBits(list_of_bits, false);
    const multiplication =  convertToDecimal(gamma) * convertToDecimal(epsilon);
    return multiplication;
}
const first_submission = await solveFirstChallenge();
const first_submission_correct = testFirstChallenge();
console.log('submission 1: ', first_submission, first_submission_correct);