module.exports = {

  init: function () {},

  data: [{},{}],

  getSample: function (ctx) {

    var self = this;
    var sampleid = ctx.params.id;
    ctx.body = 'hello world:' + sampleid;

  },
  getSamples: function (ctx) {

    var self = this;

    // param: var param = ctx.params[0];
    ctx.body = 'hello world';

  }
}