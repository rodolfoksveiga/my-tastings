// Types and interfaces
type TErrorMessage = string

type TId = string

type TTriggerReload = boolean

interface ITastingEssentials {
    name: string
    beverage: number | null
    user: number | null
    color: string
    appearance: string
    aroma: string
    finish: string
    rating: number | null
}

interface ITasting extends ITastingEssentials {
    id: TId
    modified_at: string
}

type TTastings = ITasting[]

interface ITastingForm extends ITastingEssentials {
    id?: TId
    modified_at?: string
}

interface ITastingParams {
    id: string
}

interface IListTastingItemProps {
    tasting: ITasting
    updateTriggerReload: Function
}

interface ITastingFormik {
    initialForm: ITastingForm
    handleSubmit: Function
}

interface IDeleteTastingProps {
    tasting: ITasting
    updateTriggerReload: Function
}


// Export all
export type {
    TErrorMessage,
    TId,
    TTriggerReload,
    ITasting,
    TTastings,
    ITastingForm,
    ITastingParams,
    IListTastingItemProps,
    ITastingFormik,
    IDeleteTastingProps
}