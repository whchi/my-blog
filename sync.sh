#!/bin/bash

cd public && git pull origin master
cd -
git submodule update
git pull
git submodule update
cd public && git pull origin master
