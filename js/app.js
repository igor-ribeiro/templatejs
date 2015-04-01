;(function () {
  var app = new Template();

  app
    .controller('filesController', {
      files: ['index.html', 'app.js', 'styles.css'],
      
      add: function () {
        this.files.push('template.js');

        console.log(this.files);
      }
    });

}());
