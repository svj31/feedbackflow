FeedbackFlow – Student Feedback Microservice System

FeedbackFlow is a microservice-based Student Feedback and Rating System deployed across multiple Virtual Machines using Oracle VirtualBox. The application demonstrates core concepts of virtualization, VM networking, service isolation, and inter-service communication. Users can submit feedback in the form of ratings and optional comments, and view analytics such as total submissions and average rating through a single frontend interface.


System Architecture

The system is deployed using three Virtual Machines, each assigned a clear responsibility.

High-levelflow:
1. User accesses the frontend hosted on VM1
2. Feedback submissions are forwarded to the Feedback Service (VM2)
3. Feedback data is stored in a central database hosted on VM3
4. Analytics requests are handled by the Analytics Service (VM3)
5. Results are returned to the frontend and displayed to the user


Virtual Machine Roles

1. VM1 – API Gateway / Frontend
Hosts the React frontend application and acts as the single entry point for users
It also forwards Feedback requests to VM2, Analytics requests to VM3

2. VM2 – Feedback Service
Handles feedback submission, Validates input data
It also forwards feedback to the database through VM3

3. VM3 – Analytics Service + Database
Hosts the SQLite database and computes:
Total feedback count
Average rating
Serves analytics data to VM1


Network Configuration

Each VM is configured with dual network adapters:
NAT	Internet access (package installation)
Host-only Adapter	Inter-VM communication
All service-to-service communication uses Host-only IPs
This setup ensures isolation while allowing controlled communication

Ports Used
Frontend (VM1)	3000
Feedback Service (VM2)	8001
Analytics Service (VM3)	8002


Deployment Summary

Local Development
Services run on localhost using different ports and the same codebase is used during VM deployment

VM Deployment
Only backend URLs are updated: localhost → VM_IP
No changes to application logic done

FeedbackFlow successfully demonstrates VM-based microservice deployment with networking and service orchestration.