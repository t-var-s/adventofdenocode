import { DOMParser } from "./deps.ts";
interface AdventDay {
	challenge: string | false;
	input: string | false;
}
const options = {
	base_url: "https://adventofcode.com/%YEAR%/day/",
	solution_filename: "solution.ts",
	input_filename: "input.txt",
	boilerplate_filename: "boilerplate.ts",
	year: "2021",
	first_day: 1,
	last_day: 25,
	cookie: "",
};
const setOptionsFromCommand = async (): Promise<string[]> => {
	const errors = [] as string[];
	if (Deno.args.length !== 2) {
		return [
			"deno run --allow-net --allow-read --allow-write download.ts [YEAR OF ADVENT OF CODE] [YOUR SESSION COOKIE HERE]",
		];
	}
	const year = parseInt(Deno.args[0]);
	if (isNaN(year)) errors.push("year must be a number");
	if (year < 2015) errors.push("year must be after 2015");
	const cookie = Deno.args[1] === "mycookie" ? options.cookie : Deno.args[1];
	if (cookie.length < 100) {
		errors.push("cookie must be at least 100 characters long");
	}
	if (cookie.indexOf("session") === -1) {
		errors.push("cookie must start with session=");
	}
	if (errors.length === 0) {
		options.year = year.toString();
		options.cookie = cookie;
	}
	try {
		await Deno.stat(options.year);
	} catch (_error) {
		await Deno.mkdir(options.year);
	}
	return errors;
};
const getAdvent = async (): Promise<void> => {
	for (let d = options.first_day; d <= options.last_day; d++) {
		const day_id = dayIdFromNumber(d);
		const base_path = `./${options.year}/${day_id}/`;
		const solution_path = `${base_path}${options.solution_filename}`;
		const input_path = `${base_path}${options.input_filename}`;
		try {
			await Deno.readFile(solution_path);
		} catch (_error) {
			const day: AdventDay = await getAdventDay(day_id);
			if (!day.challenge) {
				console.log("---> No challenge available yet");
				break;
			}
			const comment = commentFromChallenge(day);
			const solution_text = await addBoilerplate(comment);
			await Deno.mkdir(base_path);
			await Deno.writeTextFile(solution_path, solution_text);
			if (day.input) {
				await Deno.writeTextFile(input_path, day.input);
			}
		}
	}
};
const getAdventDay = async (day_id: string): Promise<AdventDay> => {
	const year_url = options.base_url.replace("%YEAR%", options.year);
	const challenge_url = year_url + numberFromDayId(day_id);
	const day: AdventDay = { challenge: false, input: false };
	console.log(challenge_url + " <---");
	try {
		const challenge_response = await fetch(challenge_url);
		const html = await challenge_response.text();
		const doc = new DOMParser().parseFromString(html, "text/html");
		if (!doc) return day;
		const found_article = doc.querySelector("article");
		if (!found_article) return day;
		day.challenge = `From ${challenge_url} ${found_article.textContent}\n`;
		const input_response = await fetch(challenge_url + "/input", {
			headers: { Cookie: options.cookie },
		});
		day.input = await input_response.text();
		return day;
	} catch (error) {
		console.error(error);
		return day;
	}
};
const dayIdFromNumber = (d: number): string => {
	return (d < 10 ? "0" : "") + d;
};
const numberFromDayId = (day_id: string): number => {
	return parseInt(day_id.replace(/^0/, ""));
};
const commentFromChallenge = (day: AdventDay): string => {
	const comment_text = day.challenge ? day.challenge : "";
	return comment_text.replaceAll("---", "\n");
};
const addBoilerplate = async (code: string): Promise<string> => {
	const boilerplate = await Deno.readTextFile(options.boilerplate_filename);
	return boilerplate.replace('%COMMENT%', code);
};
const errors = await setOptionsFromCommand();
if (errors.length == 0) getAdvent();
else errors.forEach((error) => console.log(error));
