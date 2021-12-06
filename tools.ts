import { format } from "https://deno.land/std@0.117.0/datetime/mod.ts";
export const log = (anything:any):string =>{
    const timestamp = format(new Date(), "HH:mm:ss");
    console.log(timestamp, anything);
    return timestamp;
}
export async function getPuzzleInput():Promise<string|boolean>{
    const input_filepath = './input.txt';
    try{ 
        const saved_text = await Deno.readTextFile(input_filepath); 
        return saved_text;
    }catch(error){
        console.log(error);
        return false;
    }
}
export function getEntriesFromInput(input:string):string[]{
    return input.split('\n');
}