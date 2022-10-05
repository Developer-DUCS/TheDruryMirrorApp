# TheDruryMirrorApp
Repo for the Drury Mirror App capstone project at Drury University.


## Setting up the development environment
1. Pull the Test-Development branch to your machine.
2. Open a terminal and make sure you are in the working directory of the project.
3. run `npm install` to install the dependencies from the *package.json* file.

## Run on Android Emulator
1. Open Android Studio.
2. Click *More Actions* and select *Virtual Device Manager*.
3. In the *Device Manager* window, press the play button on the phone.
4. When the phone is started, open the terminal and make sure you are in the working directory of the project.
5. Run `npm run android` in the terminal.
6. When prompted, type `a` in the terminal to open the android app.

## Run on Simulator for iPhone (Mac)
1. Open the phone in *Simulator*.
2. When the phone is started, open the terminal and make sure you are in the working directory of the project.
3. Run `npm run ios` in the terminal.
4. Restart the *Expo Go* app in the emulator and click the project file.  
5. Press `i` in the terminal window to open the app.

## Stop the Server
Type `ctrl C` in the terminal to stop.


# MySQL Server
1. Create a test database. 
2. Add users to the server and grant them privileges.

* Had to `npm install mysql2` for the authentication between mysql and nodejs.

## Trouble Shooting
Expo needs internet to run. Make sure the phone in the emulator has an internet connection.    
