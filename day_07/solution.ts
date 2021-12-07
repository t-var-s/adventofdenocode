/* From https://adventofcode.com/2021/day/7 
 Day 7: The Treachery of Whales 
A giant whale has decided your submarine is its next meal, and it's much faster than you are. There's nowhere to run!
Suddenly, a swarm of crabs (each in its own tiny submarine - it's too deep for them otherwise) zooms in to rescue you! They seem to be preparing to blast a hole in the ocean floor; sensors indicate a massive underground cave system just beyond where they're aiming!
The crab submarines all need to be aligned before they'll have enough power to blast a large enough hole for your submarine to get through. However, it doesn't look like they'll be aligned before the whale catches you! Maybe you can help?
There's one major catch - crab submarines can only move horizontally.
You quickly make a list of the horizontal position of each crab (your puzzle input). Crab submarines have limited fuel, so you need to find a way to make all of their horizontal positions match while requiring them to spend as little fuel as possible.
For example, consider the following horizontal positions:
16,1,2,0,4,2,7,1,2,14
This means there's a crab with horizontal position 16, a crab with horizontal position 1, and so on.
Each change of 1 step in horizontal position of a single crab costs 1 fuel. You could choose any horizontal position to align them all on, but the one that costs the least fuel is horizontal position 2:

Move from 16 to 2: 14 fuel
Move from 1 to 2: 1 fuel
Move from 2 to 2: 0 fuel
Move from 0 to 2: 2 fuel
Move from 4 to 2: 2 fuel
Move from 2 to 2: 0 fuel
Move from 7 to 2: 5 fuel
Move from 1 to 2: 1 fuel
Move from 2 to 2: 0 fuel
Move from 14 to 2: 12 fuel

This costs a total of 37 fuel. This is the cheapest possible outcome; more expensive outcomes include aligning at position 1 (41 fuel), position 3 (39 fuel), or position 10 (71 fuel).
Determine the horizontal position that the crabs can align to using the least fuel possible. How much fuel must they spend to align to that position?

*/

import { log, logList, intval } from "../tools.ts";
import { puzzle } from '../puzzle.ts';

interface Crabs{
    left:number[], 
    right:number[],
    from_position:number,
    max_position:number,
}

const parseCrabs = (data:string[]):Crabs =>{
    const crabs:Crabs = { 
        left: [0], right: [], from_position: 0, max_position: 0
    };
    const positions = data.map(intval);
    crabs.max_position = positions.reduce((length, position)=>{
        if(position > length){ length = position }
        return length;
    }, 0);
    for(let c=0; c<=crabs.max_position; c++){ crabs.right[c] = 0; }
    positions.forEach(position=>crabs.right[position]++);
    return crabs;
}
const shiftFromPosition = (crabs:Crabs):Crabs =>{
    const shift = crabs.right.shift();
    if(shift === undefined){ return crabs; }
    crabs.left.shift();
    crabs.left.unshift(0, shift);
    crabs.from_position ++;
    return crabs;
}
const totalFuel = (crabs:Crabs):number =>{
    let fuel = crabs.left.reduce((fuel, count, index)=>fuel+(count*index), 0);
    fuel = crabs.right.reduce((fuel, count, index)=>fuel+(count*index), fuel);
    return fuel;
}
const findLeastFuel = (crabs:Crabs) =>{
    const least = { fuel:0, position: 0 }
    least.fuel = totalFuel(crabs);
    log(0, least.fuel);
    for(let position = 1; position <= crabs.max_position; position ++){
        crabs = shiftFromPosition(crabs);
        const current_fuel = totalFuel(crabs);
        log(position, current_fuel);
        if(current_fuel < least.fuel){ 
            least.fuel = current_fuel; 
            least.position = position; 
        }
    }
    return least;
}

const testPart1 = async (input:string):Promise<boolean> =>{
    const puzzle_input = await puzzle.parseInput(input);
    const crabs = parseCrabs(puzzle_input.blocks[0][0]);
    const least = findLeastFuel(crabs);
    return least.position === 2;
}
const solvePart1 = async ():Promise<number> =>{
    const puzzle_input = await puzzle.parseInput();
    const crabs = parseCrabs(puzzle_input.blocks[0][0]);
    log(crabs);
    return 1;
    const least = findLeastFuel(crabs);
    return least.position;
}
const testPart2 = async (input:string):Promise<boolean> =>{
    const puzzle_input = await puzzle.parseInput(input);

    return false;
}
const solvePart2 = async ():Promise<number> =>{
    const puzzle_input = await puzzle.parseInput();

    return 2;
}
const test_input = `16,1,2,0,4,2,7,1,2,14`;

const part1_correct = await testPart1(test_input);
const part1 = await solvePart1();
log(',.-~=/* part 1: ', part1, part1_correct);
const part2_correct = await testPart2(test_input);
const part2 = await solvePart2();
log(',.-~=/* part 2: ', part2, part2_correct);
