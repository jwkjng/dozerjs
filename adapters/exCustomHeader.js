// Example custom header adapter
var exCustomHeader = function (req, res, next) {
  res.header('Custom-Header', 'Application Built with DozerJS');
  next();
};

module.exports = exCustomHeader;