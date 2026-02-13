export interface ServiceProcedure {
    name: string
    description: string
}

export interface Service {
    id: string
    title: string
    description: string
    icon: string
    slug: string
    preview: string
    procedures: ServiceProcedure[]
    image: string
    [key: string]: unknown
}