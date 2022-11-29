export interface DateTimeFilterProps {
    startTime?: string,
    endTime?: string,
    timeType?: string
}
export type Metadata = {
    total: number,
    page: number,
    limit: number
}

export interface  ListRevenueChartResponse {
    metadata: Metadata,
    responses: Array<RevenueChartResponse>
    totalOrderCount: number,
    totalOrderAmount:number,
    totalDiscount:number,
    totalReturnOrderAmount:number,
    totalRealRevenue:number,
    totalShippingFee:number,
    totalNetRevenue:number,
}
export type RevenueChartResponse = {
    date?: string,
    totalOrderAmount: number,
    orderCount: number,
    discountAmount: number,
    returnOrderAmount: number,
    realRevenue: number,
    shippingAmount: number,
    netRevenue: number,
    lastPeriodNetRevenue:number,
    lastPeriodDate:string
}