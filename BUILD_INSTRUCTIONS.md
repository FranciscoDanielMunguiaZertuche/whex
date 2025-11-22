# Instructions for GitHub Copilot: Setup Unsigned iOS CI Workflow

**Role:** Expert DevOps Engineer & React Native Specialist
**Objective:** Configure a GitHub Actions workflow to build a "raw" unsigned `.ipa` file for iOS. This allows me to download the artifact on Windows and install it using Sideloadly with a personal Apple ID.

## Context
- **Project Type:** React Native (Expo)
- **Target Platform:** iOS
- **Build Environment:** GitHub Actions (macos-latest)
- **Signing Strategy:** NONE. We are intentionally bypassing code signing in CI. Signing will be handled locally on Windows via Sideloadly.

## Task 1: Update `eas.json`
Modify `eas.json` to add a specific build profile named `ci-unsigned`. It must extend the `development` profile but force the iOS simulator to `false`.

**Required JSON Structure:**
```
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "ci-unsigned": {
      "extends": "development",
      "ios": {
        "simulator": false
      }
    }
  }
}
```

## Task 2: Create GitHub Action Workflow
Create a new file at `.github/workflows/ios-build.yml`.

**Workflow Requirements:**
1.  **Trigger:** `workflow_dispatch` (manual trigger).
2.  **Runner:** `macos-latest`.
3.  **Steps:**
    *   Checkout code (`actions/checkout@v3`).
    *   Setup Node 18 (`actions/setup-node@v3`).
    *   Setup Expo (`expo/expo-github-action@v8`) using `${{ secrets.EXPO_TOKEN }}`.
    *   Install dependencies (`yarn install`).
    *   **Prebuild:** Run `npx expo prebuild --platform ios --no-install`.
    *   **Build Archive (Critical Step):** Use `xcodebuild` to create an archive. You MUST use the following flags to disable signing errors:
        *   `-destination 'generic/platform=iOS'`
        *   `CODE_SIGN_IDENTITY=""`
        *   `CODE_SIGNING_REQUIRED=NO`
        *   `CODE_SIGNING_ALLOWED=NO`
        *   `CODE_SIGN_STYLE=Manual`
    *   **Package IPA:**
        *   Create a directory `Payload`.
        *   Copy the `.app` bundle from the archive into `Payload`.
        *   Zip `Payload` into `MyApp-Unsigned.ipa`.
    *   **Upload Artifact:** Use `actions/upload-artifact@v4` to upload the `.ipa`.

**Critical Logic for `xcodebuild` command:**
Please dynamically detect the Scheme Name if possible, or use a placeholder `<YOUR_SCHEME_NAME>` and add a comment telling me to replace it.

**Reference Script for the Build Step:**
```
cd ios
xcodebuild -workspace *.xcworkspace \
  -scheme <YOUR_SCHEME_NAME> \
  -configuration Release \
  -sdk iphoneos \
  -destination 'generic/platform=iOS' \
  -archivePath $PWD/build/MyApp.xcarchive \
  clean archive \
  CODE_SIGN_IDENTITY="" \
  CODE_SIGNING_REQUIRED=NO \
  CODE_SIGNING_ALLOWED=NO \
  CODE_SIGN_STYLE=Manual
```

## Execution
1. Analyze my current `app.json` to guess the correct Scheme Name (usually the "name" field with spaces removed).
2. Generate/Update `eas.json`.
3. Generate `.github/workflows/ios-build.yml` with the exact configuration above.
