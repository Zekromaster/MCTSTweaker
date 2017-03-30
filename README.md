# MCTSTweaker
A small TS Module allowing to make recipes for the MC advancement system.

## How to "install""
Just install Node and Typescript. Make a TS script, import tstweaker.ts, like this:
```
import * as tweaker from "tstweaker.ts"
```
I also included my nodejs typings, just to be sure.
You can also just use the .js version, but that's masochism as the code is unreadable.

You don't even need to really know Typescript to use this, I encapsulated most stuff so that you may just use the functions listed here without ever messing with Typescript.

## TS For NonCoders

First thing to do is installing nodejs and typescript. It's easy, just go grab them from https://nodejs.org and https://www.typescriptlang.org.
You then just create a file, anywhere, with a ".ts" extension, and put
```
import * as tweaker from "tstweaker.ts"
```

That's it, you made your typescript file. You can now just follow along.

For those who don't mess with programming, and just want something easier to write massrecipes with than the mess that is the Advancements system, I'll also explain how variables work because the way TS does types is kinda weird for non-code people.
A variable is basically a "container" for a value. For us, those values are recipes and ItemStacks. When you create a variable, you are basically telling the compiler "Whenever I say the name of this variable, this is what I'm referring to".
In typescript, this is done like this:
```
var name:type = value
```
"Whenever I say name, I'm saying value, of which the type is type". The type is what makes the compiler know what operations it can perform on that value, and while in TS it's not mandatory to declare it (you can just do var name = value), using it allows the compiler to tell you if you messed something up.

Another keyword you'll meet is "new", i.e:
```
var name:coolStuff = new coolStuff(things, otherThings)
```
This just means "From here, name means this coolStuff, which is created using arguments 'things' and 'things'". Arguments are just what you tell to a special bit of code - also called a function - called a "constructor": it created an object of the type coolStuff based on those values. I'll try to be as clear as possible about what arguments to put inside a function.

## Reminder for both code people and noncode people
Remind to put semicolons at the end of each instruction. This is more for code people, actually.

## How to use
Just make your script. It's easy.

## ItemStacks ==
The first thing to do is to create your ItemStacks. That is, the items you're gonna use. Just do it like this:
```
var stack:tweaker.ItemStack = new tweaker.ItemStack(itemID, number, metadata (optional))
```
You just create one of those for every item you need, like with Minetweaker variables. Make sure you're using the correct id. If you're only gonna use an item in input, you can just use "0" as your number, as it won't ever get used.

## Recipe Making
After making your itemstacks, you need to make your recipes. It is a two step process. The first part is declaring the recipes. There are two ways to do this, one for shapeless and one for shaped.

### Shapeless
```
var myShapelessRecipe:tweaker.ShapelessRecipe = new tweaker.ShapelessRecipe(output, input)
```
The output is given in the form of a single ItemStack, while the input is given in the form of an Array of ItemStacks (a list comprised between [ and ]).

### Shaped
```
var myShapedRecipe:tweaker.ShapedRecipe = new tweaker.ShapedRecipe(nameOfTheFile, output, pattern, input)
```
Let's analyze this:
nameOfTheFile is just the name of this recipe, and of the json file containing it. Choose something unique.
Output is, as before, in the form of an ItemStack.
Pattern and Input are particular. Pattern is the recipe in "symbol" form. In the code, it's an array of up to three strings. Every string should be at most three characters. You just represent the shape of the recipe with this, with each string of up to three characters representing a row (the first is the top row, the second the middle one, the third the bottom one), and every character representing an item (so, every item is represented by a single character, space meaning a blank slot in the crafting table). In example, this is a wooden axe's pattern:
```
["AA", " B", " B"]
```
with A being planks and B being sticks. The input is then given in this format:
```
[[key, ItemStack], [key, ItemStack]]
```
Basically, a list of couples in the [key, ItemStack] format. "key" is the character in the pattern, "ItemStack" is the associated item.

## Recipe registrations
The second step of making your recipes is registering them. You just do:
```
myRecipe.register();
```
That's it. Just do that for every recipe you make, replacing "myRecipe" with the variable containing your recipe, and you're ok.

## Final "push""
When you finished your script, just put
```
tweaker.push()
```
at the end of it. You did it. You created your MCTSTweaker script.

## Creating the JSon Files
When you're finally done making your tweaks, and pushed your recipes, just open the command line and do:
```
tsc your-script-name.ts
```
This will create the javascript file, which you can run with:
```
node your-script-name.js
```

Aaaand... That's all, Folks!
