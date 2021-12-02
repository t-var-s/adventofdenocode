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