export interface OrderLineItemResponse {
    id: string,
    orderId: string,
    productId: string,
    PlacedByUser: string,
    unitPrice: number,
    quantity: number,
    lineDiscount: number,
    lineTotal: number,
}
