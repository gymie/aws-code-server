const { Stack, CfnOutput, CfnParameter } = require("aws-cdk-lib");
// const sqs = require('aws-cdk-lib/aws-sqs');
const { aws_lightsail } = require("aws-cdk-lib");

class CdkLightsailCodeServerStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const instance_name = new CfnParameter(this, "instance_name", {
      type: "String",
      description: "The name of the instance",
      default: "code-server-instance",
    });

    const instance_blueprint = new CfnParameter(this, "blueprint_id", {
      type: "String",
      description: "The blueprint ID of the instance",
      default: "amazon_linux_2023",
    });

    const instance_bundle = new CfnParameter(this, "bundle_id", {
      type: "String",
      description: "The bundle ID of the instance",
      default: "small_3_0",
    });

    const instance_az = new CfnParameter(this, "availability_zone", {
      type: "String",
      description: "The availability zone of the instance",
      default: "ap-southeast-1a",
    });

    const password = new CfnParameter(this, "password", {
      type: "String",
      description: "The password for the code-server",
      default: "MyVeryLongPassword123",
      noEcho: true,
      allowedPattern: "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{12,}$",
      constraintDescription:
        "Password must be at least 12 characters long, and contain at least one number, one uppercase letter, and one lowercase letter.",
    });

    const userData = `
          #!/bin/bash
          export CODE_DOMAIN_NAME="\$(curl -s https://api.ipify.org).nip.io"
          export CODE_PASSWORD="${password.valueAsString}"
          curl -s -L https://raw.githubusercontent.com/rioastamal/installer-vscode-for-web/main/install.sh | bash -s -- --core`;

    // The code that defines your stack goes here
    const code_server_instance = new aws_lightsail.CfnInstance(
      this,
      "CodeServerInstance",
      {
        instanceName: instance_name,
        blueprintId: instance_blueprint,
        bundleId: instance_bundle,
        userData: userData,
        availabilityZone: instance_az,
        networking: {
          ports: [
            {
              protocol: "tcp",
              fromPort: 80,
              toPort: 80,
            },
            {
              protocol: "tcp",
              fromPort: 443,
              toPort: 443,
            },
          ],
        },
      }
    );

    new CfnOutput(this, "CodeServerInstancePublicIp", {
      description: "Here is your Code Server URL:",
      value: `https://${code_server_instance.attrPublicIpAddress}.nip.io`,
    });
  }
}

module.exports = { CdkLightsailCodeServerStack };
