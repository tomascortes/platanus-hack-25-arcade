# AI Agent Instructions for Phaser 3 Game Development

You are helping build a game using Phaser 3. Follow these instructions carefully.

## Your Goal

Create an engaging, fun game in **game.js** using **Phaser 3**.

## Files to Edit

You can edit these files:

- `game.js` - Your game code (main file)
- `metadata.json` - Game name and description (optional)
- `cover.png` - Game cover image (optional)

## Development Workflow

1. **Edit game.js**: Write your game code in this file
2. **Update metadata.json**: Set `game_name` and `description` (optional)
3. **DO NOT start dev servers**: The user will handle running `pnpm dev` - do not run it yourself

## Phaser 3 Resources

- **Quick start guide**: @docs/phaser-quick-start.md
- **API documentation**: For specific Phaser methods and examples, search within docs/phaser-api.md

## Game Structure

Your game.js should follow this structure:

```javascript
const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    /* optional */
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

function preload() {
  // Load assets
}

function create() {
  // Initialize game objects
}

function update() {
  // Game loop logic
}
```

## Important Notes

- Phaser is loaded externally via CDN
- Focus on gameplay and creativity
- Use Phaser's built-in features (sprites, physics, tweens, etc.)
- Test in the development server
- Keep code readable and well-structured
- **Controls**: Keep controls simple (arrow keys, WASD, spacebar, etc.)

## Best Practices

1. **Start simple**: Get a working game first, iterate and improve
2. **Use Phaser features**: Leverage built-in physics, tweens, and effects
3. **Generate assets**: Draw shapes using Phaser's Graphics API when possible
4. **Let the user test**: The user will run `pnpm dev` when they want to test - focus on building the game
5. **Keep it fun**: Focus on engaging gameplay and smooth controls

Good luck building an amazing game!
