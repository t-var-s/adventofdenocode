/* From https://adventofcode.com/2021/day/2 
 Day 2: Dive! 
forward X increases the horizontal position by X units.
down X increases the depth by X units.
up X decreases the depth by X units.
The submarine seems to already have a planned course (your puzzle input). You should probably figure out where it's going. For example:
forward 5
down 5
forward 8
up 3
down 8
forward 2
Your horizontal position and depth both start at 0. The steps above would then modify them as follows:
forward 5 adds 5 to your horizontal position, a total of 5.
down 5 adds 5 to your depth, resulting in a value of 5.
forward 8 adds 8 to your horizontal position, a total of 13.
up 3 decreases your depth by 3, resulting in a value of 2.
down 8 adds 8 to your depth, resulting in a value of 10.
forward 2 adds 2 to your horizontal position, a total of 15.
After following these instructions, you would have a horizontal position of 15 and a depth of 10. (Multiplying these together produces 150.)
Calculate the horizontal position and depth you would have after following the planned course. What do you get if you multiply your final horizontal position by your final depth?
*/
import { getPuzzleInput, getEntriesFromInput } from "../tools.ts";
interface Instruction{ direction:string, units:number }
function getInstructionFromEntry(entry:string):Instruction{
    const entry_arguments = entry.split(' ');
    if(entry_arguments.length !== 2){ return {direction: 'forward', units: 0}; }
    const direction = entry_arguments[0];
    const units = parseInt(entry_arguments[1]);
    const instruction = { direction: direction, units: units };
    return instruction;
}
async function getInstructions(entries?:string[]):Promise<Instruction[]|boolean>{
    if(entries){
        return entries.map(getInstructionFromEntry).filter(f=>f);
    }
    const input_text = await getPuzzleInput();
    if(typeof input_text === 'boolean'){ return false; }
    const input_entries = getEntriesFromInput(input_text);
    return input_entries.map(getInstructionFromEntry);
}
function getTravelFromInstructions(instructions:Instruction[]){
    let travel = { horizontal_position:0, depth:0 };
    travel = instructions.reduce((travel, i)=>{
        switch(i.direction){
            case 'forward': travel.horizontal_position += i.units; break;
            case 'down': travel.depth += i.units; break;
            case 'up': travel.depth -= i.units; break;
        }
        return travel
    }, travel);
    return travel;
}
function getCorrectedTravelFromInstructions(instructions:Instruction[]){
    let travel = { horizontal_position:0, depth:0, aim:0 };
    travel = instructions.reduce((travel, i)=>{
        switch(i.direction){
            case 'down': travel.aim += i.units; break;
            case 'up': travel.aim -= i.units; break;
            case 'forward': 
            travel.horizontal_position += i.units; 
            travel.depth += (travel.aim * i.units); 
            break;
        }
        return travel
    }, travel);
    return travel;
}
async function testFirstChallenge(){
    const entries = [ 'forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2' ];
    const instructions = await getInstructions(entries);
    if(typeof instructions === 'boolean'){ return false; }
    const travel = getTravelFromInstructions(instructions);
    if(typeof travel === 'boolean'){ return false; }
    const multiplication = travel.horizontal_position * travel.depth;
    return multiplication === 150;
}
async function solveFirstChallenge(){
    const instructions = await getInstructions();
    if(typeof instructions === 'boolean'){ return false; }
    const travel = getTravelFromInstructions(instructions);
    if(typeof travel === 'boolean'){ return false; }
    const multiplication = travel.horizontal_position * travel.depth;
    return multiplication;
}
async function testSecondChallenge(){
    const entries = [ 'forward 5', 'down 5', 'forward 8', 'up 3', 'down 8', 'forward 2' ];
    const instructions = await getInstructions(entries);
    if(typeof instructions === 'boolean'){ return false; }
    const travel = getCorrectedTravelFromInstructions(instructions);
    if(typeof travel === 'boolean'){ return false; }
    const multiplication = travel.horizontal_position * travel.depth;
    return multiplication === 900;
}
async function solveSecondChallenge(){
    const instructions = await getInstructions();
    if(typeof instructions === 'boolean'){ return false; }
    const travel = getCorrectedTravelFromInstructions(instructions);
    if(typeof travel === 'boolean'){ return false; }
    const multiplication = travel.horizontal_position * travel.depth;
    return multiplication;
}
const first_submission_correct = await testFirstChallenge();
const first_submission = await solveFirstChallenge();
console.log('submission 1: ', first_submission, first_submission_correct);
const second_submission_correct = await testSecondChallenge();
const second_submission = await solveSecondChallenge();
console.log('submission 2: ', second_submission, second_submission_correct);