#!/usr/bin/env bash

SERVICE_NAME=${SERVICE_NAME:=""}

if [[ ${SERVICE_NAME} == "" ]]; then
    echo "SKIP DEPLOY, SERVICE NAME IS EMPTY."
    exit 0
fi

# FROM ENVIRONMENT
AWS_REGION=${AWS_DEFAULT_REGION:=eu-west-1}
BRANCH=${BRANCH:=staging}
AWS_ACCOUNT_ID=${AWS_ACCOUNT_ID:=""}
DOCKER_IMAGE_NAME=${DOCKER_IMAGE_NAME:=""}

AUTOSCALIG_GROUP=""
CLUSTER_NAME=""
ECS_ADDITIONAL_PARAMS="--force-new-deployment"

# For staging
if [[ ${BRANCH} == "staging" ]]; then
    AUTOSCALIG_GROUP=E2M-DEV
    CLUSTER_NAME=E2M-Dev
# For production
elif [[ ${BRANCH} == "prod" ]]; then
    # temporary
    AUTOSCALIG_GROUP=E2M-PROD
    CLUSTER_NAME=E2M-Prod
# Skip other branches
else
    echo "The branch '${BRANCH}' not enabled for CI/CD."
    exit 0
fi

SERVICE_NAME="$SERVICE_NAME-$BRANCH"

echo "AWS_REGION: ${AWS_REGION}."
echo "AUTOSCALIG_GROUP: ${AUTOSCALIG_GROUP}."
echo -e "CLUSTER_NAME: ${CLUSTER_NAME}.\n"
echo "SERVICE NAME: ${SERVICE_NAME}."
echo "DOCKER IMAGE NAME: ${DOCKER_IMAGE_NAME}."

# Get ECS list services arns for $SERVICE_NAME
ECS_SERVICES_ARNS=$(aws ecs list-services --cluster "${CLUSTER_NAME}" --region ${AWS_REGION} --query "serviceArns[?contains(@,'${SERVICE_NAME}')]" --no-paginate --output text)

echo "FOUND ECS SERVICES ARNS: ${ECS_SERVICES_ARNS}."

# Remove cached docker image from EC2 instances
aws ssm send-command \
  --document-name "RemoveDockerImage" \
	--document-version "\$DEFAULT" \
	--targets '[{"Key":"tag:aws:autoscaling:groupName","Values":["'${AUTOSCALIG_GROUP}'"]}]' \
	--parameters '{"DockerImage":["'${DOCKER_IMAGE_NAME}'"]}' \
	--timeout-seconds 600 --max-errors "0" \
	--cloud-watch-output-config '{"CloudWatchOutputEnabled":true,"CloudWatchLogGroupName":"/aws/ssm/'${CLUSTER_NAME}'"}' \
	--region ${AWS_REGION} > /dev/null

# Create new ECS service deployment
for ECS_SERVICE_ARN in ${ECS_SERVICES_ARNS}; do
    echo "UPDATE ECS SERVICE: ${ECS_SERVICE_ARN}."
    echo "ECS_ADDITIONAL_PARAMS: ${ECS_ADDITIONAL_PARAMS}."

    aws ecs update-service --cluster "${CLUSTER_NAME}" --service ${ECS_SERVICE_ARN} ${ECS_ADDITIONAL_PARAMS} --region ${AWS_REGION} > /dev/null
done

echo -e "DONE: ${SERVICE_NAME}.\n\n"
