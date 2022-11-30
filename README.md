### Using Deno to Advent all the Codes

![adventofdenocode_demo](https://user-images.githubusercontent.com/6660327/202920591-d4f18f64-203e-4540-afb9-658d6660e664.gif)

```
deno run --allow-net --allow-read --allow-write script.ts [YEAR OF ADVENT OF CODE] [YOUR SESSION COOKIE HERE]
```

In 2021, to warm-up and start learning Typescript and Deno, I made a script to
download the input and the first challenge for each day. Run the command above
with the year and your session cookie from adventofcode.com, this will create a
subfolder on the current directory for each available day. Besides the
input.txt, an initial solution.ts file will be saved with the text from that
day's challenge as a comment and some boilerplate code that I've found to be
useful as all puzzles involve handling some line-by-line input.

https://adventofcode.com

https://deno.land

https://www.typescriptlang.org

![Advent of Code 2021 with Deno](https://repository-images.githubusercontent.com/433220540/2c8142d3-9400-4f22-b77b-86e97269bd23)
