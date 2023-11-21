### Using Deno to Advent all the Codes

![adventofdenocode](https://user-images.githubusercontent.com/6660327/206867279-e7aff119-fd50-44e1-9e04-d701f0d2da6a.gif)

```
deno run --allow-net --allow-read --allow-write download.ts [YEAR OF ADVENT OF CODE] [YOUR SESSION COOKIE HERE]
```

For my first Advent of Code, to warm-up and start learning Typescript and Deno, I made a script to download the input and the first challenge for each day. Now it's being improved every year. Run the command above with the year and your session cookie from adventofcode.com - this will create a subfolder on the current directory for each available day. Besides the `challenge.txt` and `input.txt`, an initial `solution.js` file will be saved with some boilerplate code that I've found to be useful as all puzzles involve handling some line-by-line input.

You can see any relevant options in the `download.ts` file, including file names. By default, the script copies a Javascript boilerplate for each day, but you can add a `ts` argument to copy the Typescript file instead (or just change that default option). You can even use this with any other programming language, specially if you already have your own helpful imports. My `tools.ts` only has a couple of ways to log anything into the terminal and common AoC things like converting text into a number. Another common issue is parsing lines that have some structure, which `puzzle.ts` tries to handle in general by putting sections of text into relevant blocks. 

My `boilerplate.ts` follows the basic approach of using the examples that are always given to test the findAnswers function, which receives the puzzle input and returns an object with the answers for part 1 and 2. Additional functions are created as needed and called by findAnswers to break the problem appart. Things like symbols for what certain characters mean is common in AoC, as well as some specific way of scoring points for getting to a number that is the answer.


https://adventofcode.com

https://deno.land

https://www.typescriptlang.org

![Advent of Deno Code](https://repository-images.githubusercontent.com/433220540/2c8142d3-9400-4f22-b77b-86e97269bd23)
