const cdk = require('aws-cdk-lib');
const { Template } = require('aws-cdk-lib/assertions');
const CdkLightsailCodeServer = require('../lib/cdk-lightsail-code-server-stack');

// example test. To run these tests, uncomment this file along with the
// example resource in lib/cdk-lightsail-code-server-stack.js
// test('SQS Queue Created', () => {
//   const app = new cdk.App();
//   // WHEN
//   const stack = new CdkLightsailCodeServer.CdkLightsailCodeServerStack(app, 'MyTestStack');
//   // THEN
//   const template = Template.fromStack(stack);

//   template.hasResourceProperties('AWS::SQS::Queue', {
//     VisibilityTimeout: 300
//   });
// });

test("Lightsail created",() => {
    const app = new cdk.App();
    const stack = new CdkLightsailCodeServer.CdkLightsailCodeServerStack(app, "MyTestStack");
    const template = Template.fromStack(stack);
    
    template.hasResourceProperties("AWS::Lightsail::Instance", {
        AvailabilityZone: "ap-southeast-1a",
        BlueprintId: "amazon_linux_2023",
        BundleId: "small_2_0",
        InstanceName: "code-server-instance",
        UserData: {
        "Fn::Join": [
            "",
            [
            "#!/bin/bash\nexport CODE_DOMAIN_NAME=\"",
            {
                "Fn::Join": [
                "",
                [
                    {
                    "Fn::GetAtt": [
                        "CodeServerInstance",
                        "PublicIpAddress",
                    ],
                    },
                    ".nip.io",
                ],
                ],
            },
            "\"\nexport CODE_PASSWORD=\"MyVeryLongPassword123\"\ncurl -s -L https://raw.githubusercontent.com/rioastamal/installer-vscode-for-web/main/install.sh | bash -s -- --core",
            ],
        ],
        },
    });
})
