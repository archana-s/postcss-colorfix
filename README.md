# PostCSS Colorfix
Colorfix monitors colors in your CSS (if not set as a variable) and recommends closest match from your color palette.

## Why use this?
Enabling color consistency in your application. You can limit the colors in your application to just the palette you define. This can continuously monitor your application for adhering to your preset color palette and maintaining consistency. 

## Options
Include all the colors from your palette with their variable names as a map
```
{
  colors: {
    '#D2D8CC': '--color-primary',
    '#5E7352': '--color-text-primary',
    '#C985A7': '--color-accent'
  }
}
```
