---
title: Getting Started with AWS – Developer Associate Path
excerpt: A beginner-friendly guide to navigating AWS services, understanding IAM, and preparing for the AWS Developer Associate certification.
tags:
  - AWS
  - Cloud
  - IAM
  - Tutorial
  - Certification
  - English
category: Cloud Computing
---
To start you should make yourself an amazon dev account. https://aws.amazon.com/free
It's free

In the Console Home you'll have a lot of services like databases, front end web and mobile, servers, and security, Identity and compliance section.
Be careful about your regions because sometimes components cant interact if they are not in the same regions.
https://console.aws.amazon.com

Once you know you are ready get certified : https://aws.amazon.com/certification

This tutorial will be mostly about the developer associate certification.

## Security (IAM)
Identity and Access Management.
In this section you can give users access and attach policies to each.
Example the AdministratorAccess has all access. There's already policies created and you have to check them. You can also give access to groups. 
Users groups allow you to make a policy for a group. THe user is in the group therefore he can have access to a certain machine or has a different access.
Roles : assigne policies to a role so a service can adapt to like Lambda.
Identity provides : Services to allow user to connect themselves.

### Users
You should have a root as bases but you should always create another user with as much level as the root. 
- Add users
- give it a username (adminuser)
- give it an access key so they can connect easily
- give them a password too
- Force them to change the password on the first login
Depending on your needs add them to a user group, but for us we want to give it the same access as our root user so we use the button "Copy permissions from existing user" or you can attach existing policies.
No need for tags
Create the user. You'll see the password and secret access key. Its the only time youll be able to see this access key and password so better copy it somewhere. Email it to someone who needs it.