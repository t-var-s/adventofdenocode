/* From https://adventofcode.com/2021/day/5 
 Day 5: Hydrothermal Venture 
You come across a field of hydrothermal vents on the ocean floor! These vents constantly produce large, opaque clouds, so it would be best to avoid them if possible.
They tend to form in lines; the submarine helpfully produces a list of nearby lines of vents (your puzzle input) for you to review. For example:
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2

Each line of vents is given as a line segment in the format x1,y1 -> x2,y2 where x1,y1 are the coordinates of one end the line segment and x2,y2 are the coordinates of the other end. These line segments include the points at both ends. In other words:

An entry like 1,1 -> 1,3 covers points 1,1, 1,2, and 1,3.
An entry like 9,7 -> 7,7 covers points 9,7, 8,7, and 7,7.

For now, only consider horizontal and vertical lines: lines where either x1 = x2 or y1 = y2.
So, the horizontal and vertical lines from the above list would produce the following diagram:
.......1..
..1....1..
..1....1..
.......1..
.112111211
..........
..........
..........
..........
222111....

In this diagram, the top left corner is 0,0 and the bottom right corner is 9,9. Each position is shown as the number of lines which cover that point or . if no line covers that point. The top-left pair of 1s, for example, comes from 2,2 -> 2,1; the very bottom row is formed by the overlapping lines 0,9 -> 5,9 and 0,9 -> 2,9.
To avoid the most dangerous areas, you need to determine the number of points where at least two lines overlap. In the above example, this is anywhere in the diagram with a 2 or larger - a total of 5 points.
Consider only horizontal and vertical lines. At how many points do at least two lines overlap?

*/

import { puzzle } from '../puzzle.ts';

interface Vent{ count:number, point:string };

function tracePoints(pair1:string, pair2:string, diagonals=false):string[]{
    const c1 = pair1.split(',').map(point=>parseInt(point));
    const c2 = pair2.split(',').map(point=>parseInt(point));
    if(!diagonals && c1[0] != c2[0] && c1[1] != c2[1]){
        return [];
    }
    const delta = c1.map((v, i) => c2[i] - v);
    const distance = Math.max(...delta.map(v => Math.abs(v)));
    const direction = delta.map(v => v / distance);
    const line = [...Array(distance + 1)]
    .map((_, i) => c1.map((v, j) => v + direction[j] * i));
    const points = line.map(coordinates=>coordinates.join(','));
    return points;
}
function listAllPoints(pairs_of_points:string[][], diagonals=false):string[]{
    const lines = pairs_of_points.reduce((lines, pair_of_points)=>{
        const line = tracePoints(pair_of_points[0], pair_of_points[1], diagonals);
        line.forEach(point=>lines.push(point));
        return lines;
    }, [])
    return lines;
}
function listVents(points:string[]):Vent[]{
    const unique_points = [...new Set(points)];
    const vents = unique_points.map(unique_point=>{
        const vent = { 
            count: points.filter(point=>point==unique_point).length, 
            point: unique_point 
        };
        return vent;
    });
    return vents;
}
function countOverlappingVents(vents:Vent[], above=1):number{
    const overlapping_vents = vents.filter(vent=>vent.count>above);
    return overlapping_vents.length;
}

async function testPart1(input:string){
    const puzzle_input = await puzzle.parseInput(input);
    const pairs_of_points = puzzle_input.blocks[0];
    const all_points = listAllPoints(pairs_of_points);
    const vents = listVents(all_points);
    return countOverlappingVents(vents) == 5;
}
async function solvePart1(){
    const puzzle_input = await puzzle.parseInput();
    const pairs_of_points = puzzle_input.blocks[0];
    const all_points = listAllPoints(pairs_of_points);
    const vents = listVents(all_points);
    return countOverlappingVents(vents);
}
async function testPart2(input:string){
    const puzzle_input = await puzzle.parseInput(input);
    const pairs_of_points = puzzle_input.blocks[0];
    const all_points = listAllPoints(pairs_of_points, true);//accept diagonals
    const vents = listVents(all_points);
    return countOverlappingVents(vents) == 12;
}
async function solvePart2(){
    const puzzle_input = await puzzle.parseInput();
    const pairs_of_points = puzzle_input.blocks[0];
    const all_points = listAllPoints(pairs_of_points, true);//accept diagonals
    const vents = listVents(all_points);
    return countOverlappingVents(vents);
}
const test_input =
`0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2`;

const part1_correct = await testPart1(test_input);
const part1 = await solvePart1();
console.log(',.-~=/* part 1: ', part1, part1_correct);
const part2_correct = await testPart2(test_input);
const part2 = await solvePart2();
console.log(',.-~=/* part 2: ', part2, part2_correct);