
# Alloy Debugging Challenge

You’ve made it this far - congratulations! The objective of this challenge is to test your debugging skills and overall expertise in relevant technologies used at Alloy.  Thus far, we've been impressed with your initial interview skills, thought process, and general know-how. To get a better understanding of your skills, however, we've designed this code challenge to test just that. To get started, we’ve attached a base starter project that is designed to meet most (but not all) of the requirements in the technical spec below.

Your task (in addition to ensuring the project functions as intended) is as follows:
- Clean up the code to support async/await network calls where applicable
- Resolve any critical bugs that prevent the application from properly functioning
- Design and implement a secure method to store any sensitive data at rest in the database
- Remove any unnecessary or legacy code

### **Respecting your time**

We value your time! This project was not designed to take greater than 1 hours. If you end up spending more than 1 hour on this, it's not your fault (and we likely did something wrong). To get around that, keep a running list of issues and solutions to how you'd solve these problems as you work on this challenge.

The goal is not to necessarily finish everything here within 1 hour but rather see how much you can complete. Feel free to take notes of things you plan on getting to along the way and how you'd resolve those issues -- your mindset and the way you approach probnlems is equally important to us!

## **Project Spec**

Create a mini workflow engine that can asynchronously make requests to external APIs. You will invoke the workflow engine via a webhook from your local machine (you'll need to expose the webhook to the internet). The goal of this challenge is to test your expertise with using different APIs. This process will simulate many of the tasks you will be involved with if hired at Alloy.

Technical Requirements:
- Should be written in Node.js and Typescript
- Use MongoDB as your database
- Package your codebase with Docker
- You will be using the Typeform and Slack API’s

## **Instructions**
1. Create sign up and login endpoints to allow users to create accounts.  Write the user accounts to the database.
2. Create a Typeform account using the free tier. Then, spin up a basic form that accepts a user’s email address. Define a webhook that listens for responses from the typeform form. When a new user submits the form, be sure to trigger your workflow.
Once a new user has submitted the form, your project should scrape the “in the news section” (that's the section on the right hand corner of the wikipedia website) from the wikipedia homepage. 
3. After scraping wikipedia, build a way to post the data you scraped from Wikipedia to Slack. You should use the Slack OAuth API to obtain an access token. The access token should be linked to a user’s database record.
4. Lastly, re-invoke this workflow once a day at 9am PST regardless if a Typeform submission is made and post the scraped data to Slack.

Deploy this code to a cloud server of your choosing. On your local machine, package the codebase within a docker container. Remember to always use best practices - don't take the quick, error prone attempt just becuase this is a demo project. We'll be evaluating not just the style of the code, but on the basis of if your techniques are production ready.

### Contact

If you have any questions, contact gregg@runalloy.com for more info.

