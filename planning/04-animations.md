# Dice Rolling Animations

## Animation Types

### 1. Roll Animation (2D)

- **Effect**: Dice "spinning" by rapidly changing face values
- **Duration**: 0.5-1 second
- **Method**:
  - Rapidly cycle through random values (1-6)
  - Use Phaser tweens for smooth transitions
  - Stop on final random value

### 2. Shake Animation

- **Effect**: Dice slightly shake before settling
- **Duration**: 0.2 seconds
- **Method**: Small random position offsets with tween

### 3. Scale Animation

- **Effect**: Dice briefly scale up/down when rolled
- **Duration**: 0.3 seconds
- **Method**: Scale tween (1.0 → 1.1 → 1.0)

## Implementation Approach

- Use Phaser Tweens for all animations
- Chain animations: Shake → Roll → Settle
- All dice animate simultaneously
- Smooth easing functions (ease-out)

## Animation Sequence

1. User clicks roll button
2. All dice start shake animation
3. Dice values rapidly change (roll animation)
4. Dice settle on final random values
5. Optional: Scale pulse on completion
