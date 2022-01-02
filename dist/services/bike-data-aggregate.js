"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeDataAggregate = void 0;
const bike_data_aggregated_1 = require("../types/bike-data-aggregated");
class BikeDataAggregate {
    constructor() {
        this.lastProcessingDayOfMonth = 0;
        this.rememberedDistance = 0;
        this.totalDistanceOfDay = 0;
    }
    async aggregate(newData) {
        const currentDayOfMonth = this.getCurrentDayOfMonth();
        let totalDistanceOfDay;
        let rememberedDistance;
        if (currentDayOfMonth !== this.lastProcessingDayOfMonth) {
            this.lastProcessingDayOfMonth = currentDayOfMonth;
            this.rememberedData = new bike_data_aggregated_1.BikeDataAggregated();
            this.rememberedDistance = 0;
            totalDistanceOfDay = 0;
        }
        if (this.rememberedDistance < newData.distance) {
            this.totalDistanceOfDay += Math.abs(this.rememberedDistance - newData.distance);
        }
        this.rememberedDistance = newData.distance;
        this.rememberedData.distanceOfDay = this.totalDistanceOfDay;
        return this.rememberedData;
    }
    getCurrentDayOfMonth() {
        return new Date().getDate();
    }
}
exports.BikeDataAggregate = BikeDataAggregate;
//# sourceMappingURL=bike-data-aggregate.js.map