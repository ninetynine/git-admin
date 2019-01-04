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
      * [List](#list-1)
        * [Inactive](#list-inactive)
      * [Add](#add)
      * [Remove](#remove)
  * [Modules](#modules)
      * [Basic Command](#basic-command)

## Installation

It is possible to install `git-admin` through [NPM][npm] or [Yarn][yarn].

```
# An example of installing using NPM
npm i -g git-admin
```

```
# An example of installing using Yarn
yarn global add git-admin
```

<hr />

## Initial Setup

Before you can do anything through `git-admin` you must create a personal acccess token. You can create one by [going here][pt], find out more [here][pt-info].

As `git-admin`'s functionality is currently based around repositories you will need to tick the `repo` checkbox, and if you want to be able to delete repos then tick the `delete_repo` checkbox.

<i>More featured are in the works, so you will have to update the token in the future.</i>

After creating a personal access token you will be presented with a code. Run the following command to store it:

```
# An example of setting the personal access token
git-admin config token <personal-access-token>
```

<hr />

## Usage

### Repositories

The majority of the following commands require `repo` access unless specificed.

When editing or deleting a repository a confirmation prompt will appear before taking any action. Although not recommended the prompt can be skipped by adding `--force` (or `-f`, `--yes`, or `-y`).

#### List

To list repositories for your account simply run:

```
# An example of listing personal repositories
git-admin repo list
```

If you want to get all the repos that are visible to you for another user run:

```
# An example of listing another user's repositories
git-admin repo list --user user
```

If you want to get all the repos that are visible to you for an organization run:

```
# An example of listing an organization's repositories
git-admin repo list --org organization
```

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

<hr />

#### Create

To create a repository for your account simply run:

```
# An example of creating a personal public repository
git-admin repo create awesome-new-project
```

Depending on if you are an administrator to any organizations will determine if you are able to create organization repositories.

```
# An example of creating a public organization repository. The private option can also be applied here
git-admin repo create organization/awesome-new-project
```

##### Options

All options are optional.

* `--private`, `-p`
  * <small>Boolean</small>

<hr />

#### Edit

To edit a repository for your account simply run:

```
# An example of editing a personal repository
git-admin repo edit user/awesome-new-project
```

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

<hr />

#### Delete

Deleting repositories require the `delete_repo` scope. To delete a repository for your account simply run:

```
# An example of deleting a personal repository
git-admin repo delete user/repository
```

Similarly if you are an organization repository admin then you can also delete organization repositories.

<hr />

#### Collaborators

##### List

To list collaborators for a repository simply run:

```
# An example of listing collaborators for a repository
git-admin repo user list user/repository
```

###### Options

* `--page`, `-p`
  * <small>Number (default `1`)</small>

<hr />

##### List Inactive

To find inactive users for a repository simply run:

```
# An example of finding all inactive collaborators, who haven't commited in a month, to a repository
git-admin repo user inactive user/repository
```

If you have admin permissions on a repository you can also use `--prune` to automatically remove any users found:

```
# An example of finding all inactive collaborators, who haven't commited in a month, to a repository and removing them automatically
git-admin repo user inactive user/repository --prune
```

###### Options

* `--sha`, `--branch`, `-b`
  * <small>String (default `master`)</small>
* `--until`, `--from`, `-u`
  * <small>Date (default previous month from current date), expected format: `MM-DD-YYYY`. Check out [dayjs][dayjs] for more parsing information</small>
* `--prune`, `-p`
  * <small>Boolean</small>

<hr />

##### Add

To add a collaborator to your repository simply run:

```
# An example of adding a collaborator to a personal repository
git-admin repo user add userB user/repository
```

If you are an organization repository admin you can also do this for organization repositories.

###### Options

All options are optional.

* `--permissions`, `--perms`, `--perm`, `-p`
  * <small>`pull`, `push` (default), `admin`</small>

<hr />

##### Remove

To remove a collaborator to your repository simply run:

```
# An example of removing a collaborator to a personal repository
git-admin repo user remove userB user/repository
```

If you are an organization repository admin you can also do this for organization repositories.

<hr />

### Modules

Modules allow `git-admin` to be extended easily. `git-admin` looks for a directory in your home directory:

```
# Node's `os.homedir` is used for finding your home directory
$HOME/.git-admin/modules
```

Within the modules directory `git-admin` checks for any directories and attempts to require them, because of this you are able to create whatever commands with whatever complexity you want. Check out Yarg's [command module][cm] documentation.

Modules should follow a naming convention as restriction may need to be added in the future.

> git-admin-module-[module-name]

Just make sure that your `package.json` [main][npm-main] is pointing to the entrypoint for your command(s).

#### Basic Command:
```js
// An example of a barebones command
// $HOME/.git-admin/modules/git-admin-module-example/index.js

exports.command = 'example';
exports.desc = 'Example module command';

exports.handler = () => console.warn('hello, world');
```

[npm]: https://npmjs.com
[npm-main]: https://docs.npmjs.com/files/package.json#main
[yarn]: https://yarnpkg.com
[pt]: https://github.com/settings/tokens
[pt-info]: https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/
[cm]: https://github.com/yargs/yargs/blob/master/docs/advanced.md#providing-a-command-module
[dayjs]: https://github.com/iamkun/dayjs/blob/master/docs/en/API-reference.md#constructor-dayjsexisting-string--number--date--dayjs