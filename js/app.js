;(function () {
  var app = new Template();

  app
    .controller('filesController', {
      files: ['index.html', 'app.js', 'styles.css'],
      
      open: function () {
        console.log(this.files);
      }
    });
    
}());
