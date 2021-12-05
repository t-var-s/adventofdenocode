/* From https://adventofcode.com/2021/day/4 
 Day 4: Giant Squid 
You're already almost 1.5km (almost a mile) below the surface of the ocean, already so deep that you can't see any sunlight. What you can see, however, is a giant squid that has attached itself to the outside of your submarine.
Maybe it wants to play bingo?
Bingo is played on a set of boards each consisting of a 5x5 grid of numbers. Numbers are chosen at random, and the chosen number is marked on all boards on which it appears. (Numbers may not appear on all boards.) If all numbers in any row or any column of a board are marked, that board wins. (Diagonals don't count.)
The submarine has a bingo subsystem to help passengers (currently, you and the giant squid) pass the time. It automatically generates a random order in which to draw numbers and a random set of boards (your puzzle input). For example:
7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7

After the first five numbers are drawn (7, 4, 9, 5, and 11), there are no winners, but the boards are marked as follows (shown here adjacent to each other to save space):
22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
 8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
 6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
 1 12 20 15 19        14 21 16 12  6         2  0 12  3  7

After the next six numbers are drawn (17, 23, 2, 0, 14, and 21), there are still no winners:
22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
 8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
 6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
 1 12 20 15 19        14 21 16 12  6         2  0 12  3  7

Finally, 24 is drawn:
22 13 17 11  0         3 15  0  2 22        14 21 17 24  4
 8  2 23  4 24         9 18 13 17  5        10 16 15  9 19
21  9 14 16  7        19  8  7 25 23        18  8 23 26 20
 6 10  3 18  5        20 11 10 24  4        22 11 13  6  5
 1 12 20 15 19        14 21 16 12  6         2  0 12  3  7

At this point, the third board wins because it has at least one complete row or column of marked numbers (in this case, the entire top row is marked: 14 21 17 24  4).
The score of the winning board can now be calculated. Start by finding the sum of all unmarked numbers on that board; in this case, the sum is 188. Then, multiply that sum by the number that was just called when the board won, 24, to get the final score, 188 * 24 = 4512.
To guarantee victory against the giant squid, figure out which board will win first. What will your final score be if you choose that board?

*/

import { puzzle } from '../puzzle.ts';

interface Bingo{ winning_board: number[][], last_draw: number }

function getBingo(draws:string[], boards:string[][][], first=true):Bingo{
    const bingo:Bingo = { winning_board:[], last_draw: 0 };
    draws.forEach(draw=>{
        if(first && bingo.winning_board.length > 0){ return true; }
        if(boards.length == 0){ return true; }
        bingo.last_draw = parseInt(draw);
        boards = boards.map(board=>markBoard(board, draw));
        const game = findWinnerAndLoosers(boards);
        bingo.winning_board = game.winner
        boards = game.loosers;
    })
    return bingo;
}
function markBoard(board:string[][], draw:string):string[][]{
    board = board.map(line=>{
        line = line.map(value => value == draw ? 'X' : value )
        return line;
    });
    return board;
}
function findWinnerAndLoosers(boards:string[][][]){
    const loosing_boards:string[][][] = [];
    const winning_boards = boards.filter(board=>{
        const x_rows = Array(board.length);
        const x_columns = Array(board.length);
        board.forEach((line, row)=>{
            line.forEach((value, column)=>{
                if(value == 'X'){
                    if(x_rows[row]){ x_rows[row] ++; }          
                    else{ x_rows[row] = 1; }
                    if(x_columns[column]){ x_columns[column] ++; }          
                    else{ x_columns[column] = 1; }
                }
            });
        });
        const winning_rows = x_rows.filter(r=>r==board.length)
        const winning_columns = x_columns.filter(c=>c==board.length)
        const win = (winning_rows.length > 0 || winning_columns.length > 0);
        if(!win){ loosing_boards.push(board); }
        return win;
    });
    let winning_board:number[][] = [];
    if(winning_boards.length > 0){
        winning_board = winning_boards[0].map(line=>line.map(value=>{
            return value == 'X' ? 0 : parseInt(value);
        }));
    }
    return {winner: winning_board, loosers: loosing_boards};
}
function scoreBingo(bingo:Bingo):number{
    const score = bingo.winning_board.reduce((score, line)=>{
        score = line.reduce((score, number)=> score + number, score);
        return score;
    }, 0);
    return score * bingo.last_draw;
}

async function testPart1(input:string){
    const puzzle_input = await puzzle.parseInput(input);
    const first_block = puzzle_input.blocks.shift();
    if(first_block === undefined){ return false; }
    const bingo = getBingo(first_block[0], puzzle_input.blocks);
    const score = scoreBingo(bingo);
    return score === 4512;
}
async function solvePart1(){
    const puzzle_input = await puzzle.parseInput();
    const first_block = puzzle_input.blocks.shift();
    if(first_block === undefined){ return false; }
    const bingo = getBingo(first_block[0], puzzle_input.blocks);
    const score = scoreBingo(bingo);
    return score;
}
async function testPart2(input:string){
    const puzzle_input = await puzzle.parseInput(input);
    const first_block = puzzle_input.blocks.shift();
    if(first_block === undefined){ return false; }
    const bingo = getBingo(first_block[0], puzzle_input.blocks, false);
    const score = scoreBingo(bingo);
    return score === 1924;
}
async function solvePart2(){
    const puzzle_input = await puzzle.parseInput();
    const first_block = puzzle_input.blocks.shift();
    if(first_block === undefined){ return false; }
    const bingo = getBingo(first_block[0], puzzle_input.blocks, false);
    const score = scoreBingo(bingo);
    return score;
}
const test_input = 
`7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

const part1_correct = await testPart1(test_input);
const part1 = await solvePart1();
console.log(',.-~=/* part 1: ', part1, part1_correct);
const part2_correct = await testPart2(test_input);
const part2 = await solvePart2();
console.log(',.-~=/* part 2: ', part2, part2_correct);