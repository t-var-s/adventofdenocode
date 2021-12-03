import {DOMParser} from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';
interface AdventDay{
    challenge: string|false,
    input: string|false
}
const options = {
    base_url: 'https://adventofcode.com/2021/day/',
    solution_filename: 'solution.ts',
    input_filename: 'input.txt',
    first_day: 1, last_day: 25, 
    day_id_prefix: 'day_'
}
async function getAdvent():Promise<void>{
    for(let d = options.first_day; d <= options.last_day; d++){
        const day_id = dayIdFromNumber(d);
        const solution_path = `./${day_id}/${options.solution_filename}`;
        const input_path = `./${day_id}/${options.input_filename}`;
        try{ await Deno.readFile(solution_path) }
        catch(error){
            if(error.message.indexOf('No such file') === -1){ 
                console.log(error); 
                break;
            }
            const day:AdventDay = await getAdventDay(day_id);
            if(!day.challenge){ 
                console.log('---> No challenge available yet');
                break; 
            }
            const comment = commentFromChallenge(day);
            const solution_text = comment + '\n' + extraSolutionCode();
            await Deno.mkdir('./' + day_id);
            await Deno.writeTextFile(solution_path, solution_text);
            if(day.input){
                await Deno.writeTextFile(input_path, day.input);
            }
        }
    }
}
async function getAdventDay(day_id:string):Promise<AdventDay>{
    const challenge_url = options.base_url + numberFromDayId(day_id);
    const cookie = Deno.args.length > 0 ? Deno.args[0] : '';
    const day:AdventDay = { challenge: false, input: false };
    console.log(challenge_url + ' <---');
    try{
        const challenge_response = await fetch(challenge_url);
        const html = await challenge_response.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        if(!doc){ return day; }
        const found_article = doc.querySelector('article');
        if(!found_article){ return day; }
        day.challenge = `From ${challenge_url} ${found_article.textContent}\n`;
        const input_response = await fetch(challenge_url + '/input', {
            headers:{ Cookie: cookie }
        });
        day.input = await input_response.text();
        return day;
    }catch(error) { console.error(error); return day;}
}
function dayIdFromNumber(d:number):string{
    return options.day_id_prefix + (d < 10 ? '0' : '') + d;
}
function numberFromDayId(day_id:string):number{
    const prefix = options.day_id_prefix;
    return parseInt(day_id.replace(prefix + '0', '').replace(prefix, ''));
}
function commentFromChallenge(day:AdventDay):string{
    const comment_text = day.challenge ? day.challenge : '';
    return `/* ${comment_text.replaceAll('---', '\n')}*/`;
}
function extraSolutionCode(){
    const code = `
import { getPuzzleInput, getEntriesFromInput } from '../tools.ts';
//TODO
function testFirstChallenge(entries:string[]){
    return 1 === 1;
}
const test_entries = [
];
const first_submission_correct = testFirstChallenge(test_entries);
const first_submission = false; //await solveFirstChallenge();
console.log('submission 1: ', first_submission, first_submission_correct);
const second_submission_correct = testSecondChallenge(test_entries);
const second_submission = false; //await solveSecondChallenge();
console.log('submission 2: ', second_submission, second_submission_correct);
`; 
    return code;
}
getAdvent();