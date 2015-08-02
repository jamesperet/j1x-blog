---
layout: post
title:  "Atom Editor Awesome Setup"
date:   2015-06-15 22:30:00
categories: jekyll update
---

![James Peret's Atom Editor Layout]({{ site.url }}/assets/atom-editor-james-1.png)

Recently i have switched my programming environment from [Text Mate](https://macromates.com/) to the HTML5 based [Atom IDE](https://atom.io) made by **GitHub**. It's an awesome code editor with lots of plugins and themes.

Everything in the editor is customizable from the layout to shortcut keys. And its easy to customize it to your needs or even create new plugins.

The feature that i like the most in this app is the ability to have a web browser inside the IDE for live preview of your work.

## Installing the app

Download the app [here](https://atom.io/). Its available for **Mac**, **Windows** and **Linux**. Atom already comes with about 70 plugins installed that do many things like syntax highlight for diferent languages, the autocomplete function or the status bar.

If you have [node.js](https://nodejs.org/) installed, then after downloading and installing Atom, launch it and click on **"Install shell commands"** in the app menu.

## Customizing

Open the preferences pane by clicking in **preferences** on the app menu or by pressing ```CMD + ,``` on mac or ```CTRL + ,``` on windows.

Use the packages tab to install plugins and the themes tab to view and install themes. Its possible to browse the Atom plugins thru their website too.

Atom has two types of themes: Editor UI themes and syntax highlight themes. There are also plugins, witch can add or change any aspect of the editor.

### James Peret's Package List

This is my current list of packages for the Atom Editor. Since Atom is in constant development, some packages may be depreciated.

##### Themes

* [Graphite-UI](https://atom.io/packages/graphite-ui) - Cool dark UI.
* [railscast-theme](https://atom.io/themes/railscast-theme) - Syntax highlight theme based on the RailsCast TextMate theme.

##### Packages

* [web-browser](https://atom.io/packages/web-browser) - A chrome browser inside a atom tab.
* [term2](https://atom.io/packages/term2) - Run a shell session inside a atom tab. Needs iTerm2 installed.
* [file-icons](https://atom.io/packages/file-icons) - Package with diferent icons for each file type.
* [pane-layout-plus](https://atom.io/packages/pane-layout-plus) - Shortcut keys for changing to different pane layout setups.
* [pigments](https://atom.io/packages/pigments) - Displays inline colors on code.
* [project-manager](https://atom.io/packages/project-manager) - Actions for saving, and switching between projects.
* [project-sidebar](https://atom.io/packages/project-sidebar) - Toolbar for quickly switching between projects.
* [git-tab-status](https://atom.io/packages/git-tab-status) - Color codes tabs based on the file's git status.
* [less-than-slash](https://atom.io/packages/less-than-slash) - Automatic closing of HTML tags when ```</``` is typed.
* [wordcount](https://atom.io/packages/wordcount) - Display the word count in the status bar.
* [markdown-preview-opener](https://atom.io/packages/markdown-preview-opener) - Opens the markdown-preview pane automatically when a markdown file is opened.
* [markdown-scroll-sync](https://atom.io/packages/markdown-scroll-sync) - Auto-scroll markdown-preview tab to match markdown source.
* [maybs-quit](https://atom.io/packages/maybs-quit) - Alert message before closing the app.
* [time-status](https://atom.io/packages/time-status) - Displays the current time in the status bar.
* [wakatime](https://atom.io/packages/wakatime) - Automatic time tracking.
* [toggle-tabs](https://atom.io/packages/toggle-tabs) - Toggle tabs visibility.
* [pane-info](https://atom.io/packages/pane-info) - Show filename in each pane.
* [rails-partials](https://atom.io/packages/rails-partials) - Generate a rails partial from selected text.

### Custom Key Bindings

Its really easy to create your own keyboard shortcuts. Click on the menu item **"Open Your Keymap"**. This will open a ```keymap.cson``` file. To create your key bindings, just add the key combination and action to the ```body``` object:

    'body':
      'f6': 'status-bar:toggle'
      'ctrl-tab': 'pane:show-next-item'
      'ctrl-shift-tab': 'pane:show-previous-item'
      'ctrl-alt-tab' : 'window:focus-next-pane'
      'ctrl-alt-shift-tab' : 'window:focus-previous-pane'
      'ctrl-alt-cmd-p' : 'project-sidebar:toggle'

To find the correct action name, use the Atom action navigator. Open it with ```CMD + Shift + P``` on mac or ```CTRL + Shift + P``` on windows.

### Custom CSS

In the same way that modifying keybindings, its possible to modify Atom's styles. Click on the menu item **"Open Your Stylesheet"**. This will open a ```styles.less``` file. Here you can override any of Atoms CSS classes.

Here is my stylesheet with some overrides:

    atom-workspace .browser-page webview {
      margin: 0px;
    }

    webview {
      margin: 0px;
    }

    .pane-info {
      margin-right: 12px;
      margin-top: 8px;
    }

    .right.tool-panel.panel-right {
      background-color: #2B2E31;
    }

    .project-sidebar.padded {
      background-color: #3a3e42;
      line-height: 32px;
      height: 40px;
      padding: 0px;
      color: #ffffff;
    }

    .project-sidebar.padded h1 {
      margin: 0px;
      padding: 0px;
      height: 40px;
      font-size: 13px;
      font-weight: 400;
      padding-top: 16px;
      padding-left: 8px;
    }

    .project-sidebar.padded li {
      padding-left: 8px;
      padding-right: 10px;
    }

    body {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      /*text-rendering: optimizeLegibility; */
    }

    .tree-view-resizer, .editor {
      ::-webkit-scrollbar {
      width: 0.5em;
      height: 0.5em;
    }

    ::-webkit-scrollbar-track {
      background-color: #303030;
    }

    ::-webkit-scrollbar-thumb {
      background-color: lighten(#303030, 15%);
    }


To find what classes to modify, you can use the **Chrome Developer Tools** inside Atom. To open the panel press ```CMD + Option + i``` on a mac or ```CTRL + Option + i``` on windows. Then you can use the magnifying glass tool to click on any element of the Atom IDE layout and see its HTML and CSS classes.



## Shortcut Keys (mac)

##### Basic Atom shortcut keys

* ```CMD + \``` - Toggle folders and files sidebar
* ```CTRL + Shift + P``` - Command Launcher
* ```CMD + Shift + N``` - Open new Atom window
* ```CMD + Shift + W``` - Close atom window

##### Plugins shortcut keys

* ```CTRL + ALT + b``` - Toggle web browser toolbar
* ```ALT + ALT + 1``` - Change layout to single pane
* ```ALT + ALT + 2``` - Change layout to dual pane
* ```ALT + ALT + 3``` - Change layout to 3 panes
* ```ALT + ALT + 4``` - Change layout to 4 panes
* ```ALT + ALT + 5``` - Change layout to 5 panes

##### My Custom shortcut keys

* ```F6``` - Toggle status bar
* ```CTRL + ALT + CMD + p``` - Toggle project sidebar
* ```CRTL + TAB``` - Switch to next tab in pane
* ```CRTL + Shift + TAB``` - Switch to previous tab in pane
* ```CTRL + ALT + TAB``` - Switch to next pane
* ```CTRL + ALT + Shift + TAB``` - Switch to previous pane
