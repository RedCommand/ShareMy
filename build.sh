#!/bin/bash

export ANDROID_SDK_ROOT=$HOME/Android/Sdk/
export ANDROID_NDK_ROOT=$HOME/Android/Sdk/ndk/

if [ -z "$ANDROID_NDK_ROOT" ]; then
    echo "You need to set ANDROID_NDK_ROOT to the path of your Android NDK"
    exit 1
fi

if [ -z "$ANDROID_SDK_ROOT" ]; then
    echo "You need to set ANDROID_SDK_ROOT to the path of your Android SDK"
    exit 1
fi

PLATEFORM="android"

if [ "$1" == "ios" ]; then
    PLATEFORM="ios"
    shift
fi

rm -f build-*.apk

eas build --profile development --platform "$PLATEFORM" --local "$@"

adb install build-*.apk
