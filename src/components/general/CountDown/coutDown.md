## CountDown 

This is a React functional component that creates a countdown button. It takes in four props:

`text`: the text that is displayed on the button
`seconds`: the duration of the countdown in seconds
`handleFunction`: a function that is called when the button is clicked
`type`: the type of the button, either "button" (default) or "span"

### What this component do ?

When the button is clicked, it calls the handleFunction prop and starts a countdown. During the countdown, the button is disabled and the text displayed on the button is updated to show the time remaining in the countdown. When the countdown finishes, the button is re-enabled, the button or link can be clicked again.