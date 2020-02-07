#!/bin/bash

docker run -it --rm -v "$(pwd)":/usr/local/src/your-app ferrarimarco/github-changelog-generator -u TokenUnion -p union-marketplace-icf-grant --token $GHTOKEN
