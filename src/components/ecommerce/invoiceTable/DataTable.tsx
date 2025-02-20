// Main table Header 
// -----------------------------------
// Clearance Status
// Invoice Number
// Issue DateTime
// Net Amount
// Total Amount 
// Type
// Sub type 
// Invoice Note 
// Tax Currency
// Customer Number
// Customer Type
// Cust. Tax Payer Number 
// Customer Account Number 
// Customer Contract Number 
// Customer Site Number 
// Supplier Name 

export interface HeadCell {
    id: string;
    numeric: boolean;
    label: string;
}

export const headCellsMain: HeadCell[] = [
    { id: 'clearance-status', numeric: false, label: 'Clearance Status' },
    { id: 'invoice-number', numeric: false, label: 'Invoice Number' },
    { id: 'issue-datetime', numeric: false, label: 'Issue DateTime' },
    { id: 'net-amount', numeric: true, label: 'Net Amount' },
    { id: 'total-amount', numeric: true, label: 'Total Amount' },
    { id: 'type', numeric: false, label: 'Type' },
    { id: 'sub-type', numeric: false, label: 'Sub Type' },
    { id: 'invoice-note', numeric: false, label: 'Invoice Note' },
    { id: 'tax-currency', numeric: false, label: 'Tax Currency' },
    { id: 'customer-number', numeric: false, label: 'Customer Number' },
    { id: 'customer-type', numeric: false, label: 'Customer Type' },
    { id: 'cust-tax-payer-number', numeric: false, label: 'Cust. Tax Payer Number' },
    { id: 'customer-account-number', numeric: false, label: 'Customer Account Number' },
    { id: 'customer-contract-number', numeric: false, label: 'Customer Contract Number' },
    { id: 'customer-site-number', numeric: false, label: 'Customer Site Number' },
    { id: 'supplier-name', numeric: false, label: 'Supplier Name' },
];

export interface MainData {
    id: number;
    clearanceStatus: string;
    invoiceNumber: string;
    issueDateTime: string;
    netAmount: number;
    totalAmount: number;
    type: string;
    subType: string;
    invoiceNote: string;
    taxCurrency: string;
    customerNumber: string;
    customerType: string;
    custTaxPayerNumber: string;
    customerAccountNumber: string;
    customerContractNumber: string;
    customerSiteNumber: string;
    supplierName: string;
    supplierLocation?: string;
    billingLocation?: string;
    currency?: string;
    contractNumber?: string;
    additionalField1?: string;
    additionalField2?: string;
    field23?: string;
    field24?: string;
}

export const createDataMain = (data: MainData): MainData => data;

export const rowsMainData: MainData[] = [
    createDataMain({
        id: 1,
        clearanceStatus: 'CLEARED',
        invoiceNumber: '3559',
        issueDateTime: '06-Feb-2025',
        netAmount: 435850,
        totalAmount: 435850,
        type: '388',
        subType: '010000',
        invoiceNote: 'INVOICE COMMENTS',
        taxCurrency: 'SAR',
        customerNumber: '2089',
        customerType: 'TAV Construction',
        custTaxPayerNumber: 'ORGANIZATION',
        customerAccountNumber: '',
        customerContractNumber: 'NEWFAB-00433',
        customerSiteNumber: '',
        supplierName: 'Site-2089'
    })
];

// Details page 
// ----------------------------------

export interface DetailData {
    id: number;
    clearanceStatus: string;
    processDate: string;
    errorType: string;
    errorStatus: string;
    errorCode: string;
    errorCategory: string;
}

export const createDataDetail = (data: DetailData): DetailData => data;

export const headCellsDetail: HeadCell[] = [
    { id: 'clearance-status', numeric: false, label: 'Clearance Status' },
    { id: 'process-date', numeric: false, label: 'Process Date' },
    { id: 'error-type', numeric: false, label: 'Error Type' },
    { id: 'error-status', numeric: false, label: 'Error Status' },
    { id: 'error-code', numeric: false, label: 'Error Code' },
    { id: 'error-category', numeric: false, label: 'Error Category' },
];

export const rowsDetailData: DetailData[] = [
    createDataDetail({
        id: 1,
        clearanceStatus: '07-FEB-2025',
        processDate: 'Warning',
        errorType: 'Warning',
        errorStatus: 'BR-S-09',
        errorCode: 'EN_16931',
        errorCategory: "The VAT category tax amount (BT-117) in a VAT breakdown (BG-23) where VAT category code (BT-118) is 'Standard rated' shall equal the VAT category taxable amount (BT-116) multiplied by the VAT category rate (BT-119)."
    })
];
