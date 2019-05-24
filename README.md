# F3 Services Hosted on Heroku

This is a set of api's exposed with Express to integrate with Slack.  There are currently two parts:
 * worshipplanning integration
 * slackbot integration

To effectively run this you need to install the Heroku CLI and then create a .env file with the following contents:

```
WP_USERNAME='your.wp.username@email.com'
WP_PASSWORD='your-real-wp-password'
WP_APIKEY="your WP API key"
WP_BASEURL='https://apiv2.worshipplanning.com'
COMZBOT_NAME='Comz Bot Name'
COMZBOT_TOKEN='Auth Token for Slackbot'
```
<<<<<<< HEAD

after this (with correct values), you can then run:

```heroku local```
=======
>>>>>>> c71c49ac9f0bf2026af4653f56b9a77eb970630a
