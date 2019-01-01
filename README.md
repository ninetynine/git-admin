# Git Admin

`git-admin` is a node package that makes it easier to manage GitHub repositories, through commandline.

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

#### Create

To create a repository for your account simply run:

```
git-admin repo create awesome-new-project
```
<small><i>An example of creating a personal public repository.</i></small>

If you are a premium GitHub account holder you are able to create private repositories by adding the `--private` (or `-p`) option.

```
git-admin repo create awesome-new-project --private
```
<small><i>An example of creating a personal private repository.</i></small>

Depending on if you are an administrator to any organizations will determine if you are able to create organization repositories.

```
git-admin repo create ninetynine/awesome-new-project
```
<small><i>An example of creating a public organization repository. The private option can also be applied here.</i></small>

#### Edit

To edit a repository for your account simply run:

Both `--name` (or `-n`) and `--private` (or `-p`) are optional, although one should be passed.

```
git-admin repo edit user/awesome-new-project --name radical-new-project --private true
```
<small><i>An example of renaming, and making private, a personal public repository.</i></small>

If you are an organization repository admin then you can also edi organization repositories. It's worth noting that even if the new name is prefixed with an organization then only the repository name will be used (`[organization/]repository`).

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

By default the user will be given `push` access. You can specify `---permissions` (or `--perms`, `--perm`, or `-p`) with either: `pull` (read-only), `push` (normal access), `admin` (admin access).

If you are an organization repository admin you can also do this for organization repositories.

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