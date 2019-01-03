# Git Admin

`git-admin` is a node package that makes it easier to manage GitHub repositories, through commandline.

#### Contents

* [Installation](#installation)
* [Initial Setup](#initial-setup)
* [Usage](#usage)
  * [Repositories](#repositories)
    * [List](#list)
    * [Create](#create)
    * [Edit](#edit)
    * [Delete](#delete)
    * [Collaborators](#collaborators)
      * [Add](#add)
      * [Remove](#remove)

## Installation

It is possible to install `git-admin` through [NPM][npm] or [Yarn][yarn].

```
npm i -g git-admin
```
<small><i>An example of installing using NPM.</i></small>

```
yarn global add git-admin
```
<small><i>An example of installing using Yarn.</i></small>

## Initial Setup

Before you can do anything through `git-admin` you must create a personal acccess token. You can create one by [going here][pt], find out more [here][pt-info].

As `git-admin`'s functionality is currently based around repositories you will need to tick the `repo` checkbox, and if you want to be able to delete repos then tick the `delete_repo` checkbox.

<i>More featured are in the works, so you will have to update the token in the future.</i>

After creating a personal access token you will be presented with a code. Run the following command to store it:

```
git-admin config token <personal-access-token>
```
<small><i>An example of setting the personal access token.</i></small>

## Usage

### Repositories

The majority of the following commands require `repo` access unless specificed.

When editing or deleting a repository a confirmation prompt will appear before taking any action. Although not recommended the prompt can be skipped by adding `--force` (or `-f`, `--yes`, or `-y`).

#### List

To list repositories for your account simply run:

```
git-admin repo list
```
<small><i>An example of listing personal repositories.</i></small>

If you want to get all the repos that are visible to you for another user run:

```
git-admin repo list --user user
```
<small><i>An example of listing another user's repositories.</i></small>

If you want to get all the repos that are visible to you for an organization run:

```
git-admin repo list --org organization
```
<small><i>An example of listing an organization's repositories.</i></small>

##### Options

All options are optional.

* `--organization`, `--org`, `-o`
  * <small>String</small>
* `--user`, `-u`
  * <small>String</small>
* `--page`, `-p`
  * <small>Number (default `1`)</small>

###### Organization Options
* `--type`, `-t`
  * <small>`all` (default), `public`, `private`, `fork`, `sources`, `member`</small>

###### User Options
* `--type`, `-t`
  * <small>`all` (default), `owner`, `member`</small>
* `--sort`, `-s`
  * <small>`created`, `updated`, `pushed`, `full_name` (default)</small>
* `--direction`, `-d`
  * <small>`asc`, `desc`</small>

###### Personal options
* `--type`, `-t`
  * <small>`all` (default), `owner`, `public`, `private`, `member`</small>
* `--visibility`, `-v`
  * <small>`all` (default), `public`, `private`</small>
* `--affiliation`, `-a`
  * <small>One or combined of: `owner`, `collaborator`, `organization_member` (default all combined)</small>

<small><i>User options included</i></small>

#### Create

To create a repository for your account simply run:

```
git-admin repo create awesome-new-project
```
<small><i>An example of creating a personal public repository.</i></small>

Depending on if you are an administrator to any organizations will determine if you are able to create organization repositories.

```
git-admin repo create organization/awesome-new-project
```
<small><i>An example of creating a public organization repository. The private option can also be applied here.</i></small>

##### Options

All options are optional.

* `--private`, `-p`
  * <small>Boolean</small>

#### Edit

To edit a repository for your account simply run:

```
git-admin repo edit user/awesome-new-project
```
<small><i>An example of editing a personal repository.</i></small>

Depending on if you are an administrator to any organizations will determine if you are able to edit organization repositories. It's worth noting that even if the new name is prefixed with an organization then only the repository name will be used (`[organization/]repository`).

##### Options

All options are optional.

* `--name`, `-n`
  * <small>String</small>
* `--description`, `--desc`, `-d`
  * <small>String</small>
* `--homepage`, `--url`
  * <small>String</small>
* `--private`, `-p`
  * <small>Boolean</small>
* `--default-branch`
  * <small>String</small>

#### Delete

Deleting repositories require the `delete_repo` scope. To delete a repository for your account simply run:

```
git-admin repo delete user/repository
```
<small><i>An example of deleting a personal repository.</i></small>

Similarly if you are an organization repository admin then you can also delete organization repositories.

#### Collaborators

##### Add

To add a collaborator to your repository simply run:

```
git-admin repo user add userB user/repository
```
<small><i>An example of adding a collaborator to a personal repository.</i></small>

If you are an organization repository admin you can also do this for organization repositories.

###### Options

All options are optional.

* `--permissions`, `--perms`, `--perm`, `-p`
  * <small>`pull`, `push` (default), `admin`</small>

##### Remove

To remove a collaborator to your repository simply run:

```
git-admin repo user remove userB user/repository
```
<small><i>An example of removing a collaborator to a personal repository.</i></small>

If you are an organization repository admin you can also do this for organization repositories.

[npm]: https://npmjs.com
[yarn]: https://yarnpkg.com
[pt]: https://github.com/settings/tokens
[pt-info]: https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/