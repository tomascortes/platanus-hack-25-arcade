// Dice Generation Module
// Procedurally generates dice faces using Phaser Graphics API

/**
 * Get dot pattern for a dice face value (1-6)
 * Returns array of {x, y} coordinates relative to dice center
 */
function getDotPattern(value) {
  const base_spacing = 0.8;
  const center = { x: 0, y: 0 };
  const left_top = { x: -base_spacing, y: -base_spacing };
  const right_bottom = { x: base_spacing, y: base_spacing };
  const left_bottom = { x: -base_spacing, y: base_spacing };
  const right_top = { x: base_spacing, y: -base_spacing };
  const patterns = {
    1: [center], // Center
    2: [left_top, right_bottom], // Diagonal
    3: [left_top, center, right_bottom], // Diagonal line
    4: [left_top, right_bottom, left_bottom, right_top], // Four corners
    5: [left_top, right_bottom, left_bottom, right_top, center], // Four corners + center
    6: [left_top, right_bottom, left_bottom, right_top, center, center] // Two columns
  };
  return patterns[value] || patterns[1];
}

/**
 * Draws the dice base (square with border and 3D effect)
 */
function drawDiceBase(graphics, x, y, size) {
  const borderWidth = 3;
  const cornerRadius = 4;
  
  graphics.fillStyle(0xffffff, 1);
  graphics.fillRoundedRect(x, y, size, size, cornerRadius);

  // Draw shadow on bottom and right sides only (for 3D effect)
  graphics.lineStyle(borderWidth, 0x000000, 0.4);
  // Bottom edge shadow
  graphics.beginPath();
  graphics.moveTo(x + cornerRadius, y + size);
  graphics.lineTo(x + size - cornerRadius, y + size);
  graphics.strokePath();
  // Right edge shadow
  graphics.beginPath();
  graphics.moveTo(x + size, y + cornerRadius);
  graphics.lineTo(x + size, y + size - cornerRadius);
  graphics.strokePath();
  
  // Main border on all sides
  graphics.lineStyle(borderWidth, 0x000000, 1);
  graphics.strokeRoundedRect(x, y, size, size, cornerRadius);
  
  graphics.fillStyle(0xffffff, 0.6);
  graphics.fillRoundedRect(x + 2, y + 2, size * 0.3, size * 0.3, 2);
  
}

/**
 * Draws dots on dice face based on pattern
 */
function drawDots(graphics, x, y, size, pattern) {
  const centerX = x + size / 2;
  const centerY = y + size / 2;
  const dotSize = size * 0.15; // 20% of dice size for square dots
  const spacing = size * 0.25; // 25% of dice size for spacing
  const shadowOffset = 1; // 1 pixel shadow offset
  
  pattern.forEach(dot => {
    const dotX = centerX + (dot.x * spacing);
    const dotY = centerY + (dot.y * spacing);
    
    // Draw shadow first (slightly offset to bottom-right)
    graphics.fillStyle(0x000000, 0.3);
    graphics.fillRect(
      dotX - dotSize / 2 + shadowOffset, 
      dotY - dotSize / 2 + shadowOffset, 
      dotSize, 
      dotSize
    );
    
    // Draw main square on top
    graphics.fillStyle(0x000000, 1);
    graphics.fillRect(dotX - dotSize / 2, dotY - dotSize / 2, dotSize, dotSize);
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
  const diceValue = Math.max(1, Math.min(6, Math.floor(value)));
  
  const graphics = scene.add.graphics();
  
  // Position graphics at the center of where the die should be
  // Graphics objects rotate around their position, so center it
  const centerX = x + size / 2;
  const centerY = y + size / 2;
  graphics.setPosition(centerX, centerY);
  
  // Get dot pattern for this value
  const pattern = getDotPattern(diceValue);
  
  // Draw dice base (relative to center, offset by -size/2)
  drawDiceBase(graphics, -size / 2, -size / 2, size);
  
  // Draw dots (relative to center)
  drawDots(graphics, -size / 2, -size / 2, size, pattern);
  
  // Store dice properties for later updates
  graphics.diceValue = diceValue;
  graphics.diceX = x;
  graphics.diceY = y;
  graphics.diceSize = size;
  graphics.diceCenterX = centerX;
  graphics.diceCenterY = centerY;
  
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
  
  graphics.clear();
  
  const pattern = getDotPattern(diceValue);
  const size = graphics.diceSize;
  // Draw relative to center (offset by -size/2)
  // Graphics position is already at center, so draw from -size/2
  drawDiceBase(graphics, -size / 2, -size / 2, size);
  drawDots(graphics, -size / 2, -size / 2, size, pattern);
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

