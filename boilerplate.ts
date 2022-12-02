const tests = {
	input: `
	
	`,
	first: 1,
	second: 2
};
/*
%COMMENT%
*/

import { intval, log, logList } from "../../tools.ts";
import { puzzle } from "../../puzzle.ts";

const findAnswers = (entries: string[][]) => {
	const answers = {};

	log(entries);

	return answers;
};
const testPart1 = async (input: string): Promise<boolean> => {
	const puzzle_input = await puzzle.parseInput(input);
	const answers = findAnswers(puzzle_input.blocks[0]);
	return answers === tests.first;
};
const solvePart1 = async (): Promise<number> => {
	const puzzle_input = await puzzle.parseInput();

	return 1;
};

const testPart2 = async (input: string): Promise<boolean> => {
	const puzzle_input = await puzzle.parseInput(input);
	const answers = findAnswers(puzzle_input.blocks[0]);
	return answers === tests.second;
};
const solvePart2 = async (): Promise<number> => {
	const puzzle_input = await puzzle.parseInput();

	return 2;
};

const part1_correct = await testPart1(tests.input);
const part1 = await solvePart1();
log("    part 1: ", part1, part1_correct);
const part2_correct = await testPart2(tests.input);
const part2 = await solvePart2();
log("    part 2: ", part2, part2_correct);
