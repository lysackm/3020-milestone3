# 3020-milestone3
Creating a website that will help users choose a colour palette

### running this project

In a terminal (in VScode go to the top terminal menu and click "new terminal") use the command `cd ./milestone3` and then `npm start`. This will spin up a local version of 
the project on probably http://localhost:3000. This is a link to a local port on your computer 3000. Take comp 3010 to learn more.

Everytime you you change the packages in package.json you will need to run `npm install` or `yarn install`. This is downloading node modules.


## Project Tickets

This is a list of tasks that need to be completed. They are probably going to range in difficulty and time needed to complete. If you have a problem with how long something is taking then please bring it up to Mark earlier rather than later. Its easy to fix something early then to try to fix it last minute.

- Image Area (Junior) 
  - Be able to import images to the image area, start with haveing some default images in the assets folder
  - Use a libary to be able to draw on the image (start with a hardcoded colour, later pass in main colour)
  - Save the image with the edited changes
  - be able to change images

- Colour picking widget (Mark)
  - Use a library probably to get a circular spectrum
  - Get sliders to change colour values
  - complementary colours
  - Get a block to display colours
  - Mode 2, same functionality, different display and input
  - Mode 3, colour blindness mode? (Stretch)

- Palette Display with paintbrush (Fatima)
  - Display coulour palette image
  - Have the colours change dynamically depending on the colour palette prop passed in
  - Display paint brush
  - Have the tip of the paint brush change depending on the active colour
  - Change the active colour by clicking on the colour on the palette
  - Be able to change the active colour

- Expanding menu drawer (Ella)
  - expand the menu by clicking on a button in the top right
  - have 3 tabs in the menu
    - Colours
    - Palette
    - Images
  - Be able to fetch the images to display in the image tab
  - Be able to load images to the image tab when selected
  - Change active colour by selecting a colour in the colour tab
  - load a palette when selecting one

- State management
  - Figure out how to save and load information about colours to and from jsons
  - Be able to figure out how to save and load images
  - Be able to figure out how to save and load colour palettes
  - Store the history of all the colours, images, palettes
  - implement the save and delete buttons

- dynamic background
  - have parts of the background change to the colour palette colours when the palette changes

- tooltips
  - I icon
  - tooltips on buttons

## Libraries Used

https://uiwjs.github.io/react-color/#/wheel used for the color wheel

https://mui.com/material-ui/getting-started/installation/ used for the sliders