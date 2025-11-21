// Dice Game
// Displays 5 random dice that can be rolled

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#2c3e50',
  scene: {
    create: create,
    update: update
  }
};

const game = new Phaser.Game(config);

// Game variables
let dice = []; // Array to store 5 dice graphics objects
let rollButton;
let isRolling = false;
const diceSize = 80;
const diceCount = 5;

function create() {
  const scene = this;
  
  // Title
  this.add.text(400, 50, 'DICE GAME', {
    fontSize: '48px',
    fontFamily: 'Arial, sans-serif',
    color: '#ecf0f1',
    align: 'center',
    stroke: '#34495e',
    strokeThickness: 4
  }).setOrigin(0.5);
  
  // Initialize 5 dice with random values
  initializeDice(scene);
  
  // Create roll button
  createRollButton(scene);

  // Instructions
  this.add.text(400, 550, 'Click "ROLL DICE" to roll again', {
    fontSize: '18px',
    fontFamily: 'Arial, sans-serif',
    color: '#95a5a6',
    align: 'center'
  }).setOrigin(0.5);
}

function initializeDice(scene) {
  dice = [];
  const startX = 400 - ((diceCount * diceSize + (diceCount - 1) * 20) / 2) + diceSize / 2;
  const y = 300;
  
  for (let i = 0; i < diceCount; i++) {
    const x = startX + i * (diceSize + 20);
    const value = rollDice();
    const diceFace = createDiceFace(scene, value, x - diceSize / 2, y - diceSize / 2, diceSize);
    // Store original position for animations
    diceFace.originalX = x - diceSize / 2;
    diceFace.originalY = y - diceSize / 2;
    dice.push(diceFace);
  }
}

function createRollButton(scene) {
  // Create button background
  const buttonBg = scene.add.graphics();
  buttonBg.fillStyle(0x3498db, 1);
  buttonBg.fillRoundedRect(300, 450, 200, 60, 10);
  buttonBg.lineStyle(3, 0x2980b9, 1);
  buttonBg.strokeRoundedRect(300, 450, 200, 60, 10);
  
  // Button text
  const buttonText = scene.add.text(400, 480, 'ROLL DICE', {
    fontSize: '28px',
    fontFamily: 'Arial, sans-serif',
    color: '#ffffff',
    align: 'center',
    fontStyle: 'bold'
  }).setOrigin(0.5);
  
  // Make button interactive
  buttonBg.setInteractive(new Phaser.Geom.Rectangle(300, 450, 200, 60), Phaser.Geom.Rectangle.Contains);
  buttonBg.on('pointerdown', () => {
    if (!isRolling) {
      rollAllDice(scene);
    }
  });
  buttonBg.on('pointerover', () => {
    buttonBg.clear();
    buttonBg.fillStyle(0x5dade2, 1);
    buttonBg.fillRoundedRect(300, 450, 200, 60, 10);
    buttonBg.lineStyle(3, 0x3498db, 1);
    buttonBg.strokeRoundedRect(300, 450, 200, 60, 10);
  });
  buttonBg.on('pointerout', () => {
    buttonBg.clear();
    buttonBg.fillStyle(0x3498db, 1);
    buttonBg.fillRoundedRect(300, 450, 200, 60, 10);
    buttonBg.lineStyle(3, 0x2980b9, 1);
    buttonBg.strokeRoundedRect(300, 450, 200, 60, 10);
  });
  
  rollButton = { bg: buttonBg, text: buttonText };
}

function rollAllDice(scene) {
  if (isRolling) return;
  
  isRolling = true;
  playTone(scene, 550, 0.2); // Roll sound
  
  // Step 1: Scale up animation (anticipation)
  dice.forEach((die) => {
    die.setScale(1.15);
  });
  
  // Step 2: Roll animation - rapidly change values
  let rollCount = 1;
  const maxRolls = 5; // More rolls for longer animation
  const rollInterval = 800; // milliseconds - slower for more visible effect
  
  const rollTimer = scene.time.addEvent({
    delay: rollInterval,
    callback: () => {
      // Update all dice with random values during roll
      dice.forEach((die) => {
        const randomValue = rollDice();
        updateDiceFace(die, randomValue);
      });
      
      rollCount++;
      
      if (rollCount >= maxRolls) {
        // Final roll - set actual random values and settle
        dice.forEach((die, index) => {
          const finalValue = rollDice();
          updateDiceFace(die, finalValue);
          
          // Step 3: Scale back down with bounce
  scene.tweens.add({
            targets: die,
            scaleX: 1,
            scaleY: 1,
            duration: 300,
            ease: 'Elastic.easeOut',
            onComplete: () => {
              if (index === dice.length - 1) {
                isRolling = false;
                playTone(scene, 330, 0.2); // Settle sound
              }
            }
          });
        });
        
        rollTimer.remove();
      }
    },
    repeat: maxRolls - 1
  });
}

function update() {
  // Game loop - no continuous updates needed for dice game
}

function playTone(scene, frequency, duration) {
  const audioContext = scene.sound.context;
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = 'square';

  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
}
