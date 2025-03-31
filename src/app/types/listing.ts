// Define interface for Image object
interface Image {
    id: string;
    image_url: string;
  }
  
  // Define interface for Operating Hours
  interface OperatingHours {
    day: string;
    open: boolean;
    start_time: string;
    end_time: string;
    schedule_appointment: boolean;
  }
  
  // Define interface for Contacts
  interface Contact {
    id: string;
    name: string;
    phone_number: string;
    email: string;
  }
  
  // Define main Listing interface
  export interface Listing {
    id: string;
    images: Image[];
    operating_hours: OperatingHours[];
    product_types: string[];
    storage_conditions: string[];
    amenities: string[];
    services: string[];
    sublease_pricing_tiers: any[]; // Can be further specified if data available
    contacts: Contact[];
    floor_plan: string | null;
    display_image: string | null;
    ListingName: string;
    Availability: boolean;
    StartDate: string;
    EndDate: string | null;
    ListingDetails: string;
    listing_type: string;
    Location: string;
    lat: number;
    lng: number;
    city: string;
    province: string;
    available_square_footage: string;
    available_pallets: number;
    pallets_available: boolean;
    fee_percentage: string;
    currency: string;
    minimum_month_required: number;
    minimum_order_quantity: number;
    tenant_labor_allowed: boolean;
    additional_details: string;
    coverage_amount: string;
    insurance_type: string;
    insurance_type_other: string | null;
    require_tenants_insurance: boolean;
    insurance_document: string | null;
    order_reception_method: string;
    order_reception_description: string;
    provides_monthly_reports: boolean;
    payment_terms: string;
    payment_frequency: string;
    payment_method: string;
    payment_method_other: string | null;
    approved: boolean;
    sublease_per_sqft_price: string;
    price_per_standard_pallet_stackable_per_month: string;
  }
  
  