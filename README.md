### Using Deno to Advent all the Codes

![adventofdenocode](https://user-images.githubusercontent.com/6660327/206867279-e7aff119-fd50-44e1-9e04-d701f0d2da6a.gif)

```
deno run --allow-net --allow-read --allow-write download.ts [YEAR OF ADVENT OF CODE] [YOUR SESSION COOKIE HERE]
```

For my first Advent of Code, to warm-up and start learning Typescript and Deno, I made a script to download the input and the first challenge for each day. Now it's being improved every year. Run the command above with the year and your session cookie from adventofcode.com - this will create a subfolder on the current directory for each available day. Besides the `input.txt`, an initial `solution.js` file will be saved with the text from that day's challenge as a comment and some boilerplate code that I've found to be useful as all puzzles involve handling some line-by-line input.

You can see any relevant options in the `download.ts` file, including file names. By default, the script copies a Javascript boilerplate for each day, but you can add a `ts` argument to copy the Typescript file instead (or just change that default option).

```

https://adventofcode.com

https://deno.land

https://www.typescriptlang.org

![Advent of Deno Code](https://repository-images.githubusercontent.com/433220540/2c8142d3-9400-4f22-b77b-86e97269bd23)
