#!/usr/bin/env bash

if [[ ${BRANCH} != "prod" ]]; then
  echo "Current branch is not 'prod'"
  exit 0
fi

function universalSed() {
  if [[ "$OSTYPE" == "darwin"* ]]; then
      sed -i "" "$1" "$2"
  else
      sed -i "$1" "$2"
  fi
}

ROBOTS_TXT_FILE=./public/robots.txt

universalSed 's/Disallow: \/$/Allow: \//' $ROBOTS_TXT_FILE

echo "Check robots.txt:"
cat $ROBOTS_TXT_FILE
