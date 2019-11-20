# `@xilab/components-form`

> Various React components relating to forms

## Slider
A simple slider component, similar to HTML's range input. Displays `value` prop as the position of a dot on the line,
and calls its `onChange` prop when the value changes.

### Usage
 - `min: number`: The minimum value that the slider can be set at
 - `max: number`: The maximum value that the slider can be set at
 - `value: number`: The current value of the slider, between `min` and `max`
 - `onChange?: (val: number) => void`: An event listener that is called when the value of the slider is changed



#### CSS properties

-   `font-size`: Sets the height of the slider
-   `width`: Sets the width of the slider
-   `color`: Sets the colour of the dot on the slider

### Example
```typescript jsx
<Slider min={0} max={1} value={.5} onChange={handleChange} />
```

### Remarks

Unlike the normal HTML `range` input, this component does not update itself - the following code would act like a readonly slider:

```typescript jsx
<Slider min={0} max={1} value={.5} />
```

Instead, to make it act like a normal slider, you can use React hooks:

```typescript jsx
const [sliderValue, setSliderValue] = useHook(.5);
// ...
<Slider min={0} max={1} value={sliderValue} onChange={setSliderValue} />
```

Updating the slider value property will not trigger `onChange`.