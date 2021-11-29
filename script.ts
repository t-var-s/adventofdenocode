import {DOMParser} from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';
const options = {
    base_url: 'https://adventofcode.com/2021/day/',
    solution_filename: 'app.ts',
    first_day: 1, last_day: 25, 
    day_id_prefix: 'day_'
}
async function getAdvent(){
    for(let d = options.first_day; d <= options.last_day; d++){
        const day_id = dayIdFromNumber(d);
        const solution_path = `./${day_id}/${options.solution_filename}`;
        try{ await Deno.readFile(solution_path) }
        catch(error){
            if(error.message.indexOf('No such file') === -1){ return false; }
            const day_challenge = await getChallenge(day_id);
            if(!day_challenge){ 
                console.log('---> No challenge available yet');
                break; 
            }
            const comment = commentFromChallenge(day_challenge);
            await Deno.mkdir('./' + day_id);
            await Deno.writeTextFile(solution_path, comment);
        }
    }
}
async function getChallenge(day_id:string){
    const url = options.base_url + numberFromDayId(day_id);
    console.log(url + ' <---');
    try{
        const res = await fetch(url);
        const html = await res.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        if(!doc){ return false; }
        const found_article = doc.querySelector('article');
        if(!found_article){ return false; }
        const text = `From ${url} ${found_article.textContent}\n`;
        return text;
    }catch(error) { console.error(error); return false;}
}
function dayIdFromNumber(d:number){
    return options.day_id_prefix + (d < 10 ? '0' : '') + d;
}
function numberFromDayId(day_id:string){
    const prefix = options.day_id_prefix;
    return day_id.replace(prefix + '0', '').replace(prefix, '');
}
function commentFromChallenge(challenge:string){
    const text = `/* ${challenge.replaceAll('---', '\n')}*/`;

    return text;
}
getAdvent();