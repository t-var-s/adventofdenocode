interface Puzzle {
	filepath: string;
	input: string;
	entries: string[];
	blocks: string[][][];
	parseInput: (input?: string) => Promise<Puzzle>;
}
export const puzzle: Puzzle = {
	filepath: "./input.txt",
	input: "",
	entries: [],
	blocks: [],
	parseInput: async function (input?: string) {
		if (input) this.input = input;
		else {
			try {
				this.input = await Deno.readTextFile(this.filepath);
			} catch (error) {
				console.log(error);
				return this;
			}
		}
		this.entries = this.input.split("\n");
		if (this.entries[this.entries.length - 1] == "") this.entries.pop();
		this.blocks = [];
		this.entries.forEach((entry, index) => {
			if (entry.length == 0 || index == 0) this.blocks.push([]);
			if (entry.length == 0) return false;
			const separator = [" | ", " -> ", " ", ","]
				.filter((s) => entry.split(s).length > 1);
			const columns: string[] = [];
			if (separator.length > 0) {
				entry.split(separator[0])
					.filter((column) => column != "")
					.forEach((column) => columns.push(column));
			} else {
				columns.push(entry);
			}
			this.blocks[this.blocks.length - 1].push(columns);
		});
		return this;
	},
};
