export const formatDate = (value: string | Date) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

export const formatCurrency = (amount: number) => `$${amount.toLocaleString("en-US")}`
