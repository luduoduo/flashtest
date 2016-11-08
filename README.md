# FlashTest

FlashTest is a tool for testing Amazon Alexa Flash Briefing skill feeds. It delivers feed items similarly to the native Flash Briefing functionality, but through the context of a skill.

## Use

FlashTest is quite simple to set up. The config.json file houses much the same information as the Flash Briefing skill Configuration page in the Amazon Developer Portal. The `url` key in each feed points to a JSON endpoint (XML/RSS is not yet supported) that follows the [Flash Briefing skill API](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/flash-briefing-skill-api-feed-reference). (The JSON files for the sample feeds are in the `feeds` folder.)

Once configured, you can simply deploy the skill to Lambda as you would any other, and load the schema and utterances into the Developer Portal. You can invoke the skill with "Alexa, open Flash Test" (might have to enunciate a bit, she tends to think you're trying to open the actual Flash Briefing.)

## Limitations

FlashTest has a couple major limitations, all relating to audio feeds. Due to Amazon's strict rules on SSML `<audio>` tags, FlashTest doesn't work with more than 5 total audio feed items, audio files must meet the `<audio>` tag 16kbps bitrate requirement, and the total length of all audio feeds cannot exceed 90 seconds. Additionally, I chose not to implement the Flash Briefing "earcon" that plays between consecutive items in the same feed as it would use up precious `<audio>` tags.

FlashTest is a fairly simple testing tool, and is no means comprehensive. Especially if any of the aforementioned limitations affect you, I suggest that once you have a properly formatted feed you switch to an actual Flash Briefing skill to test it.