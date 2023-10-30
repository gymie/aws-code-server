#!/bin/bash

instance_name="code-server"
availability_zone="ap-southeast-1a"
bundle_id="small_3_0"
blueprint_id="amazon_linux_2023"

while [[ $# -gt 0 ]]; do
    case "$1" in
        --instance-name)
            instance_name="$2"
            shift 2
            ;;
        --blueprint-id)
            blueprint_id="$2"
            shift 2
            ;;
        --availability-zone)
            availability_zone="$2"
            shift 2
            ;;
        --bundle-id)
            bundle_id="$2"
            shift 2
            ;;
        *)
            echo "Unknown option: $1"
            exit 1
            ;;
    esac
done

detect_strong_password() {
  local PASSWORD="$1"
  
  [ $( printf "$PASSWORD" | wc -c ) -lt 12 ] && {
    printf "Error: Password is less than 12 characters.\n" >&2
    return 1 
  }
  
  [ $( printf "$PASSWORD" | grep '[0-9]' ) ] || {
    printf "Error: Password must contain a digit.\n" >&2
    return 2
  }
  
  [ $( printf "$PASSWORD" | grep '[a-z]' ) ] || {
    printf "Error: Password must contain a lowercase letter.\n" >&2
    return 2
  }
  
  [ $( printf "$PASSWORD" | grep '[A-Z]' ) ] || {
    printf "Error: Password must contain an uppercase letter.\n" >&2
    return 2
  }

  return 0
}

# Check if an instance with the same name exists
instance_exists=$(aws lightsail get-instance --instance-name $instance_name --query 'instance' --output text 2>/dev/null)

if [ -n "$instance_exists" ]; then
    echo "An instance with the name '$instance_name' already exists."
    echo

    read -p "Do you want to delete it? (y/n): " choice
    if [ "$choice" == "y" ]; then
        # Delete the existing instance
        aws lightsail delete-instance --instance-name $instance_name --query 'operations[0].{Resource:resourceName,OperationType:operationType,Status:status}' --output text
    else
        echo "Exiting script. No changes made."
        exit 0
    fi
fi

read -p "Do you want to create a new $instance_name instance? (y/n): " choice
if [ "$choice" == "n" ]; then    
    echo "Exiting script. No changes made."
    exit 0
fi

echo
# Check password strength
password=""
while true; do
  read -p "Please enter your password for Code Server: " password 
  detect_strong_password "$password" && break
done

echo "Strong password accepted: $password"
echo
echo "Start creating your $instance_name instance on $availability_zone with $bundle_id bundle and $blueprint_id blueprint..."
echo

user_data_script=$(cat <<EOF
#!/bin/bash
export CODE_DOMAIN_NAME="\$(curl -s https://api.ipify.org).nip.io"
export CODE_PASSWORD="$password"
curl -s -L https://raw.githubusercontent.com/rioastamal/installer-vscode-for-web/main/install.sh | bash -s -- --core
EOF
)

# Create the Lightsail instance
aws lightsail create-instances \
    --instance-names $instance_name \
    --availability-zone $availability_zone \
    --blueprint-id $blueprint_id \
    --bundle-id $bundle_id \
    --query 'operations[0].{Resource:resourceName,OperationType:operationType,Status:status}' \
    --output text \
    --user-data "$user_data_script"

# Wait for the instance to be in the "running" state
while true; do
    state=$(aws lightsail get-instance --instance-name $instance_name --query 'instance.state.name' --output text)
    if [ "$state" == "running" ]; then
        break
    fi
    sleep 10
done

# Open additional port 443 (HTTPS)
aws lightsail open-instance-public-ports \
    --port-info fromPort=443,toPort=443,protocol=TCP \
    --instance-name $instance_name \
    --query 'operation.{Resource:resourceName,OperationType:operationType,Status:status}' \
    --output text

# Get the public IP of the instance
public_ip=$(aws lightsail get-instance --instance-name $instance_name --query 'instance.publicIpAddress' --output text)

# Output the Code Server URL
echo "Here is your Code Server URL: https://$public_ip.nip.io"


