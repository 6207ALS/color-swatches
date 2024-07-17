# Swatches

## How to install and run locally

Swatches was developed with Vite. To build and preview the application locally, complete the following steps:

1) Clone the repository into your directory:
 
	https://github.com/6207ALS/color-swatches.git

2) Navigate to the cloned repository and install its dependencies using your preferred package manager (i.e `npm install`).

3) Build the application with Vite's build command: `npm run build`.

4) Start the application using `npm run preview`.

5) Navigate to `localhost:4173` on your browser to view the application.

## Solution Overview

### Reducing the number API calls made

Bonus Solution: To reduce the number of API calls made, the application takes the following approach:

1) Retrieves all colors for hue values 0 to 360, in increments of 5 (i.e. `hsl(0, 100, 50)` &#8594; `hsl(5, 100, 50)` &#8594; `hsl(10, 100, 50)` &#8594; ...

2) Iterates over the colors, comparing each name with the next: [`red`, `red`, `orange`, `yellow`]

3) Add all unique colors to an array.

> If two adjacent colors are the same (i.e. [`red`, `red`]), no additional API calls have to be made. 
That is, we can assume all colors between `red` and `red` are `red`.

>  If two adjacent colors are different (i.e. `red` and `orange`), there can potentially be additional colors in between these two colors.
If so, make API requests for the HSL values between `red` and `orange` and add any new colors to the array.

By making API calls for hue values in increments of 5, we can determine which range of HSL values don't require additional API calls.

### Determining when the API calls  are made

The application should not make additional API calls when the user repeatedly searches the same saturation/light combination. To avoid redundant API calls, the application initializes a basic cache to record colors for every unique combination.

```javascript
const colorRecord = {}
```
If the user requests for a previously searched combination, the cache is used to retrieve the recorded colors. Otherwise, API calls are made.


In the real-world, the cache should not be an object within the application. We can use a third-party service such as Redis as the caching service.



### What is the best user experience for selecting S and L values?

I considered two different types of inputs for the saturation and light values: custom sliders or text inputs. 
- Sliders are more intuitive for users and less error prone as they are restricted to a specific range (0 - 100). 
- Text inputs, on the other hand, are easier to implement, but require input validation.

Ultimately, I chose text inputs for its simplicity. Although I'd have to validate the user inputs, text inputs would be easier implement compared to a custom slider component.

### What sort of feedback will the user receive? How will loading times be handled?

Feedback: A simple description of how many colors were retrieved for each search. Example: `Your search input matched 46 colors`


Loading Time: While the API calls are being made, a simple loading icon is displayed to indicate that the search is being processed.