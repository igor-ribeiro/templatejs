;(function () {
  var app = new Template();

  app
    .controller('filesController', {
      menu:
      [
        {
          'text': 'Home',
          'url': '#/home'
        },
        {
          'text': 'Articles',
          'url': '#/articles'
        },
        {
          'text': 'Portifolio',
          'url': '#/portifolio'
        },
        {
          'text': 'Contact',
          'url': '#/contact'
        }
      ],
      
      open: function (arg) {
        console.log(arg);
      }
    });
    
}());
