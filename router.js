module.exports = (function () {
    var React = require('react');
    var Router = require('react-router');
    var Route = Router.Route;
    var DefaultRoute = Router.DefaultRoute;
    var Redirect = Router.Redirect;

    var MainView = require('./views/main-view');
    var ProductCreationView = require('./views/product-creation-view');

    var ModuleRouter = function () {
        this.routes = (
            <Route handler={MainView}>
                <DefaultRoute handler={ProductCreationView} />
            </Route>
        );
    };

    ModuleRouter.prototype.run = function (mountElement) {
        Router.run(this.routes, function (Root) {
            React.render(<Root />, mountElement);
        });
    };

    return new ModuleRouter();
})();