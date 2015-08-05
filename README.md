```
    / \   _ __ __ _ _   _ ___
   / _ \ | '__/ _` | | | / __|
  / ___ \| | | (_| | |_| \__ \
 /_/   \_\_|  \__, |\__,_|___/
              |___/
                    argus.js (v.01) link checker
                    usage:  casperjs argus.js <url> or --url=<url>
                            for SSL sites: casperjs --ssl-protocol=any argus.js <url> or --url=<url>
```

Argus is a casperjs/phantomjs site link validator. It currently just follows 1 level of links. It
takes a valid url as an argument, which can be passed in after argus.js or with --url=<url>. This is
very much work in progress, so feel free to make suggestions and improvements.

What is CasperJS?
CasperJS is a navigation scripting & testing utility for PhantomJS and SlimerJS written in
Javascript. http://casperjs.org/


Setup:

1. use homebrew to setup casperjs (Don't use homebrew? use homebrew... http://brew.sh/)*
% brew update
% brew install casperjs --devel

2. ./run.sh https://www.dropbox.com/

3. profit!

*or just follow instructions here: http://docs.casperjs.org/en/latest/installation.html

Coming soon:
1. meta tag sanity checks
2. functional tests
...
