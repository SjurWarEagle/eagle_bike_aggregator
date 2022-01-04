import {BikeDataAggregated} from "../types/bike-data-aggregated";
import {BikeData} from "../types/bike-data";

export class BikeDataAggregate {
    private lastProcessingDayOfMonth = 0;
    private rememberedData: BikeDataAggregated;
    private rememberedDistance = 0;
    private totalDistanceOfDay = 0;

    public async aggregate(newData: BikeData): Promise<BikeDataAggregated> {
        const currentDayOfMonth = this.getCurrentDayOfMonth();
        let totalDistanceOfDay;
        let rememberedDistance;

        if (currentDayOfMonth !== this.lastProcessingDayOfMonth) {
            this.lastProcessingDayOfMonth = currentDayOfMonth;
            this.rememberedData = new BikeDataAggregated();
            this.rememberedDistance = 0;
            this.totalDistanceOfDay = 0;
            totalDistanceOfDay = 0;
            //TODO other reset tasks
        }

        if (this.rememberedDistance < newData.distance) {
            this.totalDistanceOfDay += Math.abs(this.rememberedDistance - newData.distance);
        }

        this.rememberedDistance = newData.distance;
        this.rememberedData.distanceOfDay = this.totalDistanceOfDay;

        return this.rememberedData;
    }

    private getCurrentDayOfMonth(): number {
        return new Date().getDate();
    }
}
