# Find Your Hat
## Description
This project is part of Codecademy's challenge projects. It is primarily just meant to be part of my personal portfolio.
It is a Node.js terminal game, where you generate a playing field of holes and safe squares. 
You must navigate to your hat in order to win. If you step in a hole you lose - If you step over the edges you lose!
## Features
* It is a Node.js based terminal game
* Takes user inputs to define size, difficulty and whether or not you wish to spawn randomly on the map
* Rudimentary handling of respawning and exiting the game.
## Dependencies
* [prompt-sync](https://www.npmjs.com/package/prompt-sync) - Version 4.2.0
## How to use
Open Node.js in the directory where main.js is located and type "node main.js" to initiate the game.
## Future Features
* Adding a Field Validator to ensure that generated fields are solvable. 
* Create a hard mode setting, where more holes are added after a given amount of steps taken.
* Upgrade the graphics, by using additional terminal packages.
* Handling of backtracking on starts. Currently no way to see where you are if you backtrack on your own steps.
## Known issues
* You can potentially spawn on your hat, which would make the field unsolvable.
* Often creating too few holes, because spawn and hat location are added after hole percentage. This may lead to overwriting of holes.
## Collaborators
None to mention
## License
None declared.
