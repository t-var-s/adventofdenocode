/* From https://adventofcode.com/2021/day/1 
 Day 1: Sonar Sweep 
To do this, count the number of times a depth measurement increases from the previous measurement. (There is no measurement before the first measurement.) In the example above, the changes are as follows:
199 (N/A - no previous measurement)
200 (increased) 1
208 (increased) 2
210 (increased) 3
200 (decreased)
207 (increased) 4
240 (increased) 5
269 (increased) 6
260 (decreased) 
263 (increased) 7
In this example, there are 7 measurements that are larger than the previous measurement.

Puzzle Input:
https://adventofcode.com/2021/day/1/input
*/
async function getPuzzleInput(url:string, refresh=false){
    console.log(url + ' <==');
    const input_filepath = './input.txt';
    async function download(){
        const session_cookie = '';//TODO automate this
        try{
            const res = await fetch(url, { headers:{ Cookie: session_cookie } });
            const text = await res.text();
            await Deno.writeTextFile(input_filepath, text);
            return text;
        }catch(error){ console.error(error); return false;}
    }
    try{ 
        const saved_text = await Deno.readTextFile(input_filepath); 
        if(!refresh){ return saved_text; }
        return await download();
    }catch(error){
        console.log(error);
        return await download();
    }
}
function getEntriesFromInput(input:string):number[]{
    return input.split('\n').map(entry=>parseInt(entry));
}
function countIncreases(entries:number[]){
/*     const count = entries.reduce((count, entry, index)=>{
        if(index == 0){ return count; }
        count = entry > entries[index - 1] ? count + 1 : count;
        return count;
    }, 0);  */
    const count = entries.filter((entry, index)=>{
        if(index == 0){ return false; }
        return entry > entries[index - 1];
    }).length;
    return count;
}
function getRunningSums(entries:number[]){
    let sums:number[] = [];
    sums = entries.reduce((sums, entry, index)=>{
        if(index + 2 >= entries.length){ return sums; }
        sums.push(entry + entries[index + 1] + entries[index + 2]);
        return sums;
    }, sums);
    return sums;
}
const test_entries = [ 199, 200, 208, 210, 200, 207, 240, 269, 260, 263 ];
const puzzle_input = await getPuzzleInput('https://adventofcode.com/2021/day/1/input');
const depth_entries = puzzle_input ? getEntriesFromInput(puzzle_input) : [];
console.log(depth_entries);
console.log(
    'submission 1: ', 
    countIncreases(depth_entries), 
    7 === countIncreases(test_entries)
);
console.log(
    'submission 2: ', 
    countIncreases(getRunningSums(depth_entries)), 
    5 === countIncreases(getRunningSums(test_entries))
);