#!/bin/bash

export ANDROID_SDK_ROOT=$HOME/Android/Sdk/
export ANDROID_NDK_ROOT=$HOME/Android/Sdk/ndk/

rm -f build-*.apk

eas build --profile development --platform android --local

adb install build-*.apk
