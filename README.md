A solution that would take the burden off chapter administrators to update manually chapter links. There is so many sites that TZM has created within its network, and its hard for individual members to keep track of them all. And you will get surprised of how many TZM projects are out there that are not well heard of even by coordinators. Z-Tabzilla takes care of all the haste of including project and chapter sites, and provides a neat and tidy space for that information that will look cool with any chapter site. On top of it all, there is no need to find space on your chapter site, and there is very little coding involved to get all this up and running.

Z-tabzilla will allow chapter administrators who have just basic HTML knowledge to install a cool widget that will scroll down from the top of your chapter website, that includes all the chapter links and global projects. The beauty of this system is that it does not have to be updated by each individual chapter administrator whenever a new chapter is established or a new project is out there. Changes are automatically updated once Z-Tabzilla is installed as they are fetched from a singe location.

#Installation

Step 1 Between your <head> tags insert the following code:

	<link rel="stylesheet" type="text/css" media="all" href="https://raw.github.com/TZM/Z-Tabzilla/master/z-tabzilla-min.css" />
	<script type="text/javascript" src="https://raw.github.com/TZM/Z-Tabzilla/master/z-tabzilla-min.js"></script>

Step 2 Insert this code wherever you want your Z-tabzilla button to appear:

	<a href="YOURSITEURL" id="tabzilla"></a>

Where YOURSITEURL is the URL of your site


Thats it!

#FAQ

For FAQ and troubleshooting please post to this forum topic with your question. Be specific about your problem/question!

#Things to do and Development

Participation in this project is welcome! At the moment I'm doing this alone, and i would welcome more developers to tune up the code.

#Minify css and js
cleancss -o z-tabzilla-min.css z-tabzilla.css
uglifyjs -o z-tabzilla-min.js z-tabzilla.js