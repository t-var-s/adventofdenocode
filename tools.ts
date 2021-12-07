import { format } from "https://deno.land/std@0.117.0/datetime/mod.ts";
export const log = (...anything:any):string =>{
    const timestamp = format(new Date(), "HH:mm:ss");
    if(anything.length > 2){
        console.log(timestamp, anything[0], anything[1], anything[2]);
    }else if(anything.length > 1){
        console.log(timestamp, anything[0], anything[1]);
    }else{
        console.log(timestamp, anything[0]);
    }
    return timestamp;
}
export const logList = (list:any[]):string =>{
    const timestamp = format(new Date(), "HH:mm:ss");
    console.log(timestamp);
    list.forEach((item, index)=>console.log(`[${index}]`, item));
    return timestamp;
}
export const intval = (text_number:string):number =>{
    return parseInt(text_number);
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