# 🎮 Phaser 3 Game Development Starter

A starter kit for building games with Phaser 3.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Start Development Server

```bash
pnpm dev
```

This starts a server at `http://localhost:3000`.

### 3. Build Your Game

- **Edit `game.js`** - Write your game code
- **Update `metadata.json`** - Set your game name and description (optional)
- **Create `cover.png`** - Design a cover image for your game (optional)

## 🕹️ Controls

For local testing, you can use keyboard controls. The game supports standard keyboard input.

By default, many games use:

- **WASD** or **Arrow Keys** for movement
- **Spacebar** for actions
- **Enter** for start/menu

💡 **Tip**: Keep controls simple and intuitive for the best gameplay experience!

## 📚 Resources

- **`docs/phaser-quick-start.md`** - Quick reference guide for Phaser 3
- **`docs/phaser-api.md`** - Comprehensive Phaser 3 API documentation
- **`AGENTS.md`** - AI assistant instructions for game development

## 🤖 AI-Assisted Development

This project includes pre-configured instructions for AI assistants (Cursor, Windsurf, etc.) to help you build your game.

Simply tell your AI assistant what game you want to build! For example:

> "Create a Space Invaders clone with colorful enemies"
>
> "Build a flappy bird style game with procedural graphics"
>
> "Make a breakout game with power-ups"

Your AI will help with the implementation!

## Game Structure

Your `game.js` should follow this structure:

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

## Notes

- Phaser 3 is loaded externally via CDN
- The game runs in a sandboxed iframe for security
- Use Phaser's built-in features (sprites, physics, tweens, etc.)
- Keep code readable and well-structured
