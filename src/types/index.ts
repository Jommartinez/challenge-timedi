export interface Dispenser {
  id: string
  status: string
  updated_at: string
}

export interface Usage {
  opened_at: string
  closed_at: string
  flow_volume: number
  total_spent: number
}

export interface DispenserData {
  amount: number
  usages: Usage[]
}
