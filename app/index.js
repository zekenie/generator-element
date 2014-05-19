'use strict';
var banner = require('../banner'),
    path = require('path'),
    util = require('util'),
    yeoman = require('yeoman-generator');

var ElementGenerator = yeoman.generators.Base.extend({

    init: function () {
        this.sourceRoot(path.join(__dirname, '../templates'));

        if (!this.options['skip-install-message']) {
            this.log(banner);
        }
    },

    askFor: function () {
        var done = this.async();

        var prompts = [ {
            name: 'elementName',
            message: 'What\'s the name of your element?',
            default: 'my-element'
        }];

        this.prompt(prompts, function (props) {
            props.elementName = this._.slugify(props.elementName);
            for(var i = 0; i < prompts.length; i++) {
                var name = prompts[i].name;
                this[name] = props[name];
            }

            done();
        }.bind(this));
    },

    files: function () {
        this.copy("src/_polymer.html", this.elementName + '/' + this.elementName + '.html');
        this.copy("src/_style.css", this.elementName + '/' + this.elementName + '.css');
        this.copy("src/_js.js", this.elementName + '/' + this.elementName + '.js');
    }
});

module.exports = ElementGenerator;
