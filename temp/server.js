hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
    var now = new Date().toString();
    console.log(`${now}: ${req.method} ${req.url}`)
    next();
});

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Forcastinator',
        welcomeP: 'Where are you going?',
    });
});

app.get('/result', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Forcastinator',
        welcomeP: 'Where are you going?',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});
