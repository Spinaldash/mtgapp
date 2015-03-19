#!/bin/bash

mongoimport --jsonArray --drop --db brew-prod --collection brewCards --file ../../db/AllSetsArray.json
