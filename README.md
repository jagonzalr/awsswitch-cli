# awsswitch-cli

Updates current default AWS profile saved in .aws config/credentials files.

## Installation

`npm install -g awsswitch-cli`

## Usage

If you have multiple AWS profiles set up like this:

`.aws/config`

```
[default]
region=us-east-1
[profile user1]
region=us-west-1
[profile user2]
region=eu-west-2
```

`.aws/credentials`

```
[default]
aws_access_key_id=1234567890
aws_secret_access_key=qwertyuiop1234567890
[user1]
aws_access_key_id=1234567890
aws_secret_access_key=qwertyuiop1234567890
[user2]
aws_access_key_id=1234567890
aws_secret_access_key=qwertyuiop1234567890
```

Then you can switch between profiles like this:

`awsswitch user1 main`

Which will result:

`.aws/config`

```
[main]
region=us-east-1
[profile default]
region=us-west-1
[profile user2]
region=eu-west-2
```

`.aws/credentials`

```
[main]
aws_access_key_id=1234567890
aws_secret_access_key=qwertyuiop1234567890
[default]
aws_access_key_id=1234567890
aws_secret_access_key=qwertyuiop1234567890
[user2]
aws_access_key_id=1234567890
aws_secret_access_key=qwertyuiop1234567890
```

To switch back just run:

`awsswitch main user1`
