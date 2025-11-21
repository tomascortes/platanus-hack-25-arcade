# Sound Effects Design

## Sound Types

### 1. Roll Sound

- **Purpose**: Play when dice start rolling
- **Type**: Short, sharp sound (like shaking dice in cup)
- **Duration**: 0.2-0.5 seconds
- **Frequency**: 440-660 Hz range

### 2. Settle Sound

- **Purpose**: Play when dice finish rolling
- **Type**: Lower pitch, satisfying "thud"
- **Duration**: 0.1-0.3 seconds
- **Frequency**: 220-330 Hz range

### 3. Click Sound (Button)

- **Purpose**: Play when roll button is clicked
- **Type**: Short click/beep
- **Duration**: 0.1 seconds
- **Frequency**: 800-1000 Hz

## Implementation

- Use Phaser's Web Audio API
- Generate tones procedurally (no audio files)
- Use `playTone()` function similar to Snake game
- Optional: Add variation to sounds (random pitch modulation)

## Sound Timing

- Roll sound: Start immediately on button click
- Settle sound: Play when animation completes
- Click sound: Play on button press
