module.exports = function(app) {
    app.get('/wearables', function(req, res){
        res.render('wearables');
    });

    app.get('/tablets', function(req, res){
        res.render('tablets');
    });

    app.get('/smart-phones', function(req, res){
        res.render('smart-phones');
    });

    app.get('*', function(req, res){
        res.render('index');
    });
};