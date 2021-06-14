# Party Parrot Conga

## Objective 

Create a simple in-browser game with three states (start screen, game play and game over) and the ability to restart. 

## Technologies 

The game must be created using HTML, CSS, Javascript (Canvas, DOM, Basic JS, Classes) and a version control tool (Git/Github). Bonus: include local storage and audio.

## Description

Party Parrot Conga is a fun new twist on the classic Snake game. We've removed the Snakes and replaced them with lovely Parrots that are there to party with you. 

Using your arrow keys, collide into as many Lonely Parrots as possible to add them to your Conga. The rules are simple: collect ten Lonely Parrots without crashing into the Conga or leaving the Party!

## MVP
- The game starts with a Parrot Conga (consisting of two parrots) moving forwards into the middle of the perimeter. This is so the Parrot Conga does not immediately collide with the perimeter. 
- The user can change the direction of the Parrot Conga using the arrow keys. The Parrot Conga always turns 90 degrees per key press.
- A Lonely Parrot is placed in a random location within the perimeter. It should not be directly next to the perimeter or on top of the Parrot Conga.
- When the Parrot Conga collides with the Lonely Parrot, the Parrot Conga gets longer and the next Lonely Parrot appears. There is a score count for the user to keep track of progress.
- The game gets more difficult ss the Parrot Conga gets longer. In addition, when the user has a score of five, the Parrot Conga starts moving faster.

Win Condition: If ten Lonely Pardots are added to the Conga, the user is taken to the Winning Screen.

Lose Condition: If the Parrot Conga collides with itself or the perimeter, the user is taken to the Game Over screen.

## Backlog
- Toggle for dark mode
- Instructions/help pop up
- Enter name and display throughout
- Add Vengaboys as background music
- Toggle to increase or decrease the Conga speed
- Leaderboard based on browser session

## Structure

## main.js
- drawCongo
- drawParrot
- moveCongo
- detectCollision
- collectParrot
- showScore
- animate 
- start
- buildStartScreen
- buildGamePlayScreen
- buildGameOverScreen

## States & Transitions
- startScreen
- gamePlayScreen
- gameOverScreen

## Task List
- Create the three states
- Set up the DOM
- Add the event listeners
- Create the canvas board
- Create/draw the Congo
- Create/draw the Parrot
- Make the Conga move 
- Change direction with arrow keys
- Detect collisions for Congo:
- ..if collide with perimiter
- ..if collide with itself 
- ..if collide with Parrot
- Define the Congo head + tale
- Increase tale upon collision with Parrot
- Calculate score for win condition
- Game over conditions

## Links