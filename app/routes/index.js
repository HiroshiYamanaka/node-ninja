
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'NODE NINJA DEMO' });
};

exports.controller = function(req, res){
	res.render('controller', { title: 'Controller' });
};

exports.flash = function(req, res){
	res.render('flash', { title: 'flash' });
};