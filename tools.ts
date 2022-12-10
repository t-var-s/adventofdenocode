import { format } from "https://deno.land/std@0.117.0/datetime/mod.ts";
const meta = {
	timestamp: ''
};
export const log = (...anything: any): string => {
	if(meta.timestamp === ''){
		meta.timestamp = format(new Date(), "HH:mm:ss");
		console.log(meta.timestamp, '====================================');
	}
	if (anything.length > 2) {
		console.log(anything[0], anything[1], anything[2]);
	} else if (anything.length > 1) {
		console.log(anything[0], anything[1]);
	}else if(typeof anything[0] === "object" && anything[0].length > 100){
		console.log(anything[0].slice(0, 10));
	} else {
		console.log(anything[0]);
	}
	return meta.timestamp;
};
export const logList = (list: any[]): string => {
	const timestamp = format(new Date(), "HH:mm:ss");
	console.log(timestamp);
	list.forEach((item, index) => console.log(`[${index}]`, item));
	return timestamp;
};
export const intval = (text_number: string): number => {
	return parseInt(text_number);
};
export async function getPuzzleInput(): Promise<string | boolean> {
	const input_filepath = "./input.txt";
	try {
		const saved_text = await Deno.readTextFile(input_filepath);
		return saved_text;
	} catch (error) {
		console.log(error);
		return false;
	}
}
export function getEntriesFromInput(input: string): string[] {
	return input.split("\n");
}
