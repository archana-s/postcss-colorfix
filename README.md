# PostCSS Colorfix
Colorfix monitors colors in your CSS (if not set as a variable) and recommends closest match from your color palette.

## Why use this?
Use this to ensure color consistency in your application. 

## Options
Provide your color palette as options to postcss-colorfix
```
{
  colors: {
    '#D2D8CC': '--color-primary',
    '#5E7352': '--color-text-primary',
    '#C985A7': '--color-accent'
    '<hexcodeFromYourPalette>: '<variable-name>'
  }
}
```

## How does it work? 
It uses nearest-color to determine the closest match for hexcode, color names and rgb and uses your color palette to recommend what to use in during linting. 

## What does it look like? 
