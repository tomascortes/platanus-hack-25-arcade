// Dice Generation Module
// Procedurally generates dice faces using Phaser Graphics API

/**
 * Get dot pattern for a dice face value (1-6)
 * Returns array of {x, y} coordinates relative to dice center
 */
function getDotPattern(value) {
  const patterns = {
    1: [{ x: 0, y: 0 }], // Center
    2: [{ x: -0.3, y: -0.3 }, { x: 0.3, y: 0.3 }], // Diagonal
    3: [{ x: -0.3, y: -0.3 }, { x: 0, y: 0 }, { x: 0.3, y: 0.3 }], // Diagonal line
    4: [{ x: -0.3, y: -0.3 }, { x: 0.3, y: -0.3 }, { x: -0.3, y: 0.3 }, { x: 0.3, y: 0.3 }], // Four corners
    5: [{ x: -0.3, y: -0.3 }, { x: 0.3, y: -0.3 }, { x: 0, y: 0 }, { x: -0.3, y: 0.3 }, { x: 0.3, y: 0.3 }], // Four corners + center
    6: [{ x: -0.3, y: -0.4 }, { x: -0.3, y: 0 }, { x: -0.3, y: 0.4 }, { x: 0.3, y: -0.4 }, { x: 0.3, y: 0 }, { x: 0.3, y: 0.4 }] // Two columns
  };
  return patterns[value] || patterns[1];
}

/**
 * Draws the dice base (square with border and 3D effect)
 */
function drawDiceBase(graphics, x, y, size) {
  const borderWidth = 3;
  const cornerRadius = 4;
  
  // Shadow (bottom-right offset)
  graphics.fillStyle(0x000000, 0.2);
  graphics.fillRoundedRect(x + 2, y + 2, size, size, cornerRadius);
  
  // Main dice body (white)
  graphics.fillStyle(0xffffff, 1);
  graphics.fillRoundedRect(x, y, size, size, cornerRadius);
  
  // Border
  graphics.lineStyle(borderWidth, 0x000000, 1);
  graphics.strokeRoundedRect(x, y, size, size, cornerRadius);
  
  // Highlight (top-left corner)
  graphics.fillStyle(0xffffff, 0.6);
  graphics.fillRoundedRect(x + 2, y + 2, size * 0.3, size * 0.3, 2);
  
  // Shadow (bottom-right corner)
  graphics.fillStyle(0x000000, 0.1);
  graphics.fillRoundedRect(x + size * 0.7, y + size * 0.7, size * 0.3, size * 0.3, 2);
}

/**
 * Draws dots on dice face based on pattern
 */
function drawDots(graphics, x, y, size, pattern) {
  const centerX = x + size / 2;
  const centerY = y + size / 2;
  const dotRadius = size * 0.1; // 10% of dice size
  const spacing = size * 0.25; // 25% of dice size for spacing
  
  graphics.fillStyle(0x000000, 1);
  
  pattern.forEach(dot => {
    const dotX = centerX + (dot.x * spacing);
    const dotY = centerY + (dot.y * spacing);
    graphics.fillCircle(dotX, dotY, dotRadius);
  });
}

/**
 * Creates a complete dice face with specified value
 * @param {Phaser.Scene} scene - Phaser scene object
 * @param {number} value - Dice value (1-6)
 * @param {number} x - X position
 * @param {number} y - Y position
 * @param {number} size - Dice size in pixels (default: 80)
 * @returns {Phaser.GameObjects.Graphics} Graphics object representing the dice
 */
function createDiceFace(scene, value, x, y, size = 80) {
  // Clamp value to valid range
  const diceValue = Math.max(1, Math.min(6, Math.floor(value)));
  
  // Create graphics object
  const graphics = scene.add.graphics();
  graphics.x = 0;
  graphics.y = 0;
  
  // Get dot pattern for this value
  const pattern = getDotPattern(diceValue);
  
  // Draw dice base
  drawDiceBase(graphics, x, y, size);
  
  // Draw dots
  drawDots(graphics, x, y, size, pattern);
  
  // Store dice properties for later updates
  graphics.diceValue = diceValue;
  graphics.diceX = x;
  graphics.diceY = y;
  graphics.diceSize = size;
  
  return graphics;
}

/**
 * Updates an existing dice face to show a new value
 * @param {Phaser.GameObjects.Graphics} graphics - Existing dice graphics object
 * @param {number} value - New dice value (1-6)
 */
function updateDiceFace(graphics, value) {
  const diceValue = Math.max(1, Math.min(6, Math.floor(value)));
  graphics.diceValue = diceValue;
  
  // Clear and redraw
  graphics.clear();
  
  const pattern = getDotPattern(diceValue);
  drawDiceBase(graphics, graphics.diceX, graphics.diceY, graphics.diceSize);
  drawDots(graphics, graphics.diceX, graphics.diceY, graphics.diceSize, pattern);
}

/**
 * Generate a random dice value (1-6)
 */
function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

// Export functions (if using modules, otherwise they'll be global)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createDiceFace,
    updateDiceFace,
    rollDice,
    getDotPattern
  };
}

