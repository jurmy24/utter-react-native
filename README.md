# Utter App

This is the github repo for the Utter Application. It is where we'll build the cross-platform app for iOS and Android, and it's the production counterpart to the more-research focused repo called [utter](https://github.com/jurmy24/utter).

## Top tips

### How to run
- Clone this repo
- Make sure you have the latest version of Node.js installed on your computer with the command `node -v`
- Navigate to the inner **utter-app** directory with `cd utter-app`
- Create an Expo account (not necessary but recommended)
- Download Expo Go on your smartphone
- Run the command `npx expo start`
- Scan the QR code that shows up to display the app live in your expo app

### Visual Studio code tips
- Download the following extensions
  - Material Icon Theme
  - Prettier - Code Formatter
  - React Native Tools
  - React-Native/React/Redux snipets for es6/es7
- To automatically format the code with prettier when saving go to **settings -> search formatonsave -> tick the box for Editor: Format on Save**
- If you don't see all the updates, consider restarting VScode

## Commit message convention

When writing commit messages for this project, please try to write your commit messages in the following manner:

_Keyword(scope if needed): write the message in the imperative sense without capitals and no full stop at the end_

### Possible keywords

- Build: Build related changes (eg: npm related/ adding external dependencies)
- Chore: A code change that external user won't see (eg: change to .gitignore file or .prettierrc file)
- Feat: A new feature
- Fix: A bug fix
- Docs: Documentation related changes
- Refactor: A code that neither fix bug nor adds a feature. (eg: You can use this when there is semantic changes like renaming a variable/ function name)
- Perf: A code that improves performance
- Style: A code that is related to styling
- Test: Adding new test or making changes to existing test
- Misc: Anything that in no way fits into the other categories
