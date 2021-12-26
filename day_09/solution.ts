/* From https://adventofcode.com/2021/day/9 
 Day 9: Smoke Basin 
These caves seem to be lava tubes. Parts are even still volcanically active; small hydrothermal vents release smoke into the caves that slowly settles like rain.
If you can model how the smoke flows through the caves, you might be able to avoid it and be that much safer. The submarine generates a heightmap of the floor of the nearby caves for you (your puzzle input).
Smoke flows to the lowest point of the area it's in. For example, consider the following heightmap:
2199943210
3987894921
9856789892
8767896789
9899965678

Each number corresponds to the height of a particular location, where 9 is the highest and 0 is the lowest a location can be.
Your first goal is to find the low points - the locations that are lower than any of its adjacent locations. Most locations have four adjacent locations (up, down, left, and right); locations on the edge or corner of the map have three or two adjacent locations, respectively. (Diagonal locations do not count as adjacent.)
In the above example, there are four low points, all highlighted: two are in the first row (a 1 and a 0), one is in the third row (a 5), and one is in the bottom row (also a 5). All other locations on the heightmap have some lower adjacent location, and so are not low points.
The risk level of a low point is 1 plus its height. In the above example, the risk levels of the low points are 2, 1, 6, and 6. The sum of the risk levels of all low points in the heightmap is therefore 15.
Find all of the low points on your heightmap. What is the sum of the risk levels of all low points on your heightmap?

*/

import { log, logList, intval } from "../tools.ts";
import { puzzle } from '../puzzle.ts';

class Grid{
    entries:number[][] = []
    points:{ [key:string]:any }[][] = []
    low_points: { [key:string]:any }[] = []
    constructor(entries:string[][]){
        this.populatePoints(entries);
        this.findLowPoints();
    }
    n(entries:number[][], from_y:number, from_x:number):number{
        return from_y > 0 ? entries[from_y-1][from_x] : 99; 
    }
    s(entries:number[][], from_y:number, from_x:number):number{
        return from_y < entries.length - 1 ? entries[from_y+1][from_x] : 99; 
    }
    e(entries:number[][], from_y:number, from_x:number):number{
        return from_x < entries[0].length - 1 ? entries[from_y][from_x+1] : 99; 
    }
    w(entries:number[][], from_y:number, from_x:number):number{
        return from_x > 0 ? entries[from_y][from_x-1] : 99; 
    }
    populatePoints(entries:string[][]){
        this.entries = entries.reduce((entries, entry)=>{
            entries.push(entry[0].split('').map(intval));
            return entries;
        }, this.entries)
        for(let y=0; y<this.entries.length; y++){ 
            this.points.push([]);
            for(let x=0; x<this.entries[0].length; x++){ 
                this.points[y].push([]);
                this.points[y][x] = { 
                    y: y, x: x, 
                    value: this.entries[y][x], 
                    // n: 99, s: 99, e: 99, w: 99,
                    basin:{}
                };
            }
        }
    }
    findLowPoints(){
        for(let y=0; y<this.entries.length; y++){ 
            for(let x=0; x<this.entries[0].length; x++){ 
                const lower_directions = [this.n, this.s, this.w, this.e]
                .filter((direction)=>{
                    return (direction(this.entries, y, x) <= this.points[y][x].value);
                });
                if(lower_directions.length == 0){
                    this.points[y][x].basin.size = 1;
                    this.points[y][x].basin.center = { y: y, x: x };
                    this.low_points.push(this.points[y][x]);
                }
            }
        }
    }
    measureBasins(){
        this.low_points = this.low_points.map(this.exploreBasin);
    }
    exploreBasin(point:{ [key:string]:any }){
        if(point.basin.explored){ 
            return this.points[point.basin.source.y][point.basin.source.x]; 
        }
        const where_to = ['n', 's', 'e', 'w'].filter(direction => point[direction] < 9);
        if(where_to.length === 0){ return point; }
        return this.points[point.basin.source.y][point.basin.source.x]; 
    }
}

const findAnswers = (entries:string[][]) =>{
    const answers:{ [key:string]:any } = { 
        sum_low_risk_levels: 0 
    };
    const grid = new Grid(entries);
    answers.sum_low_risk_levels = grid.low_points
    .reduce((sum, point)=>sum+point.value, grid.low_points.length);
    answers.grid = grid;
    return answers;
}
const testPart1 = async (input:string):Promise<boolean> =>{
    const puzzle_input = await puzzle.parseInput(input);
    const answers = findAnswers(puzzle_input.blocks[0]);
    return answers.sum_low_risk_levels === 15;
}
const solvePart1 = async ():Promise<number> =>{
    const puzzle_input = await puzzle.parseInput();
    const answers = findAnswers(puzzle_input.blocks[0]);
    return answers.sum_low_risk_levels;
}
const testPart2 = async (input:string):Promise<boolean> =>{
    const puzzle_input = await puzzle.parseInput(input);

    return false;
}
const solvePart2 = async ():Promise<number> =>{
    const puzzle_input = await puzzle.parseInput();

    return 2;
}
const test_input = 
`2199943210
3987894921
9856789892
8767896789
9899965678`;

const part1_correct = await testPart1(test_input);
const part1 = await solvePart1();
log('    part 1: ', part1, part1_correct);
// const part2_correct = await testPart2(test_input);
// const part2 = await solvePart2();
// log('    part 2: ', part2, part2_correct);
