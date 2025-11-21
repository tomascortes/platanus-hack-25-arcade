# Dice Generation Module (dice.js)

## Module Structure

### Functions to Implement

#### `createDiceFace(scene, value, x, y, size)`

- Creates a single dice face with the specified value (1-6)
- Parameters:
  - `scene`: Phaser scene object
  - `value`: Number 1-6 representing dice face
  - `x, y`: Position coordinates
  - `size`: Dice size in pixels
- Returns: Phaser Graphics object

#### `getDotPattern(value)`

- Returns dot positions for a given dice value
- Returns: Array of {x, y} coordinates relative to dice center
- Handles all 6 face patterns

#### `drawDiceBase(graphics, x, y, size)`

- Draws the dice square base (white/colored square with border)
- Adds subtle 3D effect with shadows/highlights

#### `drawDots(graphics, x, y, size, pattern)`

- Draws dots on dice face based on pattern
- Calculates dot positions relative to dice center

## Implementation Notes

- Use Phaser Graphics API for all rendering
- No external images - everything procedural
- Support for different dice colors/styles
- Modular design for easy extension
