/* From https://adventofcode.com/2021/day/8 
 Day 8: Seven Segment Search 
You barely reach the safety of the cave when the whale smashes into the cave mouth, collapsing it. Sensors indicate another exit to this cave at a much greater depth, so you have no choice but to press on.
As your submarine slowly makes its way through the cave system, you notice that the four-digit seven-segment displays in your submarine are malfunctioning; they must have been damaged during the escape. You'll be in a lot of trouble without them, so you'd better figure out what's wrong.
Each digit of a seven-segment display is rendered by turning on or off any of seven segments named a through g:
  0:      1:      2:      3:      4:
 aaaa    ....    aaaa    aaaa    ....
b    c  .    c  .    c  .    c  b    c
b    c  .    c  .    c  .    c  b    c
 ....    ....    dddd    dddd    dddd
e    f  .    f  e    .  .    f  .    f
e    f  .    f  e    .  .    f  .    f
 gggg    ....    gggg    gggg    ....

  5:      6:      7:      8:      9:
 aaaa    aaaa    aaaa    aaaa    aaaa
b    .  b    .  .    c  b    c  b    c
b    .  b    .  .    c  b    c  b    c
 dddd    dddd    ....    dddd    dddd
.    f  e    f  .    f  e    f  .    f
.    f  e    f  .    f  e    f  .    f
 gggg    gggg    ....    gggg    gggg

So, to render a 1, only segments c and f would be turned on; the rest would be off. To render a 7, only segments a, c, and f would be turned on.
The problem is that the signals which control the segments have been mixed up on each display. The submarine is still trying to display numbers by producing output on signal wires a through g, but those wires are connected to segments randomly. Worse, the wire/segment connections are mixed up separately for each four-digit display! (All of the digits within a display use the same connections, though.)
So, you might know that only signal wires b and g are turned on, but that doesn't mean segments b and g are turned on: the only digit that uses two segments is 1, so it must mean segments c and f are meant to be on. With just that information, you still can't tell which wire (b/g) goes to which segment (c/f). For that, you'll need to collect more information.
For each display, you watch the changing signals for a while, make a note of all ten unique signal patterns you see, and then write down a single four digit output value (your puzzle input). Using the signal patterns, you should be able to work out which pattern corresponds to which digit.
For example, here is what you might see in a single entry in your notes:
acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab |
cdfeb fcadb cdfeb cdbaf
(The entry is wrapped here to two lines so it fits; in your notes, it will all be on a single line.)
Each entry consists of ten unique signal patterns, a | delimiter, and finally the four digit output value. Within an entry, the same wire/segment connections are used (but you don't know what the connections actually are). The unique signal patterns correspond to the ten different ways the submarine tries to render a digit using the current wire/segment connections. Because 7 is the only digit that uses three segments, dab in the above example means that to render a 7, signal lines d, a, and b are on. Because 4 is the only digit that uses four segments, eafb means that to render a 4, signal lines e, a, f, and b are on.
Using this information, you should be able to work out which combination of signal wires corresponds to each of the ten digits. Then, you can decode the four digit output value. Unfortunately, in the above example, all of the digits in the output value (cdfeb fcadb cdfeb cdbaf) use five segments and are more difficult to deduce.
For now, focus on the easy digits. Consider this larger example:
be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb |
fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec |
fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef |
cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega |
efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga |
gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf |
gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf |
cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd |
ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg |
gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc |
fgae cfgab fg bagce

Because the digits 1, 4, 7, and 8 each use a unique number of segments, you should be able to tell which combinations of signals correspond to those digits. Counting only digits in the output values (the part after | on each line), in the above example, there are 26 instances of digits that use a unique number of segments (highlighted above).
In the output values, how many times do digits 1, 4, 7, or 8 appear?

*/

import { log } from "../tools.ts";
import { puzzle } from '../puzzle.ts';

class Digits{
     standard:{ [key:number]:any } = {
        0: 'abcefg',
        1: 'cf',
        2: 'acdeg',
        3: 'acdfg',
        4: 'bcdf',
        5: 'abdfg',
        6: 'abdefg',
        7: 'acf',
        8: 'abcdefg',
        9: 'abcdfg'
    };
    entry_numbers: string[]
    entry_display: string[]
    displayed_number = 0
    numbers:{ [key:string]:number[] } = {}
    unique_numbers:{ [key:string]:number } = {}
    solvers:{ [key:number]:string } = {}
    constructor(entry:string[]){
        this.initializeStandard();
        this.entry_numbers = entry[0].split(' ').map(m=>m.split('').sort().join(''));
        this.entry_display = entry[1].split(' ').map(m=>m.split('').sort().join(''));
        this.entry_numbers.forEach(entry_number=>{
            for(let d=0; d<=9; d++){
                if(this.standard[d].count == entry_number.length){
                    this.numbers[entry_number] = this.standard[d].same_count;
                }
            }
        });
        this.unique_numbers = this.findUniqueNumbers();
        this.applyVisualLogic();
        this.decodeDisplay();
    }
    initializeStandard(){
        for(let d=0; d<=9; d++){
            const letters = this.standard[d].split('');
            this.standard[d] = { 
                letters: this.standard[d], count: letters.length, same_count: [d] 
            };
        }
        for(let d=0; d<=9; d++){
            for(let t=0; t<=9; t++){
                if(t != d && this.standard[t].count == this.standard[d].count){
                    this.standard[d].same_count.push(t);
                }
            }
        }
    }
    findUniqueNumbers(){
        const unique_numbers = Object.keys(this.numbers)
        .filter(letters=>this.numbers[letters].length==1)
        .reduce((unique_numbers:{ [key:string]:number }, unique_letter)=>{
            unique_numbers[unique_letter] = this.numbers[unique_letter][0];
            return unique_numbers;
        }, {});
        Object.keys(unique_numbers).forEach(key=>{
            this.solvers[unique_numbers[key]] = key;
        })
        return unique_numbers;
    }
    filterWrongNumbers(target_numbers:number[], target_letters:string[]){
        Object.keys(this.numbers).forEach(letters=>{
            this.numbers[letters] = this.numbers[letters].filter(number=>{
                if(target_numbers.indexOf(number) === -1){ return true; }
                const matching_target = target_letters
                .filter(target_letter=>letters.indexOf(target_letter)>-1);
                return matching_target.length == target_letters.length;
            })
        })
    }
    filterNewlySolvedNumbers(){
        const newly_solved_letters = Object.keys(this.numbers).filter(letters=>{
            return this.numbers[letters].length == 1 && !this.unique_numbers[letters];
        })
        Object.keys(this.numbers).forEach(letters=>{
            if(this.numbers[letters].length == 1){ return false; }
            this.numbers[letters] = this.numbers[letters].filter(number=>{
                const matching_solved = newly_solved_letters.filter(solved_letter=>{
                    return number == this.numbers[solved_letter][0];
                })
                return matching_solved.length === 0;
            });
        });
    }
    applyVisualLogic(){
        //find the two letters that 4 has and 1 doesn't
        const bd_letters = this.solvers[4].split('')
        .filter(letter=>this.solvers[1].indexOf(letter)===-1);
        //find 5s, 6s and 9s that don't have both the bd letters and remove them
        this.filterWrongNumbers([5, 6, 9], bd_letters);
        //find 0s, 3s, and 9s that don't have all the letters of 7 and remove them
        this.filterWrongNumbers([0, 3, 9], this.solvers[7].split(''));
        //find 9s that don't have all the letters of 4 and remove them
        this.filterWrongNumbers([9], this.solvers[4].split(''));
        //remove numbers that are now already solved and repeated
        this.filterNewlySolvedNumbers();
        this.filterNewlySolvedNumbers();
    }
    decodeDisplay(){
        const decoded_display = this.entry_display.reduce((decoded_display, letters)=>{
            return decoded_display += this.numbers[letters][0];
        }, '')
        this.displayed_number = parseInt(decoded_display);
    }
}

const findAnswers = (entries:string[][]) =>{
    const answers = { count_unique_numbers: 0, output_values_sum: 0 };
    entries.forEach(entry=>{
        const digits = new Digits(entry);
        answers.count_unique_numbers += digits.entry_display
        .filter(displayed_letters=>digits.unique_numbers[displayed_letters])
        .length;
        answers.output_values_sum += digits.displayed_number;
    });
    return answers;
}

const testPart1 = async (input:string):Promise<boolean> =>{
    const puzzle_input = await puzzle.parseInput(input);
    const answers = findAnswers(puzzle_input.blocks[0]);
    return answers.count_unique_numbers == 26;
}
const solvePart1 = async ():Promise<number> =>{
    const puzzle_input = await puzzle.parseInput();
    const answers = findAnswers(puzzle_input.blocks[0]);
    return answers.count_unique_numbers;
}
const testPart2 = async (input:string):Promise<boolean> =>{
    const puzzle_input = await puzzle.parseInput(input);
    const answers = findAnswers(puzzle_input.blocks[0]);
    return answers.output_values_sum == 61229;
}
const solvePart2 = async ():Promise<number> =>{
    const puzzle_input = await puzzle.parseInput();
    const answers = findAnswers(puzzle_input.blocks[0]);
    return answers.output_values_sum;
}
const test_input = 
`be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb | fdgacbe cefdb cefbgd gcbe
edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec | fcgedb cgb dgebacf gc
fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef | cg cg fdcagb cbg
fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega | efabcd cedba gadfec cb
aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga | gecf egdcabf bgf bfgea
fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf | gebdcfa ecba ca fadegcb
dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf | cefg dcbef fcge gbcadfe
bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd | ed bcgafe cdgba cbgef
egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg | gbdfcae bgc cg cgb
gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc | fgae cfgab fg bagce`;

const part1_correct = await testPart1(test_input);
const part1 = await solvePart1();
log('   part 1: ', part1, part1_correct);
const part2_correct = await testPart2(test_input);
const part2 = await solvePart2();
log('   part 2: ', part2, part2_correct);