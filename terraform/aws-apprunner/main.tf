terraform {
  required_version = ">= 0.13"
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_ecr_repository" "ecr-image-repo" {
  name = "nestjs-api"
}

resource "aws_apprunner_service" "app-runner-service" {
  service_name = "nestjs-api"

  source_configuration {
    authentication_configuration {
      access_role_arn = "arn:aws:iam::098208122570:role/service-role/AppRunnerECRAccessRole"
    }
    # Auto deploy when new image is pushed to ECR
    auto_deployments_enabled = true

    image_repository {
      image_configuration {
        port = "3000"
      }
      image_identifier      = "098208122570.dkr.ecr.us-east-1.amazonaws.com/nestjs-api:latest"
      image_repository_type = "ECR"
    }
  }
}
