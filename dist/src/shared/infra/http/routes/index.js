"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var authenticate_routes_1 = require("./authenticate.routes");
var cars_routes_1 = require("./cars.routes");
var categories_routes_1 = require("./categories.routes");
var rental_routes_1 = require("./rental.routes");
var specifications_routes_1 = require("./specifications.routes");
var users_routes_1 = require("./users.routes");
var router = express_1.Router();
exports.router = router;
router.use(authenticate_routes_1.authenticateRoutes);
router.use("/cars", cars_routes_1.carsRoutes);
router.use("/categories", categories_routes_1.categoriesRoutes);
router.use("/specifications", specifications_routes_1.specificationsRoutes);
router.use("/users", users_routes_1.usersRoutes);
router.use("/rentals", rental_routes_1.rentalsRoutes);
//# sourceMappingURL=index.js.map