# Contributing

When contributing to the [Voluntr repository](https://github.com/hendricksonsarahl/voluntr), please discuss the change and track your notes and progress via [issues](https://github.com/hendricksonsarahl/voluntr/issues). Please assign yourself to any issue you are working on, whether created by you or someone else.

If you need to get the project running on your machine, first see our [setup documentation](https://github.com/hendricksonsarahl/voluntr/blob/master/SETUP.md).

Please see the [Code of Conduct](#code-of-conduct) included therein and follow it in all interactions with the Voluntr team.

# Table of Contents
1. [Pull Request Process](#pull-request-process)
2. [Semantic Versioning](#semantic-versioning)
3. [Code of Conduct](#code-of-conduct)

## Pull Request Process

1. Make sure to update the [README.md](https://github.com/hendricksonsarahl/voluntr/blob/master/README.md) if changes to the interface are made. Include any new environment 
   variables, useful file locations and any additional requirements needed to operate the app.
2. Increase the appropriate version numbers in the README.md to the new version that this
   Pull Request would represent using the SemVer versioning scheme (see Semantic Versioning below for more details). 
3. You may merge the Pull Request in once you have the approval of two other developers.

### Pull - Branch - Push - PR - Merge

We are using a Feature Branch Workflow as defined in this [Atlassian Guide](https://www.atlassian.com/git/tutorials/comparing-workflows#feature-branch-workflow). Follow this basic proceedure:

- Make sure your local Master branch is up to date with the remote Master branch

```sh
  	git pull
```
- Create a new branch for the feature or issue you are working on OR switch to your development branch

```sh
	git branch landingpage
```
```sh
	git checkout landingpage
```
- Commit your changes as you make progress and when your feature is complete, push your branch to the remote repository

```sh
	git push origin landingpage
```
- Go to the [pull requests](https://github.com/hendricksonsarahl/voluntr/pulls) page in the Voluntr repo and create a new pull request by selecting your newly updated remote branch

- Once your PR is created, request reviews from collaborators by using the Request feature on the PR page 

- When two or more developers have approved your pull request, you can merge it into master


## Semantic Versioning


The versioning scheme we use is [SemVer](http://semver.org/).

In example version **1.2.3**: 3 is the Patch Number, 2 is the Minor Number and 1 is the Major Number

* Increment the **patch version number** when you ship a bug fix, e.g.: “fixed bug where Home link redirects to the wrong page”.

* Increment the **minor version number** when adding a new feature, e.g.: “added support for underlined text”.

* Increment the **major version number** when you significantly overhaul the user interface, or rewrite all internals. E.g.: “Toolbars use too much screen estate. The UI is now provided through touch gestures only” – such a change would break existing workflows.


## Code of Conduct

### Our Pledge

In the interest of fostering an open and welcoming environment, we as
contributors and maintainers pledge to making participation in our project and
our community a harassment-free experience for everyone, regardless of age, body
size, disability, ethnicity, gender identity and expression, level of experience,
nationality, personal appearance, race, religion, or sexual identity and
orientation.

### Our Standards

Examples of behavior that contributes to creating a positive environment
include:

* Using welcoming and inclusive language
* Being respectful of differing viewpoints and experiences
* Gracefully accepting constructive criticism
* Focusing on what is best for the community
* Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

* The use of sexualized language or imagery and unwelcome sexual attention or
advances
* Trolling, insulting/derogatory comments, and personal or political attacks
* Harassment of any kind (public or private)
* Publishing others' private information, such as a physical or electronic
  address, without explicit permission
* Other conduct which could reasonably be considered inappropriate in a
  professional setting

### Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable
behavior and are expected to take appropriate and fair corrective action in
response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or
reject comments, commits, code, edits, issues, and other contributions
that are not aligned to this Code of Conduct, or to ban temporarily or
permanently any contributor for other behaviors that they deem inappropriate,
threatening, offensive, or harmful.

### Scope

This Code of Conduct applies both within project spaces and in public spaces
when an individual is representing the project or its community. Examples of
representing a project or community include using an official project e-mail
address, posting via an official social media account, or acting as an appointed
representative at an online or offline event. Representation of a project may be
further defined and clarified by project maintainers.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported by contacting any project team member. Each core developer in this project is self managed and has full ability to fulfill any necessary issue arbitration. It is encouraged that reporters seek out whomever they are comfortable speaking to. All
complaints will be reviewed and investigated and will result in a response that
is deemed necessary and appropriate to the circumstances. The project team is
obligated to maintain confidentiality with regard to the reporter of an incident, unless the reporter deems open communication necessary.
Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good
faith may face temporary or permanent repercussions as determined by other
members of the project's leadership.

### Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 1.4,
available at [http://contributor-covenant.org/version/1/4][version]

[homepage]: http://contributor-covenant.org
[version]: http://contributor-covenant.org/version/1/4/