#!/usr/bin/env bash

BRANCH=${BRANCH:=""}
ENV_FILE="./.env.${BRANCH}"
DESTINATION="./.env.local"

if [[ -f "$ENV_FILE" ]]; then
  mv $ENV_FILE $DESTINATION
fi

echo "COPIED ENV: ${ENV_FILE}"
