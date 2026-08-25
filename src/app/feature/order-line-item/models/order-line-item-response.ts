export interface OrderLineItemResponse {
    id: string,
    productName: string;
    orderNumber: number | null; 
    PlacedByUser: string,
    unitPrice: number,
    quantity: number,
    lineDiscount: number,
    lineTotal: number,
}
