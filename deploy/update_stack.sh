#!/bin/bash

declare STACK_NAME="uf-scheduler"

print_help() {
  echo "Usage: ${0} <formation_file>"
}

if [ -z $1 ]; then
  print_help
elif [ ! -e $1 ]; then
  echo "File does not exist: ${1}"
fi

echo "Validating stack template..."

aws cloudformation validate-template --template-body "file://${1}"

if [ $? -ne 0 ]; then
  echo ""
  echo "Template validation failed."
  exit 1
fi

echo
echo "Updating stack: ${STACK_NAME}"

aws cloudformation update-stack \
  --stack-name $STACK_NAME \
  --template-body "file://${1}" \
  --parameters ParameterKey=GithubConnectionArn,UsePreviousValue=true \
  --capabilities "CAPABILITY_IAM" \
