# Game Layout and Display

## Dice Arrangement

- **Starting count**: 5 dice
- **Layout**: Horizontal row, evenly spaced
- **Spacing**: 20-30px between dice
- **Position**: Centered on screen (vertically and horizontally)

## Screen Layout (800x600)

```
┌─────────────────────────────────┐
│                                 │
│     [Dice1] [Dice2] [Dice3]     │
│     [Dice4] [Dice5]              │
│                                 │
│         [ROLL BUTTON]           │
│                                 │
└─────────────────────────────────┘
```

## Alternative Layouts

- **Option 1**: Single row of 5 dice (horizontal)
- **Option 2**: 2 rows (3 on top, 2 on bottom)
- **Option 3**: All 5 in a row with spacing

## UI Elements

- **Roll Button**: Centered below dice
- **Score/Total**: Optional display of dice sum
- **Instructions**: Simple text instructions

## Positioning Calculation

- Center X: 400 (half of 800)
- Center Y: 300 (half of 600)
- Dice start X: Center - (total width / 2)
- Dice spacing: (800 - (5 \* diceSize)) / 6
