# Phonics Heart Safari

This project is an interactive blaster game built using the p5.js library. Players control a blaster to send hearts toward moving characters while trying to score points. 
The game features multiple screens, sound effects, and a high score leaderboard.

## Features

- **Dynamic Gameplay**: Players can control a blaster to send phonics corresponding hearts toward characters moving around the screen.
- **Scoring System**: Earn points for hitting characters and lose points for missing.
- **Multiple Screens**: Includes a start screen, instructions, high score display, and gameplay screen.
- **Smooth Animations**: Characters and projectiles move smoothly across the screen.
- **Sound Effects**: Engaging audio feedback for various game actions, including shooting and scoring.

## Code Overview
- **Game Elements**: Object Oriented Programming design for the blaster, characters, background images, sound files, and game state management.
- **High Score Management**: Uses Firebase for storing and retrieving high scores.

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/JefeThePug/PhonicsBlast.git
   ```
2. Ensure you have the necessary libraries:
   - [p5.js](https://p5js.org/)
   - [Firebase](https://firebase.google.com/)
3. Place your assets (images and sound files) in the `/assets` directory:
   - Background image (`bg.jpg`)
   - Logo image (`logo.jpg`)
   - Instruction image (`instruc.jpg`)
   - High score background image (`highscore.jpg`)
   - Character images (`A.png`, `B.png`, ..., `Z.png`)
   - Sound files for background music and effects (`BGM.mp3`, `CharClear.wav`, `GameOver.wav`, `LetterPress.wav`, `PointUp.mp3`, `PointDown.wav`, `Miss.wav`)
4. Update the Firebase configuration in the code with your own Firebase project details.
5. Open `index.html` in a browser to play.

## How to Play

1. **Starting the Game**: 
   - Click the "PLAY" button on the start screen to begin the game.
   
2. **Controls**:
   - **Mouse Movement**: Move your mouse to aim the blaster or use the LEFT and RIGHT arrow keys.
   - **Shooting**:
     - Select the correct phonics letter for each character with your mouse, then click the mouse button or press the SPACE key to send a heart.
     - OR You can type the correct phonics letter directly on the keyboard to send a heart.

3. **Making Guesses**:
   - As characters fall from the top of the screen, you need to guess the correct letter associated with the character by clicking or pressing the corresponding key.
   

4. **Scoring**:
   - If you hit the character with the correct letter, you will earn points.
   - If you miss, or hit the character with an incorrect letter, you will lose points.
   - You can see your current score displayed on the screen.
   - Watch out for the score changes displayed as characters are hit or missed.

6. **Game Over**:
   - The game ends if you make too many mistakes in a row.
   - You will see a "GAME OVER" screen displaying your final score.
   - You can choose to restart the game or return to the main menu.

7. **High Scores**:
   - After the game ends, you have the option to enter your name for the high score leaderboard.
   - Follow the prompts to input your name using the letter buttons provided.

8. **Instructions**:
   - You can access the instructions screen from the start menu for a refresher on controls and gameplay mechanics.

## Future Improvements

- **Customization**: Allow players to choose different character sets or themes.
- **Mobile Compatibility**: Optimize the game for touch devices and smaller screens.
- **Advanced Features**: Introduce new game modes or challenges for players.

## Acknowledgments

- Built with [p5.js](https://p5js.org/) for interactive graphics and sound.

## License

This project is licensed under the [MIT License](LICENSE).
