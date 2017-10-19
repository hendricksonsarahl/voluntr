# Voluntr
## Current Version: 0.18.0
<b> A web app that provides a simple platform for nonprofits to connect with potential volunteers</b>

# Table of Contents
1. [Elevator Pitch](#elevator-pitch)
2. [Brief](#brief)
3. [Wireframes](#wireframes)
4. [Pageflow Diagrams](#pageflow-diagrams)
5. [User Stories](#user-stories)
6. [Testing Plan](#testing-plan)

## Elevator Pitch
<div>
<p>This app serves two customers with complementary needs - Nonprofit Organizations and people who want to volunteer their time. </p>
<b> A Platform for Nonprofits </b>
<p>Many Nonprofit organizations have needs for an increased volunteer base and traditional outreach can often be too costly and time consuming with their limited resources. Voluntr provides a simple platform where a nonprofit can post a volunteer opportunity in seconds while the app takes care of the rest! </p>
<b> A Simple Resource for Volunteers </b>
<p>People looking to volunteer at a nonprofit often have barriers to being able to volunteer - limited time, limited knowledge of what opportunities are available, a desire to work with a specific group or mission, and more - and scouring the Internet alone can be inefficient and overwhelming. Voluntr will allow volunteers to search according to what's important to them and find opportunities and organizations that fit all of their needs in one quick and simple app!</p>
</div>

## Brief
<div>
<b>The goals of this project are as follows:</b>
  <ul>
    <li>Offer SaaS (Software as a Service) for Nonprofit Organizations via a responsive web app</li>
    <li>Provide an easy to use location-based search platform for potential volunteers via a responsive web app</li>
    <li>Create a working MVP with a UI that is clean, simple and easy to navigate</li>
    <li>Ensure the success of our goals and ease of future additions by following collaboration best practices</li>
  </ul>

We are targetting both Nonprofit Organizations and potential volunteers. 
<p> Our <b>Nonprofit audience</b> includes any category of nonprofit organization which is in need of volunteers in any capacity: long term, short term, part time, full time, single event and recurring events. Examples of nonprofits that can find value in our platform: animal shelters and services, food banks, civic organizations, religious organizations and churches, shelters and services for houseless persons, donation drives, fundraising events and more.</p>

<p>Our <b>Volunteer audience</b> includes teens and adults of any socioeconomic class, age, race, ability level and skill level who have access to a mobile device or computer. The demographic location will depend on what nonprofits sign up for the platform. We will first release the app in the Portland, Oregon region with a stretch goal of expanding to have local options available in all metropolitan areas in the United States. </p>

<p>Both Nonprofit and Volunteer users will be able to access the app through our website on a computer, smartphone or tablet with a stretch goal of releasing this for download as a mobile app. We hope to achieve a clean, simple and modern look and feel. For both Nonprofit and Volunteer users, functionality and ease of use are the main UI goals. On the volunteer side, we are inspired to design a clean user-friendly interface for cycling through potential Nonprofit matches that is similar in feel and function to Tinder.</p>

<p>A noteworthy competitor already in this space is <a href="http://www.volunteermatch.com">volunteermatch.com</a>. Though we recognize that many users have successfully used their platform to serve their needs, we feel that there are key features that we can improve upon: </p>
  <ul>
    <li>Offer a simplified space for Nonprofits to interact with and use the site directly</li>
    <li>Simplify the search parameters and tools for potential volunteers</li>
    <li>Make the UI cleaner and simpler</li>
    <li>Offer improved responsive design for use on mobile devices</li>
  </ul>
</div>

## Wireframes

![First Sprint Wireframe](./assets/voluntr_wireframe.jpg)

## Pageflow Diagrams

![First Sprint Pageflow Diagrams page1](./assets/voluntr_page_flows.png)
![First Sprint Pageflow Diagrams page2](./assets/voluntr_page_flows2.png)
![First Sprint Pageflow Diagrams page3](./assets/voluntr_page_flows3.png)

## User Stories
<div>

| As a new visitor, I can... | Goal |
| --- | --- |
| discover the app and learn about it's purpose and options | MVP |
| easily find the relevant half of the app to use (volunteer vs organization). | MVP |

</div>

<div>

| As a Volunteer, I can... | Goal |
| --- | --- |
| view available volunteer opportunities, including photo, non-profit name, and volunteer position title so that I can quickly find opportunities that apply to me without having to sign up  | MVP  |
| set and edit preferences of when, where and what I will be doing while volunteering so I don’t have to search through many postings that don’t meet my interests. | MVP  |
| see that the results list includes opportunities that match my preferences  | MVP  |
| get contact information for volunteer organizations so that I can get in touch outside of the app to discuss opportunities further  | MVP  |
| remove a saved opportunity from my list  | MVP  |

</div>

<div>

| As a Nonprofit, I can... | Goal |
| --- | --- |
| register my organization on Voluntr. | MVP |
| easily submit open volunteer opportunities. | MVP |
| edit or remove a posted opportunity  | MVP  |
| view the list of posted opportunities that are open  | MVP  |
| view and edit profile settings for my organization, including name, contact email, and any other profile data  | MVP  |
| log in to my existing account and logout when I'm done  | MVP  |

</div>

## Testing Plan

We will use manual testing to verify our scenarios, and document the results here:

<div>

| As a new visitor, I can... | Status |
| --- | --- |
| discover the app and learn about it's purpose and options | Passing :white_check_mark: |
| easily find the relevant half of the app to use (volunteer vs organization). | Passing :white_check_mark: |

</div>

<div>

| As a Volunteer, I can... | Status |
| --- | --- |
| view available volunteer opportunities, including photo, non-profit name, and volunteer position title so that I can quickly find opportunities that apply to me without having to sign up  | Not Passing :red_circle: |
| set and edit preferences of when, where and what I will be doing while volunteering so I don’t have to search through many postings that don’t meet my interests. | Not Passing :red_circle: |
| see that the results list includes opportunities that match my preferences  | Not Passing :red_circle: |
| get contact information for volunteer organizations so that I can get in touch outside of the app to discuss opportunities further  | Not Passing :red_circle: |
| remove a saved opportunity from my list  | Not Passing :red_circle: |

</div>

<div>

| As a Nonprofit, I can... | Status |
| --- | --- |
| register my organization on Voluntr. | Not Passing :red_circle: |
| easily submit open volunteer opportunities. | Not Passing :red_circle: |
| edit or remove a posted opportunity  | Not Passing :red_circle: |
| view the list of posted opportunities that are open  | Not Passing :red_circle: |
| view and edit profile settings for my organization, including name, contact email, and any other profile data  | Not Passing :red_circle: |
| log in to my existing account and logout when I'm done  | Not Passing :red_circle: |

</div>

Our stretch goal will be to include some unit and acceptance tests using pytest and pytest-BDD.  