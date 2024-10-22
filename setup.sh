#!/usr/bin/env bash
# This script install missing dependencies

currentDir=$(pwd)

# Directiry where binaries are installed
binDir=".bin"
mkdir "$binDir"

# Install pdf manipulation tool
echo Installing Ghostscript...
cd /tmp
apt-get download ghostscript
dpkg-deb -x ghostscript*.deb ghostscript
cd "$currentDir"
gsPath="$binDir/gs"
cp /tmp/ghostscript/usr/bin/gs "$gsPath"
echo "Ghostscript installed"

browser="${1:-chrome@canary}" # Must be chrome or firefox or derivate (default chrome@canary)

# Install and register headless browser
if [[ $browser == *"chrome"* ]]; then
    browserType="chrome"
elif [[ $browser == *"firefox"* ]]; then
    browserType="firefox"
else
    echo "ERROR: Browser must be chrome or firefox or derivate"
    exit 1
fi

echo "Installing $browser..."
cd "$binDir"
browserPath=$(bun x @puppeteer/browsers install "$browser" | tail -n 1 | cut -d' ' -f2)
cd "$currentDir"

echo "Updating configuration"
bunx json -I -f package.json -e "this.config={
    browserType: '$browserType',
    browserPath: '$(echo "${browserPath/#$(pwd)\//}")',
    gsPath: '$gsPath'
}"
echo "Browser installed"
