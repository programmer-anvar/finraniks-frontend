#!/bin/bash

# Finranks Frontend Deployment Script
# Usage: ./deploy.sh [command]
# Commands: build, up, down, restart, logs, status, cleanup

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
COMPOSE_FILE="$SCRIPT_DIR/docker-compose.yml"
PROJECT_NAME="finranks-frontend-web"
CONTAINER_NAME="finranks-frontend-web"
IMAGE_NAME="finranks-frontend-web:latest"
ENV_FILE="$PROJECT_ROOT/.env.local"

cd "$PROJECT_ROOT"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if .env.local exists
check_env_file() {
    if [ ! -f "$ENV_FILE" ]; then
        print_error ".env.local file not found at $ENV_FILE"
        print_status "Please create .env.local with required variables:"
        echo "  NODE_ENV=production"
        echo "  NEXTAUTH_URL=https://finranks.com"
        echo "  NEXTAUTH_SECRET=your_secret_here"
        echo "  GOOGLE_CLIENT_ID=your_google_client_id"
        echo "  GOOGLE_CLIENT_SECRET=your_google_client_secret"
        echo "  NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id"
        exit 1
    fi
}

# Function to cleanup existing
cleanup_existing() {
    print_status "Cleaning up existing container and image..."

    # Stop container if running
    if docker ps -q -f name="$CONTAINER_NAME" | grep -q .; then
        print_status "Stopping container: $CONTAINER_NAME"
        docker stop "$CONTAINER_NAME" || true
    fi

    # Remove container if exists
    if docker ps -aq -f name="$CONTAINER_NAME" | grep -q .; then
        print_status "Removing container: $CONTAINER_NAME"
        docker rm "$CONTAINER_NAME" || true
    fi

    # Remove image if exists
    if docker images -q "$IMAGE_NAME" | grep -q .; then
        print_status "Removing image: $IMAGE_NAME"
        docker rmi "$IMAGE_NAME" || true
    fi
}

# Function to build and deploy
build_and_deploy() {
    print_status "Building and deploying Finranks Frontend..."

    check_env_file
    cleanup_existing

    # Build with no cache
    print_status "Building Docker image..."
    docker compose -f "$COMPOSE_FILE" -p "$PROJECT_NAME" --env-file "$ENV_FILE" build --no-cache

    # Start the service
    print_status "Starting Finranks service..."
    docker compose -f "$COMPOSE_FILE" -p "$PROJECT_NAME" --env-file "$ENV_FILE" up -d

    # Wait for container to start
    sleep 5

    if docker ps | grep -q "$CONTAINER_NAME"; then
        print_success "Finranks deployed successfully!"
        print_status "Container is running with ID: $(docker ps -q -f name=$CONTAINER_NAME)"

        # Show deployment info
        echo ""
        print_status "Deployment Information:"
        echo "==========================================="
        echo "  Service: Finranks Frontend"
        echo "  Container: $CONTAINER_NAME"
        echo "  Network: finranks-frontend-web-network"
        echo "  Port: 3001"
        echo ""
        echo "  Endpoints:"
        echo "    - http://localhost:3001"
        echo ""

        # Show recent logs
        print_status "Recent logs:"
        docker logs --tail 20 $CONTAINER_NAME
    else
        print_error "Deployment failed! Container is not running."
        print_status "Checking logs for errors..."
        docker logs $CONTAINER_NAME 2>/dev/null || print_warning "No logs available"
        exit 1
    fi

    print_success "Deployment completed successfully!"
    echo ""
    print_status "Useful commands:"
    echo "  docker logs -f $CONTAINER_NAME           # Follow logs"
    echo "  docker stats $CONTAINER_NAME             # Monitor resources"
    echo "  docker exec -it $CONTAINER_NAME /bin/sh  # Access container shell"
    echo ""
}

# Function to show logs
show_logs() {
    print_status "Showing Finranks logs..."
    docker logs "$CONTAINER_NAME" -f
}

# Function to show status
show_status() {
    print_status "Container status:"
    if docker ps -q -f name="$CONTAINER_NAME" | grep -q .; then
        docker ps -f name="$CONTAINER_NAME" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
        echo
        print_status "Container details:"
        docker inspect "$CONTAINER_NAME" --format='Status: {{.State.Status}}' || echo "Unable to get details"
    else
        print_warning "Container $CONTAINER_NAME is not running"
    fi
}

# Function to restart service
restart_service() {
    print_status "Restarting Finranks service..."
    docker compose -f "$COMPOSE_FILE" -p "$PROJECT_NAME" restart
    print_success "Finranks service restarted!"
}

# Function to stop service
stop_service() {
    print_status "Stopping Finranks service..."
    docker compose -f "$COMPOSE_FILE" -p "$PROJECT_NAME" down
    print_success "Finranks service stopped!"
}

# Function to start existing service
start_service() {
    print_status "Starting Finranks service..."
    check_env_file
    docker compose -f "$COMPOSE_FILE" -p "$PROJECT_NAME" --env-file "$ENV_FILE" up -d
    print_success "Finranks service started!"
}

# Main command handler
case "${1:-build}" in
    "build"|"rebuild")
        build_and_deploy
        ;;
    "up"|"start")
        start_service
        ;;
    "down"|"stop")
        stop_service
        ;;
    "restart")
        restart_service
        ;;
    "logs")
        show_logs
        ;;
    "status")
        show_status
        ;;
    "cleanup")
        cleanup_existing
        print_success "Cleanup completed!"
        ;;
    *)
        echo "Finranks Frontend Deployment Script"
        echo
        echo "Usage: $0 [command]"
        echo
        echo "Commands:"
        echo "  build/rebuild - Build and deploy (default)"
        echo "  up/start      - Start existing service"
        echo "  down/stop     - Stop service"
        echo "  restart       - Restart service"
        echo "  logs          - Show logs (follow mode)"
        echo "  status        - Show container status"
        echo "  cleanup       - Remove container and image"
        echo
        echo "Examples:"
        echo "  $0 build     # Build and deploy"
        echo "  $0 logs      # Follow logs"
        echo "  $0 status    # Check status"
        echo
        exit 1
        ;;
esac
