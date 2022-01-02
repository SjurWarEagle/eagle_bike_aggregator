import { BikeDataAggregated } from "../types/bike-data-aggregated";
import { BikeData } from "../types/bike-data";
export declare class BikeDataAggregate {
    private lastProcessingDayOfMonth;
    private rememberedData;
    private rememberedDistance;
    private totalDistanceOfDay;
    aggregate(newData: BikeData): Promise<BikeDataAggregated>;
    private getCurrentDayOfMonth;
}
