# StarsME

**Ionic4 App that allows you to give feedback to professors**.

Ionic 4 app that allows students give their feedbacks to professors based on 6 qualities (Friendly, Equality, Humor, Understand, Honest, Change).

## Screenshots 

<img src="img/stats.png" alt="stats" width="33%"/><img src="img/stars.png" width="33%" alt="stars"/><img src="img/profs.png" width="33%"/>

## Android Setup 

To target the Android platform, some setups is required.

1. install **Java**: native Android apps complied with Java.
2. install **Gradle**: the build tool used in Android Apps and must be installed speratly.
3. install **Android Studio**: the IDE for creation native Android apps it includes Android SDK, which will need to be configured for us in the command line.

### Run as Angular App 

1. clone the repository `git clone https://github.com/ahmnouira/StarsME`.
2. `cd StarsME/` to enter to the app root folder.
3. `npm install` to install the dependencies`.
4. start the server `npm start`

### Run in Ionic Lab 

* `ionic serve --lab` 

<img src="img/lab.png" alt="lab" width="100%"/>

### Run as an Android App 

1. run `cordova-res android` to generate _icons_ and _splashs_ images for android.
2. run `cordova platform add android` add android *platform*, *plugins* used for this app.
3. `ionic cordova build android` to build app and get **.apk** file.

**Note**: the .apk file is located in`StarsME/platforms/android/app/build/outputs/apk/debug/app-debug.apk`

### Publishing as Progressive Web Application (PWA) 

* Because ionic apps built with web technologies, they can run just as well as progressive web app as they can a native app.

1. `ng add @angular/pwa` add **@angular/service-worker** pacakge and enable service-workers.
2. `ionic build --prod` to build optimazed version of the app.

#####  Test the your build project

* `ng serve` does not work with _service workers_ you must use a seperate HTTP server to test your project **locally**.

run `npx http-server -p 8080 -c-1 www/` to see the service.

### Firebase Hosting Deploying 

1. run ` cd functions/ && npm i && cd ..` to install dependencies for *functions/* folder.
2. `ionic build --prod` to build optimazed version of the app.
3. `firebase deploy` to deploy the app.

This app will be alive at : https://takecare-3fa5e.firebaseapp.com

